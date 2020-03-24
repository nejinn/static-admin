<template>
  <nly-navbar
    :variant="navbar.variant"
    navbar-class="xxx"
    header
    :border="navbar.border"
    :size="navbar.size"
    :dark="navbar.dark"
  >
    <nly-navbar-nav class="xxxxx">
      <nly-nav-item v-nly-sidebar-collapse.navitem>
        <nly-icon icon="nlyfont nly-icon-logo-windows" />
      </nly-nav-item>
      <nly-nav-item
        active
        class="d-none d-sm-inline-block"
        :to="{ name: 'collapse' }"
      >
        home
      </nly-nav-item>
    </nly-navbar-nav>
    <nly-navbar-nav class="ml-auto">
      <nly-nav-item v-nly-control-sidebar-collapse>
        <nly-icon icon="nlyfont nly-iconfont nly-icon-settings" />
      </nly-nav-item>
    </nly-navbar-nav>
  </nly-navbar>
</template>
