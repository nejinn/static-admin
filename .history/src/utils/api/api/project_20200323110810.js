import http from "../http/http.js";

export default {
  // 获取project数据
  getProjectList: function(obj, data) {
    const url = "/AdminApi/get_project_list";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        const toastVnode = {
          message: "获取失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 查询project数据
  queryProjectList: function(obj, data) {
    const url = "/AdminApi/get_project_list";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;
        obj.currentPage = 1;

        // obj.$store.commit("setProjectManageDataCurrentPage", 1);

        // obj.$store.commit(
        //   "setProjectManageDataFilterFormProjectName",
        //   obj.filterForm.projectName
        // );
        // obj.$store.commit(
        //   "setProjectManageDataFilterFormIsDetect",
        //   obj.filterForm.isDetect
        // );
        const queryCriteriaProjectName =
          obj.filterForm.projectName == ""
            ? "未填写"
            : obj.filterForm.projectName;
        const queryCriteriaIsDetect =
          obj.filterForm.isDetect == "" ? "未选择" : obj.filterForm.isDetect;

        const toastVnode = {
          message: "搜索成功",
          variant: "success",
          title: "操作成功",
          content: `搜索条件为:包含项目名称 ${queryCriteriaProjectName} 和探测情况 ${queryCriteriaIsDetect} 的数据`
        };
        obj.$WYToast.Toast(obj, toastVnode);
      },
      err => {
        const toastVnode = {
          message: "查询失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 刷新当页数据
  refreshProjectList: function(obj, data) {
    const url = "/AdminApi/get_project_list";
    http.wyPost(url, data).then(
      response => {
        obj.items = response.data.list;
        obj.total = response.data.count;

        const toastVnode = {
          message: "刷新成功",
          variant: "success",
          title: "操作成功",
          content: "刷新数据"
        };
        obj.$WYToast.Toast(obj, toastVnode);
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        const toastVnode = {
          message: "刷新失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 刷新卡片数据
  refreshCardProjectList: function(obj, data) {
    const url = "/AdminApi/get_project_list";
    http.wyGetList(url, data).then(
      response => {
        const toastVnode = {
          message: "刷新成功",
          variant: "success",
          title: "操作成功",
          content: obj.cardHeaderTitle
        };

        obj.$WYToast.Toast(obj, toastVnode);
        obj.items = response.list;
        obj.total = response.count;

        // obj.$store.commit("setProjectManageDataCurrentPage", 1);
        // obj.$store.commit("setProjectManageDataFilterFormProjectName", "");
        // obj.$store.commit("setProjectManageDataFilterFormIsDetect", "");
      },
      err => {
        const toastVnode = {
          message: "刷新失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 获取数据详情
  getProjectDetail: function(obj, data) {
    const url = "/AdminApi/project_info";
    http.wyPost(url, data).then(
      response => {
        obj.detailData = response.data;
      },
      err => {
        const toastVnode = {
          message: "获取失败",
          variant: "warning",
          title: "操作失败",
          content: err.mg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 获取数据详情
  getProjectDetailUpdate: function(obj, data) {
    const url = "/AdminApi/project_info";
    http.wyPost(url, data).then(
      response => {
        obj.detailData = response.data;
        if (response.data.accessory) {
          response.data.accessory.forEach(item => {
            if (item != "") {
              obj.aysnFiles.push({
                file_url: item,
                file_name: item.split("/")[item.split("/").length - 1]
              });
            }
          });
        }
      },
      err => {
        const toastVnode = {
          message: "获取失败",
          variant: "warning",
          title: "操作失败",
          content: err.mg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 修改数据
  editorPojectDetail: function(obj, data) {
    const url = "/AdminApi/edit_project";
    http.wyPost(url, data).then(
      // eslint-disable-next-line no-unused-vars
      response => {
        obj.$router.push({
          name: "ProjectView",
          params: { id: obj.$route.params.id, name: obj.$route.params.name }
        });
        const toastVnode = {
          message: "修改成功",
          variant: "success",
          title: "操作成功",
          content: obj.$route.params.name + "修改成功"
        };
        setTimeout(() => {
          obj.$WYToast.Toast(obj, toastVnode);
        }, 1000);
      },
      err => {
        const toastVnode = {
          message: "修改失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },
  // 入库数据
  createPojectDetail: function(obj, data) {
    const url = "/AdminApi/add_project";
    http.wyPost(url, data).then(
      // eslint-disable-next-line no-unused-vars
      response => {
        obj.$router.push({
          name: "ProjectManage"
        });

        const toastVnode = {
          message: "入库成功",
          variant: "success",
          title: "操作成功",
          content: obj.detailData.projectName + "入库成功"
        };
        setTimeout(() => {
          obj.$WYToast.Toast(obj, toastVnode);
        }, 1000);
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        const toastVnode = {
          message: "入库失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },
  // 删除数据
  deletePojectDetail: function(obj, data) {
    const url = "/AdminApi/delete_project";
    http.wyPost(url, data).then(
      // 补充删除之后保持在原来页面，以及原来的搜索条件
      // eslint-disable-next-line no-unused-vars
      response => {
        const toastVnode = {
          message: "删除成功",
          variant: "success",
          title: "操作成功",
          content: obj.deleteData.name
        };
        obj.$WYToast.Toast(obj, toastVnode);
        obj.deleteData = {
          id: "",
          name: ""
        };

        const nextUrl = "/AdminApi/get_project_list/";
        const nextParams = {
          projectName: obj.filterForm.projectName,
          isDetect:
            obj.filterForm.isDetect == "是"
              ? 1
              : obj.filterForm.isDetect == "否"
              ? 0
              : ""
        };
        http.wyPost(nextUrl, nextParams).then(nextResponse => {
          const nextTotal = nextResponse.data.count;
          const nextTotalPages = Math.ceil(nextTotal / obj.perPageSize);
          // const totalPages = Math.ceil(obj.total / obj.perPageSize);
          // const nextCurrentPage =
          //   nextTotalPages < totalPages ? nextTotalPages : totalPages;
          const nextCurrentPage =
            obj.currentPage < nextTotalPages ? obj.currentPage : nextTotalPages;

          obj.currentPage = nextCurrentPage;
          const lastParams = {
            pageNum: nextCurrentPage,
            pageSize: obj.perPageSize,
            projectName: obj.filterForm.projectName,
            isDetect:
              obj.filterForm.isDetect == "是"
                ? 1
                : obj.filterForm.isDetect == "否"
                ? 0
                : ""
          };
          obj.$WYHttp.project.getProjectList(obj, lastParams);
        });
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        const toastVnode = {
          message: "删除失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  },

  // 验证项目名称是否存在
  checkProjectNameUnique: function(obj, data) {
    const url = "/AdminApi/check_project_name";
    http.wyPost(url, data).then(
      response => {
        console.log(response);
      },

      err => {
        const message = "检查失败";
        const variant = "warning";
        const title = "操作失败";
        const content = err.msg;
        obj.$WYToast.Toast(obj, message, variant, title, content);
      }
    );
  },

  // 上传附件文件
  uploadProjectData: function(obj, data) {
    const url = "/AdminApi/upload_accessory";
    http.wyPost(url, data).then(
      response => {
        obj.aysnFiles.push(response.data[0]);
        obj.detailData.accessory.push(response.data[0].file_url);
      },

      err => {
        const toastVnode = {
          message: "上传附件失败",
          variant: "warning",
          title: "操作失败",
          content: err.msg
        };
        obj.$WYToast.Toast(obj, toastVnode);
      }
    );
  }
};
