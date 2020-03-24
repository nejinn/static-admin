import http from "../http/http.js";

export default {
  getUserInfo: function(obj, data) {
    let url = "/AdminApi/get_tree";
    http.nlyPost(url, data).then(
      response => {
        // console.log(response.data);
        // obj.userImg = response.userinfo.useravatar;
        // obj.userName = response.userinfo.username;
        // obj.brandName = response.logoinfo.logoname;
        // obj.brandImg = response.logoinfo.logoimg;
        // obj.headerNavbar = response.headernavbar;
        obj.asideNavbar = response.data;
        console.log(obj.asideNavbar);
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        let message = "获取数据失败";
        let variant = "warning";
        let title = "数据获取失败";
        let content = "获取用户信息以及导航栏信息失败";
        obj.$NLYinstructions.Toast(obj, message, variant, title, content);
      }
    );
  }
};
