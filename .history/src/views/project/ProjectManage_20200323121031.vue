<template>
  <div>
    <template v-if="$route.meta.containerActive">
      <nly-row>
        <nly-col>
          <nly-card id="cardmaximzed" header-variant="pink" header-outline>
            <nly-card-header>
              {{ cardHeaderTitle }}
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
                  <nly-col xs="12" sm="6" class="my-1">
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
                          <nly-button
                            variant="warning"
                            :disabled="!filterForm.projectName"
                            @click.native="filterForm.projectName = ''"
                            >重置</nly-button
                          >
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </nly-col>

                  <nly-col xs="12" sm="6" class="my-1">
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
                        :options="isDetectOptions"
                      ></b-form-select>
                    </b-form-group>
                  </nly-col>
                </nly-row>
                <nly-row>
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

                  <nly-col
                    xs="12"
                    sm="6"
                    order-xs="1"
                    order-sm="2"
                    class="my-1"
                  >
                    <b-form-group
                      label="数量/每页"
                      label-cols-sm="3"
                      label-align-sm="right"
                      label-size="sm"
                      label-for="per-page-size"
                      class="mb-0"
                    >
                      <b-form-select
                        v-model="perPageSize"
                        id="per-page-size"
                        size="sm"
                        :options="perPageSizeOptions"
                        :autofocus="true"
                      ></b-form-select>
                    </b-form-group>
                  </nly-col>
                </nly-row>
                <nly-row>
                  <div class="table-responsive">
                    <b-table
                      id="project-manage-table"
                      ref="selectableTable"
                      selectable
                      select-mode="multi"
                      :items="items"
                      :fields="fields"
                      @row-selected="onRowSelected"
                      outlined
                      :busy="isBusy"
                      show-empty
                      empty-text="暂无数据"
                      striped
                      bordered
                      hover
                      small
                      stacked="sm"
                      :sticky-header="true"
                      table-class="text-nowrap table-valign-middle"
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
                        <nly-badge
                          bg-gradient-variant="light"
                          style="opacity: 0.5"
                        >
                          {{ data.index + 1 }}
                        </nly-badge>
                      </template>
                      <template v-slot:cell(projectId)="data">
                        <nly-badge
                          bg-gradient-variant="primary"
                          style="width: 100%; opacity: 0.5"
                        >
                          {{ data.value }}
                        </nly-badge>
                      </template>
                      <template v-slot:cell(projectName)="data">
                        <nly-badge
                          bg-gradient-variant="light"
                          style="width: 100%;opacity: 0.8"
                          size="sm"
                        >
                          {{ data.value }}
                        </nly-badge>
                      </template>
                      <template v-slot:cell(isDetect)="data">
                        <nly-badge
                          :variant="data.value == '是' ? 'success' : 'danger'"
                          style="opacity: 0.7"
                        >
                          {{ data.value }}
                        </nly-badge>
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
                      <template v-slot:cell(taskTotal)="data">
                        <nly-badge
                          bg-gradient-variant="purple"
                          style="opacity: 0.4"
                        >
                          {{ data.value }}
                        </nly-badge>
                      </template>
                      <template v-slot:cell(taskFull)="data">
                        <nly-badge
                          bg-gradient-variant="success"
                          style="opacity: 0.4"
                        >
                          {{ data.value }}
                        </nly-badge>
                      </template>
                      <template v-slot:cell(failed_tasks)="data">
                        <nly-badge
                          bg-gradient-variant="danger"
                          style="opacity: 0.4"
                        >
                          {{ data.value }}
                        </nly-badge>
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
                    </b-table>
                  </div>
                </nly-row>

                <nly-pagination
                  ref="pagination"
                  :total="total"
                  :size="perPageSize"
                  :limit="limit"
                  show-pg
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
    <vue-page-transition name="fade-in-up">
      <router-view />
    </vue-page-transition>
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
      fields: projectManageTable.fields,
      items: null,
      selected: [],
      selectedAllRows: false,
      isBusy: false,
      filterForm: {
        projectName: "",
        isDetect: ""
      },
      isDetectOptions: ["是", "否"],
      perPageSizeOptions: [5, 10, 15, 20, 25, 30],
      perPageSize: 10,
      currentPage: 1,
      total: "",
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
    },
    // 查询数据
    queryData() {
      if (
        this.filterForm.projectName === "" &&
        this.filterForm.isDetect === ""
      ) {
        const toastVnode = {
          message: "查询失败",
          variant: "warning",
          title: "操作失败",
          content: "请至少填写一个搜索条件"
        };
        const obj = this;
        this.$WYToast.Toast(obj, toastVnode);
      } else {
        this.currentPage = 1;
        const obj = this;
        const params = {
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
        this.$WYHttp.project.queryProjectList(obj, params);
      }
    },
    // 重置查询条件
    resetQueryCriteria() {
      this.filterForm.projectName = "";
      this.filterForm.isDetect = "";
      const toastVnode = {
        message: "重置成功",
        variant: "success",
        title: "操作成功",
        content: "重置查询条件"
      };
      const obj = this;
      this.$WYToast.Toast(obj, toastVnode);
    },
    // 刷新数据
    refreshDate() {
      const obj = this;
      const params = {
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
      this.$WYHttp.project.refreshProjectList(obj, params);
    },
    goView(row) {
      this.$router.push({
        name: "ProjectView",
        params: { id: row.item.projectId, name: row.item.projectName }
      });
    },
    goEditor(row) {
      this.$router.push({
        name: "ProjectEditor",
        params: { id: row.item.projectId, name: row.item.projectName }
      });
    },
    goStore() {
      this.$router.push({
        name: "ProjectStore"
      });
    },
    // 二次确认删除确定
    deleteOK() {
      this.$bvModal.hide("modal-delete");
      const obj = this;
      const params = {
        projectId: this.deleteData.id
      };

      this.$WYHttp.project.deletePojectDetail(obj, params);
    },
    // 二次确认删除取消
    deleteCancel() {
      this.$bvModal.hide("modal-delete");
      const toastVnode = {
        message: "删除取消",
        variant: "primary",
        title: "操作取消",
        content: this.deleteData.name
      };
      const obj = this;
      this.$WYToast.Toast(obj, toastVnode);
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
      this.perPageSize = 10;
      this.currentPage = 1;
      const obj = this;
      const params = {
        pageNum: this.currentPage,
        pageSize: this.perPageSize
      };

      this.$WYHttp.project.refreshCardProjectList(obj, params);
    },
    // 收起卡片
    changeCardOpen() {
      this.cardBodyIsOpen = this.cardBodyIsOpen ? false : true;
    },
    // 第一页函数
    firstFunction() {
      const obj = this;
      const params = {
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
      const obj = this;
      const params = {
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
      const obj = this;
      const params = {
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
      const obj = this;
      const params = {
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
      const obj = this;
      const params = {
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
      const obj = this;
      const params = {
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
    const obj = this;
    const params = {
      pageNum: 1,
      pageSize: 10
    };

    this.$WYHttp.project.getProjectList(obj, params);
  },
  created() {
    this.currentPage = 1;
    this.perPageSize = 10;
    // this.currentPage = this.$store.state.project.manageData.currentPage || 1;
    // this.perPageSize = this.$store.state.project.manageData.perPageSize || 10;
    // this.filterForm.projectName = this.$store.state.project.manageData.filterForm.projectName;
    // this.filterForm.isDetect = this.$store.state.project.manageData.filterForm.isDetect;
  }
  // watch: {
  //   perPageSize: function(newval, oldval) {
  //     if (newval != oldval) {
  //       this.$store.commit("setProjectManageDataPerPageSize", newval);
  //     }
  //   }
  // }
};
</script>
