<template>
  <nly-container-wrapper side-mini layout="fixed">
    <wy-the-header />
    <router-view />
    <nly-collapse-footer :size="footerSizeSm">
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
