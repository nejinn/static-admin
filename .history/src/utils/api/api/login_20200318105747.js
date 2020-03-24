import http from "../http/http.js";

export default {
  /**
   * 登录接口
   * 带登录之后变量操作
   */
  login: function(obj, data) {
    let url = "/api/login/";
    http.wyPost(url, data).then(
      response => {
        let token = response.token;
        obj.$store.commit("setLoginUserInfo", token);
        obj.$router.push(obj.$route.query.redirect || "/");
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        obj.loginCardSubTitleVariant = "danger";
        obj.loginCardSubTitle = "用户名或密码错误";
      }
    );
  }
};
