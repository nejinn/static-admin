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
                      label-for="filterName"
                      class="mb-0"
                    >
                      <b-input-group size="sm">
                        <b-form-input
                          v-model="filterForm.filterName"
                          type="text"
                          id="filterName"
                          placeholder="请输入项目名称"
                        ></b-form-input>
                        <b-input-group-append>
                          <b-button
                            :disabled="!filterForm.filterName"
                            @click="filterForm.filterName = ''"
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
                      label-for="filterSurveySelect"
                      class="mb-0"
                    >
                      <b-form-select
                        v-model="filterForm.filterSurvey"
                        size="sm"
                        id="filterSurveySelect"
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
                        bg-variant="info"
                        @click.native="selectAllRows"
                      >
                        <nly-icon
                          :icon="
                            selectedAllRows
                              ? 'fas nlyfont nly-icon-check'
                              : 'fas nlyfont nly-icon-check'
                          "
                        />
                      </nly-button>

                      <nly-button tool @click.native="trashAllSelected">
                        <nly-icon icon="nlyfont nly-icon-trash" />
                      </nly-button>

                      <nly-button tool @click.native="queryData">
                        <nly-icon icon="nlyfont nly-icon-circle-search-fill" />
                      </nly-button>

                      <nly-button
                        tool
                        @click="resetQueryCriteria"
                        v-nly-tooltip.hover
                        title="重置刷新条件"
                      >
                        <nly-icon icon="nlyfont nly-icon-close-fill" />
                      </nly-button>

                      <nly-button
                        tool
                        @click="refreshDate"
                        v-nly-tooltip.hover
                        title="刷新当前数据"
                      >
                        <nly-icon icon="nlyfont nly-icon-refresh-fill" />
                      </nly-button>

                      <nly-button
                        tool
                        click="goStore"
                        v-nly-tooltip.hover
                        title="新增项目"
                      >
                        <nly-icon icon="nlyfont nly-icon-new-fill" />
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
                <NLY-table-responsive>
                  <b-table
                    ref="selectableTable"
                    selectable
                    select-mode="multi"
                    :items="items"
                    :fields="fields"
                    @row-selected="onRowSelected"
                    responsive
                    outlined
                    :busy="isBusy"
                    striped
                    bordered
                    hover
                    small
                    show-empty
                    empty-text="空空如也"
                    stacked="md"
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
                    <template v-slot:cell(isSelected)="{ rowSelected }">
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
                        <NLY-icon
                          icon="iconfont delete-smshanchu"
                          class="nlyprimary"
                        />
                      </b-button>
                    </template>
                  </b-table>
                </NLY-table-responsive>

                <NLY-pagination
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
                  :showPg="true"
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
import projectManageTable from "./_projectManageTable.js";
export default {
  name: "ProjectManage",
  data() {
    return {
      cardHeaderTitle: projectManageTable.name,
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
        filterName: "",
        filterSurvey: ""
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
    // 查询数据
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

        let toastData = {
          message: "搜索成功",
          variant: "success",
          title: "操作成功",
          content: `搜索条件为:包含项目名称 ${queryCriteriaFilterName} 和探测情况 ${queryCriteriaFilterSurvey} 的数据`
        };

        let obj = this;
        let params = {
          page: 1,
          size: this.perPageSize,
          name__icontains: this.filterForm.filterName,
          is_survey:
            this.filterForm.filterSurvey == "是"
              ? "True"
              : this.filterForm.filterSurvey == "否"
              ? "False"
              : ""
        };
        this.$NLYHttp.project.queryProjectList(obj, params, toastData);
      }
    },
    // 重置查询条件
    resetQueryCriteria() {
      this.filterForm.filterName = "";
      this.filterForm.filterSurvey = "";

      this.$store.commit("setLManageDataFilterFormFilterName", "");
      this.$store.commit("setLManageDataFilterFormFilterSurvey", "");
      let message = "重置成功";
      let variant = "success";
      let title = "操作成功";
      let content = "重置搜索条件";
      let obj = this;
      this.$NLYinstructions.Toast(obj, message, variant, title, content);
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
        page: this.currentPage,
        size: this.perPageSize,
        name__icontains: this.filterForm.filterName,
        is_survey:
          this.filterForm.filterSurvey == "是"
            ? "True"
            : this.filterForm.filterSurvey == "否"
            ? "False"
            : ""
      };
      this.$NLYHttp.project.refreshProjectList(obj, params, toastData);
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
      this.filterForm.filterName = "";
      this.filterForm.filterSurvey = "";
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
        page: 1,
        size: this.perPageSize,
        name__icontains: this.filterForm.filterName,
        is_survey:
          this.filterForm.filterSurvey == "是"
            ? "True"
            : this.filterForm.filterSurvey == "否"
            ? "False"
            : ""
      };
      this.$NLYHttp.project.getProjectList(obj, params);
    },
    // 上一页函数
    prevFunction() {
      let obj = this;
      let params = {
        page: this.currentPage - 1,
        size: this.perPageSize,
        name__icontains: this.filterForm.filterName,
        is_survey:
          this.filterForm.filterSurvey == "是"
            ? "True"
            : this.filterForm.filterSurvey == "否"
            ? "False"
            : ""
      };
      this.$NLYHttp.project.getProjectList(obj, params);
    },
    // 当前一页函数
    currentFunction() {
      let obj = this;
      let params = {
        page: this.$refs.pagination.tempalteCurrentPage,
        size: this.perPageSize,
        name__icontains: this.filterForm.filterName,
        is_survey:
          this.filterForm.filterSurvey == "是"
            ? "True"
            : this.filterForm.filterSurvey == "否"
            ? "False"
            : ""
      };
      this.$NLYHttp.project.getProjectList(obj, params);
    },
    // 下一页函数
    nextFunction() {
      let obj = this;
      let params = {
        page: this.currentPage + 1,
        size: this.perPageSize,
        name__icontains: this.filterForm.filterName,
        is_survey:
          this.filterForm.filterSurvey == "是"
            ? "True"
            : this.filterForm.filterSurvey == "否"
            ? "False"
            : ""
      };
      this.$NLYHttp.project.getProjectList(obj, params);
    },
    // 最后一页函数
    lastFunction() {
      let obj = this;
      let params = {
        page: this.$refs.pagination.nlyPgPages,
        size: this.perPageSize,
        name__icontains: this.filterForm.filterName,
        is_survey:
          this.filterForm.filterSurvey == "是"
            ? "True"
            : this.filterForm.filterSurvey == "否"
            ? "False"
            : ""
      };
      this.$NLYHttp.project.getProjectList(obj, params);
    },
    // 改变每页数量函数
    sizeFunction() {
      let obj = this;
      let params = {
        page: this.$refs.pagination.tempalteCurrentPage,
        size: this.perPageSize,
        name__icontains: this.filterForm.filterName,
        is_survey:
          this.filterForm.filterSurvey == "是"
            ? "True"
            : this.filterForm.filterSurvey == "否"
            ? "False"
            : ""
      };
      this.$NLYHttp.project.getProjectList(obj, params);
    },
    getCurrentPage(data) {
      this.currentPage = data;
    }
  },
  mounted() {
    let obj = this;
    let params = {
      page: this.currentPage,
      size: this.perPageSize,
      name__icontains: this.filterForm.filterName,
      is_survey:
        this.filterForm.filterSurvey == "是"
          ? "True"
          : this.filterForm.filterSurvey == "否"
          ? "False"
          : ""
    };

    this.$WYHttp.project.getProjectList(obj, params);
  },
  created() {
    this.currentPage = this.$store.state.project.manageData.currentPage || 1;
    this.perPageSize = this.$store.state.project.manageData.perPageSize || 10;
    this.filterForm.filterName = this.$store.state.project.manageData.filterForm.filterName;
    this.filterForm.filterSurvey = this.$store.state.project.manageData.filterForm.filterSurvey;
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
