<template>
  <nly-container-wrapper side-mini layout="fixed">
    <wy-the-header />
    <wy-the-aside :logo="logo" username="万英科技"> </wy-the-aside>
    <wy-the-main />
    <wy-the-footer />
    <wy-the-control-aside />
    <nly-overlay v-nly-sidebar-collapse.overlay sidebar />
  </nly-container-wrapper>
</template>

<script>
import logo from "../../assets/nly-adminlte-vue/img/NLYLOGO.jpg";
export default {
  data() {
    return {
      logo
    };
  }
};
</script>
