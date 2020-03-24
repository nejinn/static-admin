<template>
  <nly-container-wrapper side-mini layout="fixed">
    <wy-the-header />
    <wy-the-aside :logo="logo" username="111"> </wy-the-aside>
    <router-view />
    <wy-the-footer />
    <wy-the-control-aside />
    <nly-overlay v-nly-sidebar-collapse.overlay sidebar />
  </nly-container-wrapper>
</template>

<script>
import logo from "../../assets/nly-adminlte-vue/img/NLYLOGO.png";
export default {
  data() {
    return {
      logo
    };
  }
};
</script>
