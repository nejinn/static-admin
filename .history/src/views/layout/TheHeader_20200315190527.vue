<template>
  <NLY-header>
    <NLY-navbar>
      <NLY-navbar-nav>
        <NLY-navbar-siderbar-collapse
          :changeFunction="changeMiniFunction"
          class="d-none d-lg-block"
        />

        <NLY-navbar-siderbar-collapse
          :changeFunction="changeOpenFunction"
          class="d-lg-none"
        />

        <NLY-navbar-nav-item itemRouter="/dashboard">
          仪表盘
        </NLY-navbar-nav-item>
      </NLY-navbar-nav>

      <NLY-navbar-nav-searchform />

      <NLY-navbar-nav-dropdown class="ml-auto">
        <NLY-navbar-nav-dropdown-menu
          align="right"
          icon="nlyfont nly-mail-fill"
          size="lg"
        >
          <template slot="badge">
            <NLY-badge size="sm" variant="primary">
              12
            </NLY-badge>
          </template>

          <template slot="content">
            <NLY-navbar-nav-dropdown-menu-item itemRouter="/test">
              <NLY-navbar-nav-dropdown-menu-item-media>
                <NLY-navbar-nav-dropdown-menu-item-media-img
                  :mediaImg="mediaImg"
                />
                <NLY-navbar-nav-dropdown-menu-item-media-body>
                  <NLY-navbar-nav-dropdown-menu-item-media-title
                    variant="text-danger"
                    size="sm"
                    icon="nlyfont nly-star"
                  >
                    姚欣
                  </NLY-navbar-nav-dropdown-menu-item-media-title>
                  <NLY-navbar-nav-dropdown-menu-item-media-content>
                    你今天吃了吗
                  </NLY-navbar-nav-dropdown-menu-item-media-content>
                  <NLY-navbar-nav-dropdown-menu-item-tip
                    size="sm"
                    icon="nlyfont nly-time"
                  >
                    4分钟之前
                  </NLY-navbar-nav-dropdown-menu-item-tip>
                </NLY-navbar-nav-dropdown-menu-item-media-body>
              </NLY-navbar-nav-dropdown-menu-item-media>
            </NLY-navbar-nav-dropdown-menu-item>

            <NLY-navbar-nav-dropdown-menu-item-footer itemRouter="/test">
              查看所有
            </NLY-navbar-nav-dropdown-menu-item-footer>
          </template>
        </NLY-navbar-nav-dropdown-menu>

        <NLY-navbar-nav-dropdown-menu
          align="right"
          icon="nlyfont nly-notification-fill"
          size="lg"
        >
          <template slot="badge">
            <NLY-badge size="sm" variant="info">
              5
            </NLY-badge>
          </template>
          <template slot="content">
            <NLY-navbar-nav-dropdown-menu-item-header>
              15条未读消息
            </NLY-navbar-nav-dropdown-menu-item-header>
            <NLY-navbar-nav-dropdown-menu-item itemRouter="/123">
              <NLY-navbar-nav-dropdown-menu-item-icon
                icon="nlyfont nly-notification"
              />
              4 new messages
              <NLY-navbar-nav-dropdown-menu-item-tip size="sm" align="right">
                4分钟之前
              </NLY-navbar-nav-dropdown-menu-item-tip>
            </NLY-navbar-nav-dropdown-menu-item>
            <NLY-navbar-nav-dropdown-menu-item-footer itemRouter="/test">
              查看所有
            </NLY-navbar-nav-dropdown-menu-item-footer>
          </template>
        </NLY-navbar-nav-dropdown-menu>

        <NLY-navbar-nav-dropdown-menu
          align="right"
          icon="nlyfont nly-user-fill"
        >
          <template slot="content">
            <NLY-navbar-nav-dropdown-menu-item itemRouter="/123" align="center">
              修改资料
            </NLY-navbar-nav-dropdown-menu-item>
            <NLY-navbar-nav-dropdown-menu-item itemRouter="/123" align="center">
              退出登录
            </NLY-navbar-nav-dropdown-menu-item>
          </template>
        </NLY-navbar-nav-dropdown-menu>

        <NLY-navbar-control-sider-collapse
          :changeFunction="changeControlSidebarOpenFunction"
          icon="nlyfont nly-nav-tool"
        />
      </NLY-navbar-nav-dropdown>
    </NLY-navbar>
  </NLY-header>
</template>

<script>
export default {
  name: "TheHeader",
  props: {
    changeMiniFunction: {
      type: Function,
      required: true
    },
    changeOpenFunction: {
      type: Function,
      required: true
    },
    changeControlSidebarOpenFunction: {
      type: Function,
      required: true
    },
    mediaImg: {
      type: String,
      required: true
    }
  }
};
</script>
