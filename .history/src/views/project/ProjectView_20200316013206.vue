<template>
  <fullscreen ref="cardscreenfull">
    <NLY-card>
      <NLY-card-header>
        <b-row>
          <NLY-card-header-title>
            {{ cardHeaderTitle }}
          </NLY-card-header-title>
          <NLY-card-header-tools>
            <b-button variant="light" @click="refreshCardDate">
              <NLY-icons icons="fas fa-sync-alt" />
            </b-button>
            <b-button
              variant="light"
              @click="setCardScreenFull"
              v-show="!cardIsFullscreen"
            >
              <NLY-icons icons="fas fa-expand" />
            </b-button>
            <b-button
              variant="light"
              ref="cardscreenfull"
              @click="setCardScreenMini"
              v-show="cardIsFullscreen"
            >
              <NLY-icons icons="fas fa-expand" />
            </b-button>
            <b-button variant="light" @click="changeCardOpen">
              <i class="fas fa-minus"></i>
            </b-button>
          </NLY-card-header-tools>
        </b-row>
      </NLY-card-header>
      <NLY-collapse>
        <NLY-card-body class="collapse-wrap" v-show="cardBodyIsOpen">
          我是查看
        </NLY-card-body></NLY-collapse
      >
    </NLY-card>
  </fullscreen>
</template>

<script>
export default {
  name: "ProjectView",
  data() {
    return {
      cardBodyIsOpen: true,
      cardIsFullscreen: false,
      fullscreen: false,
      cardHeaderTitle: ""
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
  }
};
</script>
