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
                v-for="(item, index) in detailArray.dataList"
                :key="index"
              >
                <b-form-group
                  :id="'label' + index"
                  label-cols="6"
                  :label="item.label"
                  label-for="input-horizontal"
                  label-align="right"
                >
                  <b-form-input
                    id="input-horizontal"
                    plaintext
                    :value="item.text"
                  ></b-form-input>
                </b-form-group>
              </nly-col>
            </nly-row>
            <nly-row>
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
                    :href="item"
                  >
                    <nly-button variant="outlineInfo" class="mr-2">
                      Button
                    </nly-button>
                  </nly-link>
                  <nly-link>
                    <nly-button variant="outlineInfo" class="mr-2"
                      >Button</nly-button
                    >
                  </nly-link>
                </b-form-group>
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
  computed: {
    detailArray() {
      const dataArray = JSON.parse(JSON.stringify(this.detailData));
      // eslint-disable-next-line no-unused-vars
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
      for (const key in dataArray) {
        if (dataName[key]) {
          dataList.push({
            label: dataName[key],
            text: dataArray[key]
          });
        } else {
          var fileList = dataArray.accessory;
        }
      }
      console.log(fileList);

      const filename = fileList.map(item => {
        return item.substring(fileList.lastIndexOf("\\/") + 1);
      });

      console.log(filename);
      return {
        dataList: dataList,
        fileList: fileList
      };
    }
  }
};
</script>
