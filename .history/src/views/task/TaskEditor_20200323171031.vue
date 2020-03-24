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
                  label="页面名称"
                  label-for="task-name"
                  label-align-md="right"
                >
                  <b-form-input
                    id="task-name"
                    v-model="detailData.taskName"
                  ></b-form-input>
                </b-form-group>
              </nly-col>
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
                  label="进度"
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
                  label="有无脚本"
                  label-for="is-script"
                  label-align-md="right"
                >
                  <b-form-input
                    id="is-script"
                    v-model="detailData.isScript"
                    readonly
                    disabled
                  ></b-form-input>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="4"
                  label="当前操作"
                  label-for="handle"
                  label-align-md="right"
                >
                  <b-form-input
                    id="handle"
                    v-model="detailData.handle"
                    readonly
                    disabled
                  ></b-form-input>
                </b-form-group>
              </nly-col>
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="4"
                  label="有无脚本"
                  label-for="is-script"
                  label-align-md="right"
                >
                  <b-form-input
                    id="is-script"
                    v-model="detailData.isScript"
                    readonly
                    disabled
                  ></b-form-input>
                </b-form-group>
              </nly-col>
            </nly-row>
            <nly-row>
              <nly-col xs="12" class="my-1">
                <b-form-group
                  label-cols-md="2"
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
                    <nly-button-group class="ml-2" v-if="aysnFiles.file_name">
                      <nly-button variant="outlineInfo" size="sm">
                        {{ aysnFiles.file_name }}
                      </nly-button>
                      <nly-button
                        variant="outlineInfo"
                        size="sm"
                        @click.native="deletedFile()"
                      >
                        x
                      </nly-button>
                    </nly-button-group>
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
                  variant="outlineWarning"
                  class="mr-2 "
                  size="sm"
                  @click.native="goEditor"
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
        taskId: 1,
        taskName: "测试11",
        projectName: "湖南中烟原料信息管理系统",
        progressBar: "30%",
        isScript: "有",
        scriptStatus: "运行中",
        handle: "测试",
        isLog: "查看日志",
        detectScript: "",
        userId: "phuangb",
        dataTotal: 0,
        addTime: "2019-12-03"
      },
      detectScript: null,
      aysnFiles: {}
    };
  },
  methods: {
    goPrev() {
      this.$router.go(-1);
    },
    goEditor() {
      this.$router.push({
        name: "SurveyEditor",
        params: { id: this.$route.params.id, name: this.$route.params.name }
      });
    },
    changeCardOpen() {
      this.cardBodyIsOpen = this.cardBodyIsOpen ? false : true;
    }
  },
  created() {
    this.cardHeaderTitle = this.$route.params.name;
  },
  mounted() {
    const obj = this;
    const params = {
      taskId: this.$route.params.id
    };
    this.$WYHttp.task.getTaskDetail(obj, params);
  }
};
</script>
