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
              <nly-col>
                <b-form-group
                  label-cols="6"
                  label-cols-lg="3"
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
    // 收起卡片
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
      projectId: this.$route.params.id
    };
    this.$WYHttp.project.getProjectDetail(obj, params);
  },
  computed: {
    detailArray() {
      const dataArray = JSON.parse(JSON.stringify(this.detailData));
      const dataName = {
        projectName: "项目名称",
        projectSource: "系统来源",
        startTime: "项目开始时间",
        endTime: "项目结束时间",
        projectDemand: "项目需求",
        isDetect: "是否探测",
        progressBar: "进度",
        taskTotal: "总任务数",
        taskFull: "成功任务数",
        addTime: "入库时间"
      };

      const dataList = [];
      const fileList = [];
      for (const key in dataArray) {
        if (dataName[key]) {
          dataList.push({
            label: dataName[key],
            text: dataArray[key]
          });
        }
      }
      if (dataArray.accessory) {
        dataArray.accessory.forEach(item => {
          if (item != "") {
            fileList.push({
              url: item,
              name: item.split("/")[item.split("/").length - 1]
            });
          }
        });
      }
      return {
        dataList: dataList,
        fileList: fileList
      };
    }
  }
};
</script>
