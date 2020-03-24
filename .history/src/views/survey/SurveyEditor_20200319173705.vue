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
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="4"
                  label="项目名称"
                  label-for="project-name"
                  label-align-md="right"
                >
                  <b-form-input
                    id="project-name"
                    v-model="detailData.projectName"
                    readonly
                    disabled
                  ></b-form-input>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="4"
                  label="探测进度"
                  label-for="progress-bar"
                  label-align-md="right"
                >
                  <b-form-input
                    id="progress-bar"
                    v-model="detailData.progressBar"
                    readonly
                    disabled
                  ></b-form-input>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="4"
                  label="添加时间"
                  label-for="add-time"
                  label-align-md="right"
                >
                  <b-form-input
                    id="add-time"
                    v-model="detailData.addTime"
                    readonly
                    disabled
                  ></b-form-input>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="4"
                  label="是否需要登录"
                  label-for="is-login"
                  label-align-md="right"
                >
                  <b-form-select
                    v-model="detailData.isLogin"
                    :options="isLoginOptions"
                  ></b-form-select>
                </b-form-group>
              </nly-col>
              <nly-col
                xs="12"
                md="6"
                class="my-1"
                v-show="detailData.isLogin == '是' ? true : false"
              >
                <b-form-group
                  label-cols-md="4"
                  label="登录账号"
                  label-for="project-user"
                  label-align-md="right"
                >
                  <b-form-input
                    id="project-user"
                    v-model="detailData.projectUser"
                    placeholder="请输入账号"
                  ></b-form-input>
                </b-form-group>
              </nly-col>
              <nly-col
                xs="12"
                md="6"
                class="my-1"
                v-show="detailData.isLogin == '是' ? true : false"
              >
                <b-form-group
                  label-cols-md="4"
                  label="登录密码"
                  label-for="project-pwd"
                  label-align-md="right"
                >
                  <b-form-input
                    id="project-pwd"
                    v-model="detailData.projectPwd"
                    placeholder="请输入密码"
                  ></b-form-input>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="4"
                  label="项目地址"
                  label-for="project-url"
                  label-align-md="right"
                >
                  <b-form-input
                    id="project-url"
                    v-model="detailData.projectUrl"
                    placeholder="请输入项目地址"
                  ></b-form-input>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="4"
                  label="兼容浏览器"
                  label-for="compat"
                  label-align-md="right"
                >
                  <b-form-checkbox-group
                    id="compat"
                    v-model="detailData.compat"
                    :options="compatOptions"
                    name="compat"
                  ></b-form-checkbox-group>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="4"
                  label="脚本地址"
                  label-for="detect-script"
                  label-align-md="right"
                >
                  <b-form-file
                    @input="postFile"
                    id="detect-script"
                    v-model="detectScript"
                    ref="detectScript"
                    class="mb-2"
                    browse-text="选择文件"
                    placeholder="请选择文件"
                  ></b-form-file>
                  <p class="mt-2">
                    文件:
                    <nly-button-group
                      class="ml-2"
                      v-for="(item, index) in aysnFiles"
                      :key="index"
                    >
                      <nly-button variant="outlineInfo" size="sm">
                        {{ item.file_name }}
                      </nly-button>
                      <nly-button
                        variant="outlineInfo"
                        size="sm"
                        @click.native="deletedFile(item)"
                      >
                        x
                      </nly-button>
                    </nly-button-group>
                    {{ detailData.detectScript }}
                  </p>
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
        projectName: "",
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
      aysnFiles: {},
      isLoginOptions: ["否", "是"],
      compatOptions: ["IE", "Chrome", "Firefox"]
    };
  },
  methods: {
    deletedFile(item) {
      const urlIndex = this.detailData.detectScript.indexOf(item.file_url);
      if (urlIndex >= 0) {
        this.detailData.detectScript.splice(urlIndex, 1);
      }
      const itemIndex = this.aysnFiles.indexOf(item);
      console.log(itemIndex);
      if (itemIndex >= 0) {
        this.aysnFiles.splice(urlIndex, 1);
      }
    },
    postFile() {
      const param = new FormData();
      param.append("detectScript", this.detectScript);
      const obj = this;
      this.$WYHttp.survey.uploadSurveyScript(obj, param);
    },
    goPrev() {
      this.$router.go(-1);
    },
    // 提交数据
    postData() {
      const obj = this;
      const params = {
        detectId: this.$route.params.id,
        isLogin: this.detailData.isLogin == "是" ? "1" : "0",
        projectUrl: this.detailData.projectUrl,
        projectUser: this.detailData.projectUser,
        projectPwd: this.detailData.projectPwd,
        compat: this.detailData.compat,
        detectScript: this.detailData.detectScript
      };
      this.$WYHttp.survey.editorSurveyDetail(obj, params);
    },
    // 清除文件
    clearFiles() {
      this.$refs["accessory"].reset();
    },
    // 收起卡片
    changeCardOpen() {
      this.cardBodyIsOpen = this.cardBodyIsOpen ? false : true;
    },
    // 验证项目名称是否已存在
    checkProjectName() {
      if (this.detailData.projectName) {
        const obj = this;
        const params = {
          projectName: this.detailData.projectName
        };

        this.$WYHttp.project.checkProjectNameUnique(obj, params);
      }
    }
  },
  created() {
    this.cardHeaderTitle = this.$route.params.name;
  },
  mounted() {
    const obj = this;
    const params = {
      detectId: this.$route.params.id
    };
    this.$WYHttp.survey.getSurveyDetail(obj, params);
  }
};
</script>
