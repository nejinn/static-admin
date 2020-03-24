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
                  label="是否需要登录"
                  label-for="is-login"
                  label-align="right"
                >
                  <b-form-select
                    v-model="detailData.isLogin"
                    :options="isLoginOptions"
                  ></b-form-select>
                  {{ detailData.isLogin }}
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
        isLogin: 0,
        projectUrl: "",
        projectUser: "",
        projectPwd: "",
        compat: "",
        detectScript: ""
      },
      detectScript: null,
      isLoginOptions: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true }
      ]
    };
  },
  methods: {
    goPrev() {
      this.$router.go(-1);
    },
    // 提交数据
    postData() {
      const obj = this;
      const params = {
        detectId: this.$route.params.id,
        isLogin: this.detailData.isLogin,
        projectUrl: this.detailData.projectUrl,
        projectUser: this.detailData.projectUser,
        projectPwd: this.detailData.projectPwd,
        compat: this.detailData.compat,
        detectScript: this.detailData.detectScript
      };
      this.$WYHttp.project.editorPojectDetail(obj, params);
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
  },
  computed: {
    accessoryName() {
      return this.detectScript
        ? this.detectScript.map(item => {
            return item.name;
          })
        : [];
    }
  }
};
</script>
