<template>
  <NLY-container :collapseStatus="siderCollapseStatus">
    <NLY-TheAside
      :brandImg="brandImg"
      brandName="NLYAdmin"
      :userImg="brandImg"
      userName="NLY"
      :asideNavbar="asideNavbar"
      v-if="asideNavbar"
    />
    <NLY-content>
      <NLY-TheHeader
        :changeMiniFunction="changeMiniFunction"
        :changeOpenFunction="changeOpenFunction"
        :changeControlSidebarOpenFunction="changeControlSidebarOpenFunction"
        :mediaImg="brandImg"
      />
      <NLY-TheMain />

      <NLY-TheFooter />
    </NLY-content>

    <NLY-TheControlAside :collapseStatus="siderControlCollapseStatus" />

    <NLY-overlay :overlay="overlay" :changeFunction="changeOverlay" />
  </NLY-container>
</template>
<script>
import nav from "./siderbar.js";
import brandImg from "../../assets/logo.png";
export default {
  name: "TheContainer",
  data() {
    return {
      siderCollapseStatus: "max",
      siderControlCollapseStatus: false,
      overlay: false,
      brandImg,
      asideNavbar: nav.data
    };
  },
  methods: {
    changeMiniFunction() {
      this.siderCollapseStatus =
        this.siderCollapseStatus == "max"
          ? "mini"
          : this.siderCollapseStatus == "open"
          ? "mini"
          : "max";
      if (this.overlay == true) {
        this.overlay = false;
      }
    },
    changeOpenFunction() {
      if (this.siderCollapseStatus == "max") {
        this.siderCollapseStatus = "open";
        this.overlay = true;
      } else if (this.siderCollapseStatus == "mini") {
        this.siderCollapseStatus = "open";
        this.overlay = true;
      } else {
        this.siderCollapseStatus = "max";
        this.overlay = false;
      }
    },
    changeOverlay() {
      if (this.overlay == true) {
        this.siderCollapseStatus = "max";
        this.overlay = false;
      }
    },
    changeControlSidebarOpenFunction() {
      this.siderControlCollapseStatus =
        this.siderControlCollapseStatus == true ? false : true;
    }
  },
  // mounted() {
  //   let obj = this;
  //   this.$NLYHttp.container.getUserInfo(obj, {});
  //   console.log(this.asideNavbar);
  // }
  mounted() {
    // this.asideNavbar = nav.data;
  }
};
</script>
