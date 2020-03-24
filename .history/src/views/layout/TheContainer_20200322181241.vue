<template>
  <nly-container-wrapper side-mini layout="fixed">
    <wy-the-header />
    <wy-the-aside :logo="logo" username="万英科技" :userimg="userimg">
    </wy-the-aside>
    <wy-the-main />
    <wy-the-footer />
    <wy-the-control-aside />
    <nly-overlay v-nly-sidebar-collapse.overlay sidebar />
  </nly-container-wrapper>
</template>

<script>
import logo from "../../assets/nly-adminlte-vue/img/NLYLOGO.png";
import userimg from "../../assets/nly-adminlte-vue/img/USER.png";
export default {
  data() {
    return {
      logo,
      userimg
    };
  }
};
</script>
