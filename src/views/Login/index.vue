<template>
  <div class="login">
    <div class="login_nav">
      <div class="logo"></div>
      <div class="language">
        <a href="#">ID <i class="el-icon-caret-bottom"></i></a>
        <div class="language_list_card">
          <i class="language_list_icon el-icon-caret-top"></i>
          <ul class="language_list">
            <li>
              <a href="#">EN</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="login-card">
      <h2 class="login-title">Sistem Pengelolaan Petty Cash PinjamanGo</h2>

      <el-form
        class="login_form"
        ref="form"
        :model="form"
        :rules="rules"
        @submit.native.prevent="submit"
        :label-position="labelPosition"
      >
        <div class="form_title">Login</div>
        <el-form-item prop="username" :label="'Username'">
          <el-input
            v-model="form.username"
            :placeholder="'username anda'"
            :autofocus="true"
            type="text"
            size="large"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password" :label="'Password'">
          <el-input
            v-model="form.password"
            :placeholder="'masukan password'"
            type="password"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="!form.username || !form.password"
            class="login-btn"
            type="primary"
            native-type="submit"
            size="large"
          >
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
// import storage from "@/libs/storage";
export default {
  name: "Login",
  data() {
    return {
      labelPosition: "left",
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    rules() {
      return {
        username: [
          {
            required: true,
            message: "Masukan Username",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Masukan Password",
            trigger: "blur",
          },
        ],
      };
    },
  },
  methods: {
    submit() {
      this.form.username = this.form.username.trim();
      this.form.password = this.form.password.trim();
      this.onSubmit();
    },

    onSubmit() {
      const body = this.form;
      EventService.login(body)
        .then((res) => {
          console.log(res.data);
          const { status, data } = res;
          if (status === 200) {
            const { role, token, userId } = data;
            localStorage.setItem("user", { role, token, userId });
          }
        })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  overflow: visible;
  background-color: #3a4954;
}

.login_nav {
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  .logo {
    height: 72px;
    width: 181px;
    background-image: url("~@/assets/img/login_logo.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }
  .language {
    color: #fff;
    font-size: 16px;
    line-height: 72px;
    height: 72px;
    width: 100px;
    text-align: right;
    position: relative;
    a {
      display: block;
      color: #fff;
      height: 72px;
    }
    &:hover {
      .language_list_card {
        display: block;
      }
    }
  }
  .language_list_card {
    display: none;
    width: 120px;
    position: absolute;
    top: 100%;
    right: -10px;
    transform: translateY(-10px);
  }
  .language_list_icon {
    position: absolute;
    top: -18px;
    right: 3px;
    font-size: 30px;
  }
  .language_list {
    background-color: #fff;
    border-radius: 6px;
    width: 100%;
    overflow: hidden;
    li {
      a {
        display: block;
        color: #2f3030;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        text-align: center;
        &:hover {
          color: #52a0db;
        }
      }
    }
  }
}

.login-card {
  text-align: center;
}

.login-title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 50px;
  margin-top: 100px;
  color: #fff;
}

.login_form {
  background-color: #fff;
  border-radius: 8px;
  width: 416px;
  height: 400px;
  padding: 36px 40px;
  margin: 0 auto;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.06), 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  .form_title {
    font-size: 24px;
    color: #2f3030;
  }
}

.login-btn {
  width: 100%;
  height: 44px;
  line-height: 44px;
  padding: 0;
  font-size: 16px;
  border-radius: 6px;
  background-color: #52a0db;
  border-color: #52a0db;
  &.is-disabled {
    background-color: rgba(82, 160, 219, 0.6);
    border-color: rgba(82, 160, 219, 0.6);
  }
}
</style>