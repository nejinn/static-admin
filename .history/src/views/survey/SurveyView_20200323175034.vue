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
                md="6"
                class="my-1"
                v-for="(item, index) in detailArray.dataList"
                :key="index"
              >
                <b-form-group
                  v-if="item.type == 'input'"
                  label-cols-md="6"
                  :label="item.label"
                  :label-for="'label' + index"
                  label-align-md="right"
                >
                  <nly-badge
                    style="width: 100%;font-weight:400"
                    size="sm"
                    badge-class="text-left mr-2 ml-2 mt-2"
                  >
                    {{ item.text }}
                  </nly-badge>
                </b-form-group>
                <b-form-group
                  v-else-if="item.type == 'button'"
                  label-cols-md="6"
                  :label="item.label"
                  :label-for="'label' + index"
                  label-align-md="right"
                >
                  <nly-link :href="item.file_url" replace target="_blank">
                    <nly-button variant="outlineInfo" class="mr-2" size="sm">
                      {{ item.file_name }}
                    </nly-button>
                  </nly-link>
                </b-form-group>
                <b-form-group
                  v-else-if="item.type == 'badge'"
                  label-cols-md="6"
                  :label="item.label"
                  :label-for="'label' + index"
                  label-align-md="right"
                >
                  <nly-badge
                    v-for="(itemChild, index) in item.text"
                    :key="index"
                    bg-gradient-variant="gray"
                    size="sm"
                    badge-class="mr-2 ml-2 mt-2"
                  >
                    {{ itemChild }}
                  </nly-badge>
                </b-form-group>
              </nly-col>
            </nly-row>
            <nly-row>
              <nly-col xs="12" md="6" class="my-1">
                <b-form-group
                  label-cols-md="6"
                  label="查看探测结果"
                  label-for="more-detail"
                  label-align-md="right"
                >
                  <nly-link
                    :to="{
                      name: 'SurveyViewMore',
                      params: {
                        id: this.$route.params.id,
                        name: this.$route.params.name
                      }
                    }"
                  >
                    <nly-button
                      variant="outlineSecondary"
                      class="mr-2"
                      size="sm"
                    >
                      查看探测结果
                    </nly-button>
                  </nly-link>
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
      for (const key in dataArray) {
        if (dataName[key]) {
          if (key == "detectScript") {
            dataList.push({
              label: dataName[key],
              file_name: dataArray[key].file_name,
              file_url: dataArray[key].file_url,
              type: "button"
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
        dataList: dataList
      };
    }
  }
};
</script>
