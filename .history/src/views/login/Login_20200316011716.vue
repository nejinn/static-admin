<template>
  <b-container fluid class="login-containers">
    <b-row class="login-row">
      <b-col
        cols="10"
        class="m-auto align-items-centerjustify-content-center login-center"
      >
        <b-card-group class="login-card-group m-auto">
          <b-card
            class="d-none d-md-block d-xl-block"
            bg-variant="info"
            text-variant="white"
            header="Nejinn Lerity Admin"
            footer="Version: 0.1.0"
          >
            <b-card-body align="left">
              <b-card-text>
                WY Static System
              </b-card-text>
            </b-card-body>
          </b-card>
          <b-card :title="loginCardTitle" :sub-title="loginCardSubTitle">
            <b-card-body>
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group>
                  <b-input-group size="sm" class="mb-2">
                    <b-input-group-prepend is-text>
                      <b-icon icon="person"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="loginForm.username"
                      required
                      placeholder="请输入账号"
                      :state="usernameState"
                    ></b-form-input>
                  </b-input-group>

                  <b-input-group size="sm" class="mb-2">
                    <b-input-group-prepend is-text>
                      <b-icon icon="lock"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="loginForm.password"
                      required
                      placeholder="请输入密码"
                      :type="showPassword ? 'text' : 'password'"
                      :state="passwordState"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button
                        :title="showPassword ? '隐藏密码' : '显示密码'"
                        size="sm"
                        variant="outline-secondary"
                        class="login-show-pwd-btn"
                        @click="changepPsswordType"
                      >
                        <b-icon
                          :icon="showPassword ? 'eye-slash' : 'eye'"
                          aria-hidden="true"
                        ></b-icon>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <b-button
                  type="reset"
                  variant="outline-danger"
                  size="sm"
                  class="login-reset-btn"
                  >重置</b-button
                >
                <b-button type="submit" variant="outline-success" size="sm"
                  >登录</b-button
                >
              </b-form>
            </b-card-body>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginCardTitle: "登录",
      loginCardSubTitle: "请输入您的账号密码",
      loginForm: {
        username: null,
        password: null
      },
      show: true,
      showPassword: false
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let obj = this;
      this.$NLYHttp.login.login(obj, this.loginForm);
    },
    onReset(evt) {
      evt.preventDefault();
      this.show = false;
      this.loginForm.username = null;
      this.loginForm.password = null;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    changepPsswordType() {
      this.showPassword = this.showPassword ? false : true;
    }
  },
  computed: {
    usernameState() {
      return this.loginForm.username == null
        ? null
        : this.loginForm.username.length == ""
        ? false
        : true;
    },
    passwordState() {
      return this.loginForm.password == null
        ? null
        : this.loginForm.password.length == ""
        ? false
        : true;
    }
  }
};
</script>

<style scoped>
.login-containers {
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.03);
}
.login-row {
  height: 100%;
}
.login-card-group {
  max-width: 40rem;
}

.login-left-card-body {
  height: 100%;
}
.login-show-pwd-btn {
  background-color: #e9ecef;
  border: 1px solid #ced4da;
}
.login-reset-btn {
  margin-right: 2rem;
}
</style>
