<template>
  <div>
    <template v-if="$route.meta.containerActive">
      <nly-row>
        <nly-col>
          <nly-card id="cardmaximzed" header-variant="pink" header-outline>
            <nly-card-header>
              项目管理
              <nly-card-tool>
                <nly-button tool @click.native="refreshCardDate">
                  <nly-icon icon="fas fa-sync-alt" />
                </nly-button>

                <nly-button
                  tool
                  v-nly-card-maximized.cardmaximzed="{
                    afterIcon: 'fas fa-compress',
                    beforeIcon: 'fas fa-expand',
                    order: 1
                  }"
                >
                  <nly-icon icon="fas fa-expand" />
                </nly-button>
                <nly-button tool @click.native="changeCardOpen">
                  <nly-icon icon="fas fa-minus" />
                </nly-button>
              </nly-card-tool>
            </nly-card-header>
            <nly-collapse-noclass-transition>
              <nly-card-body class="collapse-wrap" v-show="cardBodyIsOpen">
                <nly-row>
                  <nly-col lg="6" class="my-1">
                    <b-form-group
                      label="项目名称"
                      label-cols-sm="3"
                      label-align-sm="right"
                      label-size="sm"
                      label-for="filter-project-name"
                      class="mb-0"
                    >
                      <b-input-group size="sm">
                        <b-form-input
                          v-model="filterForm.projectName"
                          type="text"
                          id="filter-project-name"
                          placeholder="请输入项目名称"
                        ></b-form-input>
                        <b-input-group-append>
                          <b-button
                            :disabled="!filterForm.projectName"
                            @click="filterForm.projectName = ''"
                            >重置</b-button
                          >
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </nly-col>

                  <nly-col lg="6" class="my-1">
                    <b-form-group
                      label="是否探测"
                      label-cols-sm="3"
                      label-align-sm="right"
                      label-size="sm"
                      label-for="filter-is-detect"
                      class="mb-0"
                    >
                      <b-form-select
                        v-model="filterForm.isDetect"
                        size="sm"
                        id="filter-is-detect"
                        :options="SurveyOptions"
                      ></b-form-select>
                    </b-form-group>
                  </nly-col>
                </nly-row>
                <nly-row>
                  <nly-col
                    lg="6"
                    order-xs="2"
                    order-lg="1"
                    order-md="2"
                    order-sm="2"
                    class="my-1"
                  >
                    <nly-button-group>
                      <nly-button
                        tool
                        button-class="text-info"
                        @click.native="selectAllRows"
                        v-nly-tooltip.hover="{ variant: 'info' }"
                        title="全选数据"
                      >
                        <nly-icon
                          :icon="
                            selectedAllRows
                              ? 'fas nlyfont nly-icon-success'
                              : 'fas nlyfont nly-icon-check'
                          "
                        />
                      </nly-button>

                      <nly-button
                        tool
                        button-class="text-danger"
                        @click.native="trashAllSelected"
                        v-nly-tooltip.hover="{ variant: 'danger' }"
                        title="删除数据"
                      >
                        <nly-icon icon="nlyfont nly-icon-trash-can" />
                      </nly-button>

                      <nly-button
                        tool
                        button-class="text-success"
                        @click.native="queryData"
                        v-nly-tooltip.hover="{ variant: 'success' }"
                        title="查询数据"
                      >
                        <nly-icon icon="nlyfont nly-icon-search" />
                      </nly-button>

                      <nly-button
                        tool
                        button-class="text-warning"
                        @click.native="resetQueryCriteria"
                        v-nly-tooltip.hover="{ variant: 'warning' }"
                        title="重置刷新条件"
                      >
                        <nly-icon icon="nlyfont nly-icon-close" />
                      </nly-button>

                      <nly-button
                        @click.native="refreshDate"
                        tool
                        button-class="text-primary"
                        v-nly-tooltip.hover="{ variant: 'primary' }"
                        title="刷新当前数据"
                      >
                        <nly-icon icon="nlyfont nly-icon-refresh" />
                      </nly-button>

                      <nly-button
                        @click.native="goStore"
                        tool
                        button-class="text-navy"
                        v-nly-tooltip.hover="{ variant: 'navy' }"
                        title="新增数据"
                      >
                        <nly-icon icon="nlyfont nly-icon-new" />
                      </nly-button>
                    </nly-button-group>
                  </nly-col>

                  <nly-col
                    lg="6"
                    order="1"
                    order-lg="2"
                    order-md="1"
                    order-sm="1"
                    class="my-1"
                  >
                    <b-form-group
                      label="数量/每页"
                      label-cols-sm="3"
                      label-align-sm="right"
                      label-size="sm"
                      label-for="perPageSizeSelect"
                      class="mb-0"
                    >
                      <b-form-select
                        v-model="perPageSize"
                        id="perPageSizeSelect"
                        size="sm"
                        :options="perPageSizeOptions"
                        :autofocus="true"
                      ></b-form-select>
                    </b-form-group>
                  </nly-col>
                </nly-row>
                <nly-row>
                  <div class="table-responsive">
                    <nly-table
                      id="project-manage-table"
                      ref="selectableTable"
                      selectable
                      select-mode="multi"
                      :items="items"
                      :fields="fields"
                      @row-selected="onRowSelected"
                      outlined
                      :busy="isBusy"
                      show-empty,
                      empty-text="暂无数据"
                      striped
                      bordered
                      hover
                      small
                      stacked="md"
                      :sticky-header="true"
                      table-class="text-nowrap"
                      :tbody-transition-props="transProps"
                      primary-key="id"
                    >
                      <template v-slot:table-busy>
                        <div class="text-center text-danger my-2">
                          <nly-spinner class="align-middle"></nly-spinner>
                          <strong> 正在努力加载数据</strong>
                        </div>
                      </template>
                      <template v-slot:cell(isSelected)="{ rowSelected }">
                        <template v-if="rowSelected">
                          <nly-icon icon="nlyfont nly-icon-success" />
                          <span class="sr-only">Selected</span>
                        </template>
                        <template v-else>
                          <nly-icon icon="nlyfont nly-icon-check" />
                          <span class="sr-only">Not selected</span>
                        </template>
                      </template>
                      <template v-slot:cell(index)="data">
                        {{ data.index + 1 }}
                      </template>
                      <template v-slot:cell(progressBar)="data">
                        <nly-progress
                          :value="data.value"
                          label-value-percent
                          :variant="
                            data.value == 100
                              ? 'success'
                              : data.value < 100 && data.value >= 90
                              ? 'danger'
                              : data.value < 90 && data.value >= 80
                              ? 'info'
                              : data.value < 80 && data.value >= 60
                              ? 'primary'
                              : 'warning'
                          "
                        >
                        </nly-progress>
                      </template>
                      <template v-slot:cell(action)="row">
                        <nly-button
                          size="sm"
                          variant="info"
                          class="mr-2"
                          @click.native="goView(row)"
                        >
                          <nly-icon icon="nlyfont nly-icon-note-fill" />
                        </nly-button>
                        <nly-button
                          size="sm"
                          variant="primary"
                          class="mr-2"
                          @click.native="goEditor(row)"
                        >
                          <nly-icon icon="nlyfont nly-icon-form" />
                        </nly-button>
                        <nly-button
                          size="sm"
                          variant="danger"
                          class="mr-2"
                          @click.native="showDeleteMsgBox(row)"
                        >
                          <nly-icon icon="nlyfont nly-icon-trash-can-fill" />
                        </nly-button>
                      </template>
                    </nly-table>
                  </div>
                </nly-row>

                <nly-pagination
                  ref="pagination"
                  :total="total"
                  :size="perPageSize"
                  :limit="limit"
                  align="center"
                  :currentPage="currentPage"
                  :firstFunction="firstFunction"
                  :prevFunction="prevFunction"
                  :currentFunction="currentFunction"
                  :nextFunction="nextFunction"
                  :lastFunction="lastFunction"
                  :sizeFunction="sizeFunction"
                  @getCurrentPage="getCurrentPage"
                />
                {{ totalPages }}
              </nly-card-body>
            </nly-collapse-noclass-transition>
            <b-modal id="modal-delete" hide-header>
              <template>
                <p class="my-4">
                  您正在删除 <b> {{ deleteData.name }} </b>
                </p>
              </template>

              <template v-slot:modal-footer>
                <nly-button
                  size="sm"
                  variant="success"
                  @click.native="deleteOK"
                >
                  <nly-icon icon="nlyfont nly-icon-success" />
                </nly-button>
                <nly-button
                  size="sm"
                  variant="danger"
                  @click.native="deleteCancel"
                >
                  <nly-icon icon="nlyfont nly-icon-close" />
                </nly-button>
              </template>
            </b-modal>
          </nly-card>
        </nly-col>
      </nly-row>
    </template>
    <router-view />
  </div>
</template>

<script>
import projectManageTable from "./_projectManageTable.js";
export default {
  name: "ProjectManage",
  data() {
    return {
      cardBodyIsOpen: true,
      cardIsFullscreen: false,
      fullscreen: false,
      fields: projectManageTable.fields,
      items: null,
      selected: [],
      selectedAllRows: false,
      isBusy: false,
      trash: false,
      search: false,
      reset: false,
      refresh: false,
      filterForm: {
        projectName: "",
        isDetect: ""
      },
      SurveyOptions: ["是", "否"],
      perPageSizeOptions: [5, 10, 15, 20, 25, 30],
      perPageSize: 10,
      currentPage: 1,
      total: "",
      totalPages: "",
      limit: 5,
      deleteData: {
        id: "",
        name: ""
      },
      transProps: {
        name: "flip-list"
      }
    };
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    selectAllRows() {
      if (this.selectedAllRows == true) {
        this.$refs.selectableTable.clearSelected();
        this.selectedAllRows = false;
      } else {
        this.$refs.selectableTable.selectAllRows();
        this.selectedAllRows = true;
      }
    },
    // 删除多选数据
    trashAllSelected() {
      // 验证数据
      if (this.selected.length > 0) {
        //http
        let message = "删除成功";
        let variant = "danger";
        let title = "操作成功";
        let content = "";
        this.selected.forEach(option => {
          content = content + option.projectName + "#";
        });
        content = content.substring(0, content.lastIndexOf("#"));
        let obj = this;
        this.$WYToast.Toast(obj, message, variant, title, content);
      } else {
        let message = "删除失败";
        let variant = "warning";
        let title = "操作失败";
        let content = "请选择至少一条数据";
        let obj = this;
        this.$WYToast.Toast(obj, message, variant, title, content);
      }
    },
    // 查询数据
    queryData() {
      if (this.filterForm.projectName == "" && this.filterForm.isDetect == "") {
        let message = "搜索失败";
        let variant = "warning";
        let title = "操作失败";
        let content = "请至少填写一个搜索条件";
        let obj = this;
        this.$WYToast.Toast(obj, message, variant, title, content);
      } else {
        let queryCriteriaProjectName =
          this.filterForm.projectName == ""
            ? "未填写"
            : this.filterForm.projectName;
        let queryCriteriaIsDetect =
          this.filterForm.isDetect == "" ? "未选择" : this.filterForm.isDetect;

        let toastData = {
          message: "搜索成功",
          variant: "success",
          title: "操作成功",
          content: `搜索条件为:包含项目名称 ${queryCriteriaProjectName} 和探测情况 ${queryCriteriaIsDetect} 的数据`
        };

        let obj = this;
        let params = {
          pageNum: 1,
          pageSize: this.perPageSize,
          projectName: this.filterForm.projectName,
          isDetect:
            this.filterForm.isDetect == "是"
              ? 1
              : this.filterForm.isDetect == "否"
              ? 0
              : ""
        };
        this.$WYHttp.project.queryProjectList(obj, params, toastData);
      }
    },
    // 重置查询条件
    resetQueryCriteria() {
      this.filterForm.projectName = "";
      this.filterForm.isDetect = "";

      this.$store.commit("setLManageDataFilterFormProjectName", "");
      this.$store.commit("setLManageDataFilterFormIsDetect", "");
      let message = "重置成功";
      let variant = "success";
      let title = "操作成功";
      let content = "重置搜索条件";
      let obj = this;
      this.$WYToast.Toast(obj, message, variant, title, content);
    },
    // 刷新数据
    refreshDate() {
      let toastData = {
        message: "刷新成功",
        variant: "success",
        title: "操作成功",
        content: "刷新数据"
      };
      let obj = this;

      let params = {
        pageNum: this.currentPage,
        pageSize: this.perPageSize,
        projectName: this.filterForm.projectName,
        isDetect:
          this.filterForm.isDetect == "是"
            ? 1
            : this.filterForm.isDetect == "否"
            ? 0
            : ""
      };
      this.$WYHttp.project.refreshProjectList(obj, params, toastData);
    },
    goView(row) {
      this.$router.push({
        name: "ProjectView",
        params: { id: row.item.id, name: row.item.projectName }
      });
    },
    goEditor(row) {
      this.$router.push({
        name: "ProjectEditor",
        params: { id: row.item.id, name: row.item.projectName }
      });
    },
    goDelete(row) {
      console.log(row);
    },
    goStore() {
      this.$router.push({
        name: "ProjectStore"
      });
    },
    // 二次确认删除确定
    deleteOK() {
      this.$bvModal.hide("modal-delete");
      let toastData = {
        message: "删除成功",
        variant: "success",
        title: "操作成功",
        content: this.deleteData.name
      };
      let obj = this;
      console.log("de", this.deleteData.id);
      let params = {
        projectId: this.deleteData.id
      };

      this.$WYHttp.project.deletePojectDetail(obj, params, toastData);
    },
    // 二次确认删除取消
    deleteCancel() {
      this.$bvModal.hide("modal-delete");
      let message = "删除取消";
      let variant = "primary";
      let title = "操作取消";
      let content = this.deleteData.name;
      let obj = this;
      this.$WYToast.Toast(obj, message, variant, title, content);
      this.deleteData = {
        id: "",
        name: ""
      };
    },
    // 删除二次确认框
    showDeleteMsgBox(row) {
      this.deleteData = {
        id: row.item.projectId,
        name: row.item.projectName
      };
      console.log(this.deleteData.id);
      this.$bvModal.show("modal-delete");
    },
    // 删除成功确认框
    showDeleteSuccessMsgBox() {
      this.$bvModal.msgBoxOk(this.deleteData.name + "数据删除成功", {
        size: "sm",
        buttonSize: "sm",
        okVariant: "确定",
        headerClass: "p-2 border-bottom-0",
        footerClass: "p-2 border-top-0",
        centered: true
      });
    },
    // 刷新卡片数据
    refreshCardDate() {
      this.filterForm.projectName = "";
      this.filterForm.isDetect = "";
      let obj = this;

      let toastData = {
        message: "刷新成功",
        variant: "success",
        title: "操作成功",
        content: this.cardHeaderTitle
      };

      let params = {
        size: this.perPageSize
      };

      this.$WYHttp.project.refreshCardProjectList(obj, params, toastData);
    },
    // 收起卡片
    changeCardOpen() {
      this.cardBodyIsOpen = this.cardBodyIsOpen ? false : true;
    },
    // 卡片全屏
    setCardScreenFull() {
      this.$refs["cardscreenfull"].toggle();
      this.cardIsFullscreen = true;
    },
    // 卡片最小化
    // setCardScreenMini() {
    //   this.fullscreen = this.$fullscreen;
    //   this.cardIsFullscreen = false;
    // },
    // 第一页函数
    firstFunction() {
      let obj = this;
      let params = {
        pageNum: 1,
        pageSize: this.perPageSize,
        projectName: this.filterForm.projectName,
        isDetect:
          this.filterForm.isDetect == "是"
            ? 1
            : this.filterForm.isDetect == "否"
            ? 0
            : ""
      };
      this.$WYHttp.project.getProjectList(obj, params);
    },
    // 上一页函数
    prevFunction() {
      let obj = this;
      let params = {
        pageNum: this.currentPage - 1,
        pageSize: this.perPageSize,
        projectName: this.filterForm.projectName,
        isDetect:
          this.filterForm.isDetect == "是"
            ? 1
            : this.filterForm.isDetect == "否"
            ? 0
            : ""
      };
      this.$WYHttp.project.getProjectList(obj, params);
    },
    // 当前一页函数
    currentFunction() {
      let obj = this;
      let params = {
        pageNum: this.$refs.pagination.tempalteCurrentPage,
        pageSize: this.perPageSize,
        projectName: this.filterForm.projectName,
        isDetect:
          this.filterForm.isDetect == "是"
            ? 1
            : this.filterForm.isDetect == "否"
            ? 0
            : ""
      };
      this.$WYHttp.project.getProjectList(obj, params);
    },
    // 下一页函数
    nextFunction() {
      let obj = this;
      let params = {
        pageNum: this.currentPage + 1,
        pageSize: this.perPageSize,
        projectName: this.filterForm.projectName,
        isDetect:
          this.filterForm.isDetect == "是"
            ? 1
            : this.filterForm.isDetect == "否"
            ? 0
            : ""
      };
      this.$WYHttp.project.getProjectList(obj, params);
    },
    // 最后一页函数
    lastFunction() {
      let obj = this;
      let params = {
        pageNum: this.$refs.pagination.nlyPgPages,
        pageSize: this.perPageSize,
        projectName: this.filterForm.projectName,
        isDetect:
          this.filterForm.isDetect == "是"
            ? 1
            : this.filterForm.isDetect == "否"
            ? 0
            : ""
      };
      this.$WYHttp.project.getProjectList(obj, params);
    },
    // 改变每页数量函数
    sizeFunction() {
      let obj = this;
      let params = {
        pageNum: this.$refs.pagination.tempalteCurrentPage,
        pageSize: this.perPageSize,
        projectName: this.filterForm.projectName,
        isDetect:
          this.filterForm.isDetect == "是"
            ? 1
            : this.filterForm.isDetect == "否"
            ? 0
            : ""
      };
      this.$WYHttp.project.getProjectList(obj, params);
    },
    getCurrentPage(data) {
      this.currentPage = data;
    }
  },
  mounted() {
    let obj = this;
    let params = {
      pageNum: this.currentPage,
      pageSize: this.perPageSize,
      projectName: this.filterForm.projectName,
      isDetect:
        this.filterForm.isDetect == "是"
          ? 1
          : this.filterForm.isDetect == "否"
          ? 0
          : ""
    };

    this.$WYHttp.project.getProjectList(obj, params);
  },
  created() {
    this.currentPage = this.$store.state.project.manageData.currentPage || 1;
    this.perPageSize = this.$store.state.project.manageData.perPageSize || 10;
    this.filterForm.projectName = this.$store.state.project.manageData.filterForm.projectName;
    this.filterForm.isDetect = this.$store.state.project.manageData.filterForm.isDetect;
    // this.totalPages = this.getPages();
    // console.log(this.totalPages);
  },
  watch: {
    perPageSize: function(newval, oldval) {
      if (newval != oldval) {
        this.$store.commit("setLManageDataPerPageSize", newval);
      }
    }
  }
};
</script>

<style>
table#project-manage-table .flip-list-move {
  transition: transform 1s;
}
</style>
