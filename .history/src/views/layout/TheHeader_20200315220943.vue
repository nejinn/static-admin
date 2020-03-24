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

      <nly-nav-dropdown
        id="menudropdon1"
        :popup="true"
        :dropdown-toggle="true"
        menu-class="border-0"
        size="xl"
        class="d-none d-sm-inline-block"
      >
        <template slot="linkcontent">
          测试
          <nly-icon icon="nlyfont nly-icon-notification-fill" />
        </template>
        <template slot="menucontent">
          <nly-nav-item :nav-item="false" dropdown-item to="/">
            我是nav-item="false"
          </nly-nav-item>
          <nly-nav-item :nav-item="false" dropdown-item to="nav">
            dropdown-item
          </nly-nav-item>

          <nly-nav-item :nav-item="false" dropdown-item to="/" disabled>
            我是disabled
          </nly-nav-item>
          <nly-nav-item :nav-item="false" dropdown-item to="nav" append>
            我是append
          </nly-nav-item>

          <nly-nav-dropdown
            id="menudropdon2"
            hover
            :nav-item="false"
            submenu
            :nav-link="false"
            dropdown-item
            dropdown-toggle
            size="lg"
            direction="none"
          >
            <template slot="linkcontent">
              我是悬浮菜单
            </template>
            <template slot="menucontent">
              <nly-nav-item
                :nav-item="false"
                dropdown-item
                :to="{ name: 'button' }"
              >
                我是nav-item="false"
              </nly-nav-item>
              <nly-nav-item :nav-item="false" dropdown-item>
                dropdown-item
              </nly-nav-item>

              <nly-nav-dropdown
                :nav-item="false"
                submenu
                :nav-link="false"
                dropdown-item
                dropdown-toggle
                direction="none"
                id="menudropdon3"
              >
                <template slot="linkcontent">
                  我是三级
                </template>
                <template slot="menucontent">
                  <nly-nav-item
                    :nav-item="false"
                    dropdown-item
                    :to="{ name: 'button' }"
                  >
                    我是nav-item="false"
                  </nly-nav-item>
                  <nly-nav-item :nav-item="false" dropdown-item>
                    dropdown-item
                  </nly-nav-item>
                </template>
              </nly-nav-dropdown>
            </template>
          </nly-nav-dropdown>
        </template>
      </nly-nav-dropdown>

      <nly-nav-dropdown
        :popup="true"
        :dropdown-toggle="true"
        menu-class="border-0"
        size="xl"
        hover
        item-class="d-none d-sm-inline-block"
      >
        <template slot="linkcontent">
          我是悬浮菜单
        </template>
        <template slot="menucontent">
          <nly-nav-item :nav-item="false" dropdown-item to="/">
            我是nav-item="false"
          </nly-nav-item>
          <nly-nav-item :nav-item="false" dropdown-item to="nav">
            dropdown-item
          </nly-nav-item>
        </template>
      </nly-nav-dropdown>
    </nly-navbar-nav>
    <nly-navbar-nav class="ml-auto">
      <nly-nav-item v-nly-control-sidebar-collapse>
        <nly-icon icon="nlyfont nly-iconfont nly-icon-settings" />
      </nly-nav-item>
    </nly-navbar-nav>
  </nly-navbar>
</template>
