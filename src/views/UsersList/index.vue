<template>
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
      <div class="users_list">
        <h2>The List of Users</h2>
        <el-button class="create_user" @click="dialogCreate = true">
          <i class="el-icon-plus icon_size"></i> Add User</el-button
        >
        <el-table
          :data="tableData"
          style="width: 100%"
          highlight-current-row
          :default-sort="{ prop: 'branch.branchName', order: 'ascending' }"
        >
          <el-table-column
            sortable
            prop="branch.branchName"
            label="Cabang"
            min-width="180"
          >
          </el-table-column>
          <el-table-column
            sortable
            prop="username"
            label="Username"
            min-width="180"
          >
          </el-table-column>
          <el-table-column sortable prop="email" label="Email" min-width="180">
          </el-table-column>
          <el-table-column
            sortable
            prop="department"
            label="Departemen"
            min-width="180"
          >
          </el-table-column>
          <el-table-column
            prop="role.roleName"
            label="role"
            min-width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.role.roleName"
                @change="changeUserRole($event, scope.row.userId)"
              >
                <el-option
                  v-for="item in options"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleName"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="Create New User"
        class="create_user-dialog"
        :visible.sync="dialogCreate"
        top="3vh"
      >
        <el-form
          :label-position="'top'"
          :model="form"
          ref="form"
          status-icon
          :rules="rules"
        >
          <!-- branch -->
          <el-row>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <el-form-item label="Cabang:" prop="branch">
                  <el-select placeholder="Pilih Cabang" v-model="form.branch">
                    <el-option label="Jakarta" value="JAKARTA"></el-option>
                    <el-option label="Semarang" value="SEMARANG"></el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple-light">
                <el-form-item label="Role" prop="role">
                  <el-select placeholder="Pilih Role" v-model="form.role">
                    <el-option label="Admin" value="admin"></el-option>
                    <el-option label="Staff" value="staff"></el-option>
                    <el-option label="Releaser" value="riliser"></el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
          </el-row>

          <!-- username -->
          <el-form-item label="Username:" prop="username">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!-- email -->
          <el-form-item label="Email:" prop="email">
            <el-input v-model="form.email" type="email"></el-input>
          </el-form-item>
          <!-- departemen -->
          <el-form-item label="Departemen:" prop="department">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
          <!-- password -->
          <el-form-item label="Password:" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="Repeat Password:" prop="repeat">
            <el-input v-model="form.repeat" type="password"></el-input>
          </el-form-item>
          <!-- <el-card class="box-card">
          <pre>{{ form }}</pre>
        </el-card> -->
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogCreate = false">Cancel</el-button>
          <el-button type="primary" @click="createNewUser('form')"
            >create</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import storage from "@/libs/storage";
import EventService from "@/services/PettyCashService";
import LeftMenu from "@/components/left-menu";

export default {
  name: "UsersList",
  components: {
    LeftMenu,
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error("Please input the password"));
      } else {
        if (this.form.password !== "") {
          this.$refs.form.validateField("repeat");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error("Please input the password again"));
      } else if (value !== this.form.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      form: {},
      passwordRepeat: "",
      dialogCreate: false,
      tableData: [],
      options: [],
      user: storage.get("user"),
      rules: {
        password: [{ validator: validatePass, trigger: blur }],
        repeat: [{ validator: validatePass2, trigger: blur }],
      },
    };
  },
  methods: {
    hideMenu() {
      this.$store.commit("toggleMenuShow", false);
    },
    changeUserRole(data, userId) {
      const form = {
        role: data,
        userId: String(userId),
        adminId: String(this.user.userId),
      };

      //   console.log(form);
      EventService.updateRole(form).then((res) => {
        // console.log(res);
        if (res.status === 200) this.$message.success("Role Changed");
        this.getTableData();
      });
    },
    getTableData() {
      EventService.getAllUsers(this.user.userId).then((res) => {
        // console.log(res);
        this.tableData = res.data;
      });
    },
    getOptions() {
      EventService.getAllRole().then((res) => {
        // console.log(res.data);
        this.options = res.data;
      });
    },
    createNewUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          EventService.createNewUser(this.user.userId, this.form).then(
            (res) => {
              console.log(res);
              const { status } = res;
              if (status === 200) this.getTableData();
              this.dialogCreate = false;
            }
          );
        } else {
          return false;
        }
      });
    },
  },
  computed: {
    isShowMenu() {
      return this.$store.state.menu.show;
    },
  },
  created() {
    this.getTableData();
    this.getOptions();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/function";
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
.users_list {
  width: 80%;
  margin: auto;
  margin-top: 20px;
  text-align: center;
}

.create_user {
  margin-top: 10px;
  margin-bottom: 10px;
  float: left;
}

.icon_size {
  width: 10px;
}
</style>
