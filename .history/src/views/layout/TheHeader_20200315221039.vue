<template>
  <nly-navbar header>
    <nly-navbar-nav class="xxxxx">
      <nly-nav-item v-nly-sidebar-collapse.navitem>
        <nly-icon icon="nlyfont nly-icon-logo-windows" />
      </nly-nav-item>
      <nly-nav-item
        active
        class="d-none d-sm-inline-block"
        :to="{ name: 'collapse' }"
      >
        仪表盘
      </nly-nav-item>
    </nly-navbar-nav>
    <nly-navbar-nav class="ml-auto">
      <nly-nav-item v-nly-control-sidebar-collapse>
        <nly-icon icon="nlyfont nly-iconfont nly-icon-settings" />
      </nly-nav-item>
    </nly-navbar-nav>
  </nly-navbar>
</template>
