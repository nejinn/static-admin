import axios from "axios";
import store from "../../store";
// import router from "../../router";
// import NLYinstructions from "../../NLY/instructions/NLYinstructions.js";

axios.defaults.timeout = 2000;
axios.defaults.baseURL = "http://127.0.0.1/elastic_archives/index.php/";

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.login.loginToken) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = store.getters.getLoginToken;
      // config.headers.appToken = store.getters.getLoginToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器   注意完善
// axios.interceptors.response.use(
//   response => {
//     if (response.status === 200) {
//       return Promise.resolve(response);
//     } else if (response.status === 201) {
//       return Promise.resolve(response);
//     } else {
//       return Promise.reject(response);
//     }
//   },
//   error => {
//     console.log(error.hasOwnProperty("response"));
//     console.log(error.response);
//     if (error.response == undefined) {
//       console.log(1111);
//       router.replace({
//         path: "/login",
//         query: { redirect: router.currentRoute.fullPath }
//       });
//       store.commit("clearLoginUserInfo");
//     } else {
//       switch (error.response.status) {
//         case 401:
//           router.replace({
//             path: "/login",
//             query: { redirect: router.currentRoute.fullPath }
//           });
//           store.commit("clearLoginUserInfo");
//           break;

//         case 403:
//           store.commit("clearLoginUserInfo");
//           setTimeout(() => {
//             router.replace({
//               path: "/login",
//               query: {
//                 redirect: router.currentRoute.fullPath
//               }
//             });
//           }, 1000);
//           break;
//         case 404:
//           console.log(404);
//           break;
//       }
//       return Promise.reject(error.response);
//     }
//   }
// );

export default {
  nlyGetList: function(url, params = {}) {
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
  nlyGetDetail: function(url, id) {
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
  nlyPost: function(url, data = {}) {
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
  nlyPatch: function(url, data = {}) {
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
  nlyUpDate: function(url, id, data) {
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
  nlyDelete: function(url, id) {
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

// export function nlyGetList(url, params = {}) {
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

// export function nlyGetDetail(url, id) {
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

// export function nlyPost(url, data = {}) {
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

// export function nlyPatch(url, data = {}) {
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

// export function nlyUpDate(url, id, data) {
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

// export function nlyDelete(url, id) {
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