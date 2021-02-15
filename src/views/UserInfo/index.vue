<template>
  <div>
    <div class="page page-conf">
      <el-scrollbar
        v-show="isShowMenu || $store.state.menu.isLock"
        class="page-menu"
        wrap-class="page_menu_wrap"
      >
        <LeftMenu />
      </el-scrollbar>
      <div
        @click="hideMenu"
        class="page-main"
        id="page_main"
        :class="{
          'page-main': true,
          'page-main-padding': $store.state.menu.isLock,
        }"
      >
        <h1 class="text-center my-3">User Info</h1>
        <b-container>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="120px"
            style="min-width: 40%; padding-right: 20px"
            class="text-center mx-auto"
          >
            <el-form-item label="Username">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Branch">
              <el-select
                v-model="form.branchName"
                style="width: 100%"
                :disabled="userData.role.roleName !== 'admin'"
              >
                <el-option label="Jakarta" value="JAKARTA"></el-option>
                <el-option label="Semarang" value="SEMARANG"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Password" prop="oldPassword">
              <el-input v-model="form.oldPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="Department">
              <el-input v-model="form.department" disabled></el-input>
            </el-form-item>
            <el-form-item label="Role">
              <el-input v-model="form.role" disabled></el-input>
            </el-form-item>
            <el-form-item label="Saldo Cabang">
              <el-input v-model="balance" disabled></el-input>
            </el-form-item>
            <el-form-item style="float: right" class="mr-5 mt-2">
              <el-button @click="handleUpdateProfile('form')"
                >Update Profile</el-button
              >
            </el-form-item>
          </el-form>
          <el-button
            type="text"
            @click="dialogChangePassword = true"
            style="margin-left: 120px"
            >Change Password</el-button
          >
        </b-container>
        <el-dialog title="Change Password" :visible.sync="dialogChangePassword">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="Old Password" prop="oldPassword">
              <el-input
                v-model.number="ruleForm.oldPassword"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="New Password" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Repeat" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >Submit</el-button
              >
              <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
          </el-form>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogChangePassword = false">Cancel</el-button>
            <el-button @click="handleChangePassword('formChangePassword')"
              >Submit</el-button
            >
          </span> -->
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
import LeftMenu from "@/components/left-menu";
import storage from "@/libs/storage";
const user = storage.get("user");
export default {
  name: "UserInfo",
  components: {
    LeftMenu,
  },
  data() {
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the age"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please input digits"));
        } else {
          if (value < 18) {
            callback(new Error("Age must be greater than 18"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      userData: storage.get("user"),
      ruleForm: {
        oldPassword: "",
        pass: "",
        checkPass: "",
      },
      dialogChangePassword: false,
      balance: "Rp " + user.branch.balance.toLocaleString("id-ID"),
      form: {
        name: user.username,
        email: user.email,
        branchName: user.branch.branchName,
        oldPassword: "",
        department: user.department,
        role: user.role.roleName,
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: "Masukan Password untuk meng-update info akun",
          },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  computed: {
    isShowMenu() {
      return this.$store.state.menu.show;
    },
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const userId = user.userId;
          const body = this.ruleForm;
          EventService.updateUserInfo(userId, body)
            .then((res) => {
              const { data, status } = res;
              if (data && status === 200) {
                this.$message({
                  type: "success",
                  message: `password changed`,
                });
                this.dialogChangePassword = false;
                this.$refs[formName].resetFields();
              }
            })
            .catch((err) => console.log(err));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    hideMenu() {
      this.$store.commit("toggleMenuShow", false);
    },
    handleUpdateProfile(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const body = this.form;
          const userId = user.userId;
          EventService.updateUserInfo(userId, body)
            .then((res) => {
              console.log(res.data);
              const { status, data } = res;
              if (status === 200 && data) {
                this.$message({
                  type: "success",
                  message: `Profile Updated`,
                });
                storage.set("user", data);
                this.$refs[formName].resetFields();
              } else {
                this.$message({
                  type: "alert",
                  message: "data is not valid",
                });
              }
            })
            .catch((err) => {
              this.$message({
                type: "alert",
                message: `Wrong Password `,
              }),
                console.log(err.response.status);
            });
        } else {
          console.log("eror");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/function";

.txt_red {
  color: #f00;
}
.page_menu_wrap {
  overflow: auto;
}

.page-conf {
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
}
.page-menu {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  min-width: 320px;
  height: 100%;
  /*width: 300px;*/
  background-color: $navMenuBgColor;
  /*overflow: hidden;*/
  flex-shrink: 0;
  z-index: 20;
  /*overflow: auto;*/
  overflow-x: hidden;
  overflow-y: auto;
}

.page-main {
  flex: 1;
  /*overflow: auto;*/
  /*padding: 15px;*/
  padding: 0;
  /*background-color: #f3f3f3;*/
  overflow-y: auto;
  overflow-x: hidden;
}
.page-main-padding {
  padding-left: 320px;
}
</style>