<template>
  <nly-container fluid class="login-containers">
    <nly-row class="login-row">
      <nly-col
        cols="10"
        class="m-auto align-items-centerjustify-content-center login-center"
      >
        <nly-card-group class="login-card-group m-auto">
          <nly-card
            class="d-none d-md-block d-xl-block"
            bg-variant="info"
            text-variant="white"
            header="Nejinn Lerity Admin"
            footer="Version: 0.1.0"
          >
            <nly-card-body align="left">
              <nly-card-text>
                Nejinn Lerity Admin<br />
                是一个后台前端解决方案<br />
                基于Bootstrap-Vue和vue实现<br />
                自适应移动端PC端<br />
              </nly-card-text>
            </nly-card-body>
          </nly-card>
          <nly-card>
            <nly-card-body>
              <nly-form>
                <nly-form-group>
                  <nly-input-group size="sm" class="mb-2">
                    <nly-input-group-prepend is-text>
                      <nly-icon icon="person"></nly-icon>
                    </nly-input-group-prepend>
                    <nly-form-input
                      v-model="loginForm.username"
                      required
                      placeholder="请输入账号"
                    ></nly-form-input>
                  </nly-input-group>

                  <nly-input-group size="sm" class="mb-2">
                    <nly-input-group-prepend is-text>
                      <nly-icon icon="lock"></nly-icon>
                    </nly-input-group-prepend>
                    <nly-form-input
                      v-model="loginForm.password"
                      required
                      placeholder="请输入密码"
                      :type="showPassword ? 'text' : 'password'"
                      :state="passwordState"
                    ></nly-form-input>
                    <nly-input-group-append>
                      <nly-button
                        size="sm"
                        variant="outline-secondary"
                        class="login-show-pwd-btn"
                      >
                        <nly-icon aria-hidden="true"></nly-icon>
                      </nly-button>
                    </nly-input-group-append>
                  </nly-input-group>
                </nly-form-group>
                <nly-button
                  type="reset"
                  variant="outline-danger"
                  size="sm"
                  class="login-reset-btn"
                  >重置</nly-button
                >
                <nly-button type="submit" variant="outline-success" size="sm"
                  >登录</nly-button
                >
              </nly-form>
            </nly-card-body>
          </nly-card>
        </nly-card-group>
      </nly-col>
    </nly-row>
  </nly-container>
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
