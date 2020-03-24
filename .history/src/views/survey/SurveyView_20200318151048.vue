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
              <nly-col
                xs="12"
                lg="6"
                v-for="(item, index) in detailArray.dataList"
                :key="index"
              >
                <b-form-group
                  v-if="item.type == 'input'"
                  label-cols="6"
                  :label="item.label"
                  :label-for="'label' + index"
                  label-align="right"
                >
                  <b-form-input
                    :id="'label' + index"
                    plaintext
                    :value="item.text"
                  ></b-form-input>
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
                  编辑项目
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
      detailData: {}
    };
  },
  methods: {
    goPrev() {
      this.$router.go(-1);
    },
    goEditor() {
      this.$router.push({
        name: "ProjectEditor",
        params: { id: this.$route.params.id, name: this.$route.params.name }
      });
    },
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
      detectId: this.$route.params.id
    };
    this.$WYHttp.survey.getSurveyDetail(obj, params);
  },
  computed: {
    detailArray() {
      const dataArray = JSON.parse(JSON.stringify(this.detailData));
      const dataName = {
        projectName: "项目名称",
        progressBar: "进度",
        isLogin: "是否需要登录",
        projectUrl: "项目地址",
        projectUser: "项目账号",
        projectPwd: "项目密码",
        compat: "兼容性",
        detectScript: "探测脚本",
        addTime: "添加时间"
      };

      const dataList = [];
      const fileList = [];
      for (const key in dataArray) {
        if (dataName[key]) {
          if (key == "detectScript") {
            dataList.push({
              label: dataName[key],
              text: dataArray[key],
              type: "botton"
            });
          } else if (key == "compat") {
            dataList.push({
              label: dataName[key],
              text: dataArray[key],
              type: "badge"
            });
          } else {
            dataList.push({
              label: dataName[key],
              text: dataArray[key],
              type: "input"
            });
          }
        }
      }
      return {
        dataList: dataList,
        fileList: fileList
      };
    }
  }
};
</script>
