<template>
  <nly-container-wrapper side-mini layout="fixed">
    <wy-the-header />
    <router-view />
    <nly-collapse-footer>
      <strong
        >Copyright © 2020
        <a href="https://github.com/nejinn/nly-adminlte-vue">nly-adminlte-vue</a
        >.</strong
      >
      All rights reserved.
      <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 0.1.9
      </div>
    </nly-collapse-footer>
    <nly-overlay v-nly-sidebar-collapse.overlay sidebar />
  </nly-container-wrapper>
</template>

import logo from "../assets/nly-adminlte-vue/img/NLYLOGO.png"; export default {
data() { return { logo }; } };
