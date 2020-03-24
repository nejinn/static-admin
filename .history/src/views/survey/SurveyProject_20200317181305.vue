<template>
  <div>
    <template v-if="$route.meta.containerActive">
      <nly-row>
        <nly-col>
          <nly-card id="cardmaximzed" header-variant="primary" header-outline>
            <nly-card-header>
              {{ cardHeaderTitle }}
              <nly-card-tool>
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
                  <nly-col xs="12" sm="6" class="my-1">
                    <b-form-group
                      label="搜索关键词"
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
                          placeholder="请输入搜索关键词"
                        ></b-form-input>
                        <b-input-group-append>
                          <nly-button
                            variant="warning"
                            :disabled="!filterForm.filterName"
                            @click="filterForm.filterName = ''"
                            >重置</nly-button
                          >
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </nly-col>
                  <nly-col
                    xs="12"
                    sm="6"
                    class="my-1"
                    order-xs="1"
                    order-sm="2"
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
                      ></b-form-select>
                    </b-form-group>
                  </nly-col>
                </nly-row>
                <nly-row>
                  <nly-col
                    xs="12"
                    sm="6"
                    class="my-1"
                    order-xs="2"
                    order-sm="1"
                  >
                    <nly-col
                      xs="12"
                      sm="6"
                      order-xs="2"
                      order-sm="1"
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
                  </nly-col>
                </nly-row>
                <div class="table-responsive">
                  <b-table
                    ref="selectableTable"
                    selectable
                    select-mode="multi"
                    :items="items"
                    :fields="fields"
                    @row-selected="onRowSelected"
                    outlined
                    :busy="isBusy"
                    striped
                    bordered
                    hover
                    small
                    show-empty
                    empty-text="空空如也"
                    stacked="sm"
                    :sticky-header="true"
                    table-class="text-nowrap"
                  >
                    <!-- Example scoped slot for select state illustrative purposes -->
                    <template v-slot:table-busy>
                      <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> 正在努力加载数据</strong>
                      </div>
                    </template>
                    <template v-slot:cell(IsSelected)="{ rowSelected }">
                      <template v-if="rowSelected">
                        <NLY-icon icon="fa fa-check-square-o" />
                        <span class="sr-only">Selected</span>
                      </template>
                      <template v-else>
                        <NLY-icon icon="fa fa-square-o" />
                        <span class="sr-only">Not selected</span>
                      </template>
                    </template>
                    <template v-slot:cell(index)="data">
                      {{ data.index + 1 }}
                    </template>
                    <template v-slot:cell(scriptAction)="row">
                      <b-button
                        size="sm"
                        :variant="
                          scriptActionDisable(
                            row.item.surveyProgress,
                            row.item.scriptStatus
                          ) == 'unableClick'
                            ? 'danger'
                            : scriptActionDisable(
                                row.item.surveyProgress,
                                row.item.scriptStatus
                              ) == 'resetClick'
                            ? 'warning'
                            : 'success'
                        "
                        class="mr-2"
                        @click="goView(row)"
                      >
                        {{
                          scriptActionDisable(
                            row.item.surveyProgress,
                            row.item.scriptStatus
                          ) == "unableClick"
                            ? "停止探测"
                            : scriptActionDisable(
                                row.item.surveyProgress,
                                row.item.scriptStatus
                              ) == "resetClick"
                            ? "重新探测"
                            : "开始探测"
                        }}
                      </b-button>
                    </template>
                    <template v-slot:cell(action)="row">
                      <b-button
                        size="sm"
                        variant="info"
                        class="mr-2"
                        @click="goView(row)"
                      >
                        查看
                      </b-button>
                      <b-button
                        size="sm"
                        variant="warning"
                        class="mr-2"
                        @click="goEditor(row)"
                      >
                        修改
                      </b-button>
                      <b-button
                        size="sm"
                        variant="danger"
                        class="mr-2"
                        @click="showDeleteMsgBox(row)"
                      >
                        删除
                      </b-button>
                    </template>
                  </b-table>
                </div>
                <div class="overflow-auto project-table-pagination">
                  <b-pagination-nav
                    size="sm"
                    number-of-pages="10"
                    base-url="#"
                    align="center"
                  ></b-pagination-nav>
                </div>
              </nly-card-body>
            </nly-collapse-noclass-transition>
            <b-modal id="modal-delete" hide-header>
              <template>
                <p class="my-4">
                  您正在删除 <b> {{ deleteData.name }} </b>
                </p>
              </template>

              <template v-slot:modal-footer>
                <b-button size="sm" variant="success" @click="deleteOK">
                  确定删除
                </b-button>
                <b-button size="sm" variant="danger" @click="deleteCancel">
                  取消删除
                </b-button>
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
import projectSurveyTable from "./_surveyProjectTable.js";
export default {
  name: "SurveyProject",
  data() {
    return {
      cardHeaderTitle: projectSurveyTable.name,
      cardBodyIsOpen: true,
      cardIsFullscreen: false,
      fullscreen: false,
      fields: projectSurveyTable.fields,
      items: projectSurveyTable.items,
      selected: [],
      selectedAllRows: false,
      isBusy: false,
      trash: false,
      search: false,
      reset: false,
      refresh: false,
      filterForm: {
        filterName: "",
        filterLoginRequired: "",
        filterSurvey: "",
        filterScript: ""
      },
      SurveyOptions: ["是", "否"],
      loginRequiredOptions: ["是", "否"],
      scriptOptions: ["有", "无"],
      perPageSizeOptions: [5, 10, 15, 20, 25, 30],
      perPageSize: "",
      deleteData: {
        id: "",
        name: ""
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
          content = content + option.name + "#";
        });
        content = content.substring(0, content.lastIndexOf("#"));
        let obj = this;
        this.$NLYinstructions.Toast(obj, message, variant, title, content);
      } else {
        let message = "删除失败";
        let variant = "warning";
        let title = "操作失败";
        let content = "请选择至少一条数据";
        let obj = this;
        this.$NLYinstructions.Toast(obj, message, variant, title, content);
      }
    },
    // 搜索数据
    queryData() {
      if (
        this.filterForm.filterName == "" &&
        this.filterForm.filterSurvey == ""
      ) {
        let message = "搜索失败";
        let variant = "warning";
        let title = "操作失败";
        let content = "请至少填写一个搜索条件";
        let obj = this;
        this.$NLYinstructions.Toast(obj, message, variant, title, content);
      } else {
        let queryCriteriaFilterName =
          this.filterForm.filterName == ""
            ? "未填写"
            : this.filterForm.filterName;
        let queryCriteriaFilterSurvey =
          this.filterForm.filterSurvey == ""
            ? "未选择"
            : this.filterForm.filterSurvey;

        let message = "搜索成功";
        let variant = "success";
        let title = "操作成功";
        let content = `搜索条件为:包含项目名称 ${queryCriteriaFilterName} 和探测情况 ${queryCriteriaFilterSurvey} 的数据`;
        let obj = this;
        this.$NLYinstructions.Toast(obj, message, variant, title, content);
      }
    },
    // 重置查询条件
    resetQueryCriteria() {
      this.reset = true;
      this.filterForm.filterName = "";
      this.filterForm.filterSurvey = "";
      let message = "重置成功";
      let variant = "success";
      let title = "操作成功";
      let content = "重置搜索条件";
      let obj = this;
      this.$NLYinstructions.Toast(obj, message, variant, title, content);
    },
    // 刷新数据
    refreshDate() {
      this.refresh = true;
      setTimeout(() => {
        this.refresh = false;
      }, 1000);
      let message = "刷新成功";
      let variant = "success";
      let title = "操作成功";
      let content = "刷新数据";
      let obj = this;
      this.$NLYinstructions.Toast(obj, message, variant, title, content);
    },
    goView(row) {
      this.$router.push({
        name: "ProjectView",
        params: { id: row.item.id, name: row.item.name }
      });
    },
    goEditor(row) {
      this.$router.push({
        name: "ProjectEditor",
        params: { id: row.item.id, name: row.item.name }
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
      console.log(this.deleteData);
      this.$bvModal.hide("modal-delete");
      // http
      let message = "删除成功";
      let variant = "danger";
      let title = "操作成功";
      let content = this.deleteData.name;
      let obj = this;
      this.$NLYinstructions.Toast(obj, message, variant, title, content);
      this.deleteData = {
        id: "",
        name: ""
      };
      console.log(this.deleteData);
    },
    // 二次确认删除取消
    deleteCancel() {
      this.$bvModal.hide("modal-delete");
      console.log(this.deleteData);
      let message = "删除取消";
      let variant = "primary";
      let title = "操作取消";
      let content = this.deleteData.name;
      let obj = this;
      this.$NLYinstructions.Toast(obj, message, variant, title, content);
      this.deleteData = {
        id: "",
        name: ""
      };
    },
    // 删除二次确认框
    showDeleteMsgBox(row) {
      this.deleteData = {
        id: row.item.id,
        name: row.item.name
      };
      console.log(this.deleteData);
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
      this.reset = true;
      this.filterForm.filterName = "";
      this.filterForm.filterSurvey = "";
      let message = "刷新成功";
      let variant = "success";
      let title = "操作成功";
      let content = this.cardHeaderTitle;
      let obj = this;
      this.$NLYinstructions.Toast(obj, message, variant, title, content);
    },
    // 收起卡片
    changeCardOpen() {
      this.cardBodyIsOpen = this.cardBodyIsOpen ? false : true;
    },
    // 卡片全屏
    setCardScreenFull() {
      this.$refs["cardscreenfull"].toggle();
    },
    // 卡片最小化
    setCardScreenMini() {
      this.fullscreen = this.$fullscreen;
      this.cardIsFullscreen = true;
    }
  },
  computed: {
    scriptActionDisable() {
      return function(var1, var2) {
        let progress = var1;
        let status = var2;
        if (parseInt(progress) == 100) {
          return "resetClick";
        } else if (status == "运行中") {
          return "unableClick";
        } else {
          return "ableClick";
        }
      };
    }
  }
};
</script>

<style scoped>
.project-action-btn-group {
  float: left;
  padding: 0 0 0.5rem 0;
}

.project-action-btn {
  border-color: rgba(255, 255, 255, 0);
}

.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  outline: none;
  box-shadow: none;
}

.project-action-btn-icons {
  height: 1.6rem;
  width: 1.6rem;
}

.row-selected {
  text-align: center;
}

.project-table-pagination {
  padding-top: 1rem;
}

/* .table-responsive {
  display: table !important;
} */
</style>
