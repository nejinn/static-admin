<template>
  <nly-row>
    <nly-col>
      <nly-card header-variant="indigo" id="cardmaximzed" header-outline>
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
              <nly-col xs="12" lg="6">
                <b-form-group
                  label-cols="4"
                  label="项目名称"
                  label-for="project-name"
                  label-align="right"
                >
                  <b-form-input
                    id="project-name"
                    v-model="detailData.projectName"
                    placeholder="请输入项目名称"
                    :state="projectNameState"
                  ></b-form-input>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" lg="6">
                <b-form-group
                  label-cols="4"
                  label="系统来源"
                  label-for="project-source"
                  label-align="right"
                >
                  <b-form-input
                    id="project-source"
                    v-model="detailData.projectSource"
                    placeholder="请输入系统来源"
                  ></b-form-input>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" lg="6">
                <b-form-group
                  label-cols="4"
                  label="项目开始时间"
                  label-for="start-time"
                  label-align="right"
                >
                  <b-input-group class="mb-3">
                    <b-form-input
                      id="start-time"
                      v-model="detailData.startTime"
                      type="text"
                      placeholder="请选择时间"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-form-datepicker
                        v-model="detailData.startTime"
                        button-only
                        right
                        aria-controls="start-time"
                      ></b-form-datepicker>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" lg="6">
                <b-form-group
                  label-cols="4"
                  label="项目结束时间"
                  label-for="end-time"
                  label-align="right"
                >
                  <b-input-group class="mb-3">
                    <b-form-input
                      id="end-time"
                      v-model="detailData.endTime"
                      type="text"
                      placeholder="请选择时间"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-form-datepicker
                        v-model="detailData.endTime"
                        button-only
                        right
                        aria-controls="end-time"
                      ></b-form-datepicker>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </nly-col>
            </nly-row>

            <nly-row>
              <nly-col>
                <b-form-group
                  label-cols="2"
                  label="附件资料"
                  label-for="accessory"
                  label-align="right"
                >
                  <b-form-file
                    id="accessory"
                    v-model="accessory"
                    ref="accessory"
                    class="mb-2"
                    multiple
                    browse-text="选择文件"
                    placeholder="请选择文件"
                  ></b-form-file>

                  <nly-button
                    @click.native="clearFiles"
                    class="mr-2"
                    size="sm"
                    variant="outlineDanger"
                  >
                    清除选择的文件
                  </nly-button>
                  <p class="mt-2">
                    文件:
                    <nly-link
                      v-for="(item, index) in accessoryName"
                      :key="index"
                    >
                      <nly-button variant="outlineInfo" class="mr-2" size="sm">
                        {{ item }}
                      </nly-button>
                    </nly-link>
                  </p>
                </b-form-group>
              </nly-col>
            </nly-row>
            <nly-row>
              <nly-col>
                <b-form-group
                  label-cols="2"
                  label="项目需求"
                  label-for="project-demand"
                  label-align="right"
                >
                  <b-form-textarea
                    id="project-demand"
                    placeholder="请输入项目需求"
                    rows="8"
                    v-model="detailData.projectDemand"
                  ></b-form-textarea>
                </b-form-group>
              </nly-col>
            </nly-row>
            <nly-row>
              <nly-col class="text-center">
                <nly-button
                  variant="outlineInfo"
                  class="mr-2"
                  size="sm"
                  @click.native="goPrev"
                >
                  返回上页
                </nly-button>
                <nly-button
                  variant="outlineSuccess"
                  class="mr-2 "
                  size="sm"
                  @click.native="createData"
                >
                  提交数据
                </nly-button>
              </nly-col>
            </nly-row>
          </nly-card-body>
        </nly-collapse-noclass-transition>
      </nly-card>
    </nly-col>
  </nly-row>
</template>

<script>
export default {
  name: "ProjectView",
  data() {
    return {
      cardBodyIsOpen: true,
      cardHeaderTitle: "",
      detailData: {
        projectName: "",
        projectSource: "",
        startTime: "",
        endTime: "",
        projectDemand: "",
        accessory: null
      },
      accessory: null,
      projectNameState: null
    };
  },
  methods: {
    goPrev() {
      this.$router.go(-1);
    },
    createData() {
      if (this.projectNameState) {
        let toastData = {
          message: "入库成功",
          variant: "success",
          title: "操作成功",
          content: this.detailData.projectName + "入库成功"
        };
        let obj = this;
        let params = {
          projectId: this.$route.params.id,
          projectName: this.detailData.projectName,
          projectSource: this.detailData.projectSource,
          startTime: this.detailData.startTime,
          endTime: this.detailData.endTime,
          projectDemand: this.detailData.projectDemand
        };
        this.$WYHttp.project.createPojectDetailData(obj, params, toastData);
      } else {
        let message = "新增失败";
        let variant = "warning";
        let title = "操作失败";
        let content = "项目名称是必填的";
        let obj = this;
        this.$WYToast.Toast(obj, message, variant, title, content);
      }
    },
    clearFiles() {
      this.$refs["accessory"].reset();
    },
    // 刷新卡片数据
    refreshCardDate() {},
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
  created() {
    this.cardHeaderTitle = this.$route.params.name;
  },
  computed: {
    accessoryName() {
      return this.accessory
        ? this.accessory.map(item => {
            return item.name;
          })
        : [];
    }
  },
  watch: {
    detailData: {
      handler(newVal) {
        if (!newVal.projectName || null) {
          this.projectNameState = false;
        } else {
          this.projectNameState = true;
        }
      },
      deep: true
    }
  }
};
</script>
