<template>
  <nly-row>
    <nly-col>
      <nly-card header-variant="indigo" id="cardmaximzed" header-outline>
        <nly-card-header>
          新增探测结果
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
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="4"
                  label="项目名称"
                  label-for="project-name"
                  label-align-md="right"
                >
                  <b-form-select
                    id="project-name"
                    v-model="detailData.projectId"
                    :options="projectIdOptions"
                    value-field="projectId"
                    text-field="projectName"
                  ></b-form-select>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="4"
                  label="项目名称"
                  label-for="project-name"
                  label-align-md="right"
                >
                  <b-form-select
                    id="project-name"
                    v-model="detailData.projectId"
                    :options="projectIdOptions"
                    value-field="projectId"
                    text-field="projectName"
                  ></b-form-select>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="4"
                  label="项目名称"
                  label-for="project-name"
                  label-align-md="right"
                >
                  <b-form-select
                    id="project-name"
                    v-model="detailData.projectId"
                    :options="projectIdOptions"
                    value-field="projectId"
                    text-field="projectName"
                  ></b-form-select>
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
                  @click.native="postData"
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
        projectId: "",
        progressBar: "",
        addTime: "",
        isLogin: "否",
        projectUrl: "",
        projectUser: "",
        projectPwd: "",
        compat: null,
        detectScript: ""
      },
      detectScript: null,
      isLoginOptions: ["否", "是"],
      compatOptions: ["IE", "Chrome", "Firefox"],
      projectIdOptions: [],
      aysnFiles: []
    };
  },
  methods: {
    deletedFile() {
      this.$refs["detectScript"].reset();
      this.aysnFiles = [];
      this.detailData.detectScript = "";
    },
    postFile() {
      if (this.detectScript) {
        const param = new FormData();
        param.append("detectScript", this.detectScript);
        const obj = this;
        this.$WYHttp.survey.uploadSurveyScript(obj, param);
      }
    },
    goPrev() {
      this.$router.go(-1);
    },
    // 提交数据
    postData() {
      const obj = this;
      const params = {
        projectId: this.detailData.projectId,
        isLogin: this.detailData.isLogin,
        projectUrl: this.detailData.projectUrl,
        projectUser: this.detailData.projectUser,
        projectPwd: this.detailData.projectPwd,
        compat: this.detailData.compat,
        detectScript: this.detailData.detectScript
      };
      this.$WYHttp.survey.addSurveyDetail(obj, params);
    },
    // 清除文件
    clearFiles() {
      this.$refs["accessory"].reset();
    },
    // 收起卡片
    changeCardOpen() {
      this.cardBodyIsOpen = this.cardBodyIsOpen ? false : true;
    }
  },
  mounted() {
    const obj = this;
    this.$WYHttp.survey.getSurveyAddProjectIdOptions(obj, {});
  }
};
</script>
