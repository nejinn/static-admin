<template>
  <NLY-container :collapseStatus="siderCollapseStatus">
    <NLY-sider>
      <NLY-sider-brand brandRouter="/">
        <NLY-sider-brand-img :brandImg="brandImg" />
        <NLY-sider-brand-info>
          Nejinn Lerity Admin
        </NLY-sider-brand-info>
      </NLY-sider-brand>

      <NLY-siderbar>
        <!-- Sidebar user panel (optional) -->
        <NLY-siderbar-user>
          <NLY-siderbar-user-img :userImg="brandImg" />
          <NLY-siderbar-user-info>
            姚欣
          </NLY-siderbar-user-info>
        </NLY-siderbar-user>

        <!-- Sidebar Menu -->
        <NLY-siderbar-menu>
          <NLY-siderbar-menu-nav>
            <NLY-siderbar-menu-nav-item
              activeProof="/"
              itemRouter="/"
              icon="fa fa-th-list"
            >
              Dashboard
            </NLY-siderbar-menu-nav-item>
            <NLY-siderbar-menu-nav-tree>
              <NLY-siderbar-menu-nav-tree-item
                icon="fa fa-th-list"
                toggleId="accordion-1"
                activeProof="test"
              >
                我是测试
              </NLY-siderbar-menu-nav-tree-item>
              <NLY-siderbar-menu-nav-tree-nav>
                <NLY-siderbar-menu-nav-tree-nav-collapse
                  collapseId="accordion-1"
                  visibleProof="test"
                >
                  <NLY-siderbar-menu-nav-tree-nav-item
                    itemRouter="/test/1"
                    activeProof="/test/1"
                  >
                    我是1
                  </NLY-siderbar-menu-nav-tree-nav-item>

                  <NLY-siderbar-menu-nav-tree-nav-item
                    itemRouter="/test/2"
                    activeProof="/test/2"
                  >
                    我是2
                  </NLY-siderbar-menu-nav-tree-nav-item>
                </NLY-siderbar-menu-nav-tree-nav-collapse>
              </NLY-siderbar-menu-nav-tree-nav>
            </NLY-siderbar-menu-nav-tree>

            <NLY-siderbar-menu-nav-tree>
              <NLY-siderbar-menu-nav-tree-item
                icon="fa fa-th-list"
                toggleId="accordion-2"
                activeProof="test"
              >
                我是测试
              </NLY-siderbar-menu-nav-tree-item>
              <NLY-siderbar-menu-nav-tree-nav>
                <NLY-siderbar-menu-nav-tree-nav-collapse
                  collapseId="accordion-2"
                  visibleProof="test"
                >
                  <NLY-siderbar-menu-nav-tree-nav-item
                    itemRouter="/test/1"
                    activeProof="/test/1"
                  >
                    我是1
                  </NLY-siderbar-menu-nav-tree-nav-item>

                  <NLY-siderbar-menu-nav-tree-nav-item
                    itemRouter="/test/2"
                    activeProof="/test/2"
                  >
                    我是2
                  </NLY-siderbar-menu-nav-tree-nav-item>
                </NLY-siderbar-menu-nav-tree-nav-collapse>
              </NLY-siderbar-menu-nav-tree-nav>
            </NLY-siderbar-menu-nav-tree>
          </NLY-siderbar-menu-nav>
        </NLY-siderbar-menu>
        <!-- /.sidebar-menu -->
      </NLY-siderbar>
    </NLY-sider>
    <NLY-content>
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

            <NLY-navbar-nav-item itemRouter="/">
              Dashboard
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
                      :mediaImg="brandImg"
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
                    icon="nlyfont nly-notification-fill"
                  />
                  4 new messages
                  <NLY-navbar-nav-dropdown-menu-item-tip
                    size="sm"
                    align="right"
                  >
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
              <!-- <template slot="badge">
                <NLY-badge size="sm" variant="info">
                  5
                </NLY-badge>
              </template> -->
              <template slot="content">
                <NLY-navbar-nav-dropdown-menu-item
                  itemRouter="/123"
                  align="center"
                >
                  修改资料
                </NLY-navbar-nav-dropdown-menu-item>
                <NLY-navbar-nav-dropdown-menu-item
                  itemRouter="/123"
                  align="center"
                >
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
      <NLY-main> </NLY-main>
      <NLY-footer>
        <!-- To the right -->
        <div class="float-right d-sm-inline d-none d-lg-block">
          吾曾有梦...
        </div>
        <!-- Default to the left -->
        <strong
          >Copyright © nejinn
          <a href="https://github.com/nejinn/bootstrap4-flex-sidebar">NLY</a
          >.</strong
        >
        All rights reserved.
      </NLY-footer>
    </NLY-content>

    <NLY-control-sider :collapseStatus="siderControlCollapseStatus">
      <!-- Control sidebar content goes here -->
      <div class="p-3">
        <h5>Title</h5>
        <p>Sidebar content</p>
      </div>
    </NLY-control-sider>
    <NLY-overlay :overlay="overlay" :changeFunction="changeOverlay" />
  </NLY-container>
</template>

<script>
import brandImg from "../../assets/logo.png";
export default {
  name: "container",
  data() {
    return {
      siderCollapseStatus: "max",
      siderControlCollapseStatus: false,
      overlay: false,
      brandImg
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
  }
};
</script>
