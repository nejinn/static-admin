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
              <nly-col xs="12" md="6">
                <b-form-group
                  label-cols="3"
                  label="项目名称"
                  label-for="project-name"
                  label-align="right"
                >
                  <b-form-input
                    id="project-name"
                    v-model="detailData.projectName"
                  ></b-form-input>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6">
                <b-form-group
                  label-cols="3"
                  label="系统来源"
                  label-for="project-source"
                  label-align="right"
                >
                  <b-form-input
                    id="project-source"
                    v-model="detailData.projectSource"
                  ></b-form-input>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6">
                <b-form-group
                  label-cols="3"
                  label="系统来源"
                  label-for="start-time"
                  label-align="right"
                >
                  <b-input-group class="mb-3">
                    <b-form-input
                      id="start-time"
                      v-model="detailData.startTime"
                      type="text"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-form-datepicker
                        v-model="detailData.startTime"
                        button-only
                        right
                        locale="en-US"
                        aria-controls="example-input"
                      ></b-form-datepicker>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6">
                <b-form-group
                  label-cols="3"
                  label="系统来源"
                  label-for="project-source"
                  label-align="right"
                >
                  <b-form-input
                    id="project-source"
                    v-model="detailData.projectSource"
                  ></b-form-input>
                </b-form-group>
              </nly-col>
            </nly-row>
            <!-- <nly-row>
              <nly-col>
                <b-form-group
                  label-cols="3"
                  label="附件资料"
                  label-for="input-horizontal"
                  label-align="right"
                >
                  <nly-link
                    v-for="(item, index) in detailArray.fileList"
                    :key="index"
                    :href="item.url"
                    replace
                    target="_blank"
                  >
                    <nly-button variant="outlineInfo" class="mr-2" size="sm">
                      {{ item.name }}
                    </nly-button>
                  </nly-link>
                </b-form-group>
              </nly-col>
            </nly-row> -->
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
        isDetect: "",
        progressBar: "",
        taskTotal: "",
        taskFull: "",
        addTime: "",
        accessory: ""
      }
    };
  },
  methods: {
    // 刷新卡片数据
    refreshCardDate() {
      // this.filterForm.filterName = "";
      // this.filterForm.filterSurvey = "";
      // let obj = this;
      // let toastData = {
      //   message: "刷新成功",
      //   variant: "success",
      //   title: "操作成功",
      //   content: this.cardHeaderTitle
      // };
      // let params = {
      //   size: this.perPageSize
      // };
      // this.$NLYHttp.project.refreshCardProjectList(obj, params, toastData);
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
  created() {
    this.cardHeaderTitle = this.$route.params.name;
  },
  mounted() {
    let obj = this;
    let params = {
      projectId: this.$route.params.id
    };
    this.$WYHttp.project.getProjectDetail(obj, params);
  },
  computed: {}
};
</script>
