import axios from "axios";
import store from "../../../store";
import qs from "qs";
import router from "../../../router";

axios.defaults.timeout = 2000;
axios.defaults.baseURL = "http://127.0.0.1/elastic_archives/index.php/";

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.login.loginToken) {
      config.headers.Authorization = store.getters.getLoginToken;
    }
    if (config.method == "post") {
      config.data = qs.stringify(config.data);
    }
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器   注意完善
axios.interceptors.response.use(
  response => {
    const dataAxios = response.data;
    const { status } = dataAxios;
    console.log("status", status);
    if (status === undefined) {
      router.replace({
        path: "/login",
        query: { redirect: router.currentRoute.fullPath }
      });
      store.commit("clearLoginUserInfo");
    } else {
      switch (status) {
        case 200:
          // 请求正确
          return Promise.resolve(dataAxios);
        case 407:
          // 无权限
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          });
          store.commit("clearLoginUserInfo");
          break;
        default:
          console.log("default", dataAxios);
          return Promise.reject(dataAxios);
      }
    }
  },
  error => {
    if (error.response == undefined) {
      router.replace({
        path: "/login",
        query: { redirect: router.currentRoute.fullPath }
      });
      store.commit("clearLoginUserInfo");
    } else {
      switch (error.response.status) {
        case 407:
          store.commit("clearLoginUserInfo");
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;
        case 404:
          console.log(404);
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

export default {
  wyGetList: function(url, params = {}) {
    /**
     * 封装get list方法，获取数据列表
     * 可带 搜索条件，页码，每页数量数据
     * demo url 127.0.0.1:8000/api/project/?page=1&size=10&name=33
     * @param url
     * @param data
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  wyGetDetail: function(url, id) {
    /**
     * 封装get detail方法,获取数据详情
     * 不带params和data，带id
     * demo url 127.0.0.1:8000/api/project/detail/1/
     * @param url
     * @param id
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .get(url + id + "/")
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  wyPost: function(url, data = {}) {
    /**
     * 封装post请求，创建数据
     * demo url 127.0.0.1:8000/api/project/create/
     * @param url
     * @param data
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  wyPatch: function(url, data = {}) {
    /**
     * 封装patch请求
     * @param url
     * @param data
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .patch(url, data)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  wyUpDate: function(url, id, data) {
    /**
     * 封装put请求，更新，修改数据，假删除数据等
     * 带data，带id
     * demo url 127.0.0.1:8000/api/project/1/
     * @param url
     * @param data
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .put(url + id + "/", data)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  wyDelete: function(url, id) {
    /**
     * 封装delete请求，删除数据
     * 带id
     * demo url 127.0.0.1:8000/api/project/delete/1/
     * @param url
     * @param data
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .delete(url + id + "/")
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

// /**
//  * 封装get list方法，获取数据列表
//  * 可带 搜索条件，页码，每页数量数据
//  * demo url 127.0.0.1:8000/api/project/?page=1&size=10&name=33
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function wyGetList(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(url, {
//         params: params
//       })
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }

// /**
//  * 封装get detail方法,获取数据详情
//  * 不带params和data，带id
//  * demo url 127.0.0.1:8000/api/project/detail/1/
//  * @param url
//  * @param id
//  * @returns {Promise}
//  */

// export function wyGetDetail(url, id) {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(url + id + "/")
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }

// /**
//  * 封装post请求，创建数据
//  * demo url 127.0.0.1:8000/api/project/create/
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function wyPost(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios
//       .post(url, data)
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }

// /**
//  * 封装patch请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function wyPatch(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios
//       .patch(url, data)
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }

// /**
//  * 封装put请求，更新，修改数据，假删除数据等
//  * 带data，带id
//  * demo url 127.0.0.1:8000/api/project/1/
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function wyUpDate(url, id, data) {
//   return new Promise((resolve, reject) => {
//     axios
//       .put(url + id + "/", data)
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }

// /**
//  * 封装delete请求，删除数据
//  * 带id
//  * demo url 127.0.0.1:8000/api/project/delete/1/
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function wyDelete(url, id) {
//   return new Promise((resolve, reject) => {
//     axios
//       .delete(url + id + "/")
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }
