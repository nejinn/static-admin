<template>
  <nly-control-sidebar-container :size="controlSidebarSizeSm">
    <!-- Control sidebar content goes here -->
    <nly-control-sidebar class="p-3">
      <h5>主题设置</h5>
      <hr class="mb-2 bg-light" />
      <div class="mb-1">
        <nly-switch
          off-variant="info"
          on-variant="danger"
          v-model="controlSidebar.size"
        >
          <span>右侧菜单栏小字体</span>
        </nly-switch>
      </div>
      <div class="mb-1">
        <nly-switch
          off-variant="info"
          on-variant="danger"
          v-model="navbar.border"
        >
          <span>顶部导航栏开启底部边框</span>
        </nly-switch>
      </div>
      <div class="mb-1">
        <div class="mb-1">
          <nly-switch
            off-variant="info"
            on-variant="warning"
            v-model="body.sizeSm"
          >
            <span>页面小号字体</span>
          </nly-switch>
        </div>
      </div>
      <div class="mb-1">
        <nly-switch
          off-variant="info"
          on-variant="pink"
          v-model="navbar.sizeSm"
        >
          <span>navbar小号字体</span>
        </nly-switch>
      </div>
      <div class="mb-1">
        <nly-switch
          off-variant="primary"
          on-variant="teal"
          v-model="sidebar.sidebarShape.flat"
        >
          <span>左侧菜单flat形状</span>
        </nly-switch>
      </div>
      <div class="mb-1">
        <nly-switch
          off-variant="lightblue"
          on-variant="success"
          v-model="sidebar.sidebarShape.pill"
        >
          <span>左侧菜单pill形状</span>
        </nly-switch>
      </div>

      <div class="mb-1">
        <nly-switch
          off-variant="olive"
          on-variant="lime"
          v-model="sidebar.sidebarShape.compact"
        >
          <span>左侧菜单compact形状</span>
        </nly-switch>
      </div>
      <div class="mb-1">
        <nly-switch
          off-variant="fuchsia"
          on-variant="maroon"
          v-model="sidebar.sidebarShape.legacy"
        >
          <span>左侧菜单legacy形状</span>
        </nly-switch>
      </div>

      <div class="mb-1">
        <nly-switch
          off-variant="indigo"
          on-variant="orange"
          v-model="sidebar.sidebarShape.childIndent"
        >
          <span>左侧菜单栏子级缩进</span>
        </nly-switch>
      </div>

      <div class="mb-1">
        <nly-switch
          off-variant="lime"
          on-variant="purple"
          v-model="sidebar.hover"
        >
          <span>启用左侧导航栏鼠标悬浮展开</span>
        </nly-switch>
      </div>

      <div class="mb-1">
        <nly-switch
          off-variant="indigo"
          on-variant="orange"
          v-model="footer.size"
        >
          <span>底部小字体</span>
        </nly-switch>
      </div>

      <hr class="mb-2 bg-light" />

      <h6>顶部导航栏背景颜色</h6>

      <hr class="mb-2 bg-light" />
      <div class="mb-1">
        <nly-switch off-variant="light" on-variant="dark" v-model="navbar.dark">
          <span>navbar dark</span>
        </nly-switch>
      </div>
      <div class="d-flex">
        <div class="d-flex flex-wrap mb-3">
          <nly-controlSidebar-button
            v-for="(item, index) in navbar.variantOption"
            :key="index"
            :bg-variant="item"
            @click.native="changeNavbarVariant(item)"
          />
        </div>
      </div>

      <hr class="mb-2 bg-light" />

      <h6>左侧导航栏dark背景色</h6>

      <hr class="mb-2 bg-light" />
      <div class="d-flex">
        <div class="d-flex flex-wrap mb-3">
          <nly-controlSidebar-button
            v-for="(item, index) in sidebar.darkVariantOption"
            :key="index"
            :bg-variant="item.b"
            @click.native="changeSidebarVariant(item.a)"
          />
        </div>
      </div>

      <h6>左侧导航栏light背景色</h6>

      <hr class="mb-2 bg-light" />
      <div class="d-flex">
        <div class="d-flex flex-wrap mb-3">
          <nly-controlSidebar-button
            v-for="(item, index) in sidebar.lightVariantOption"
            :key="index"
            :bg-variant="item.b"
            @click.native="changeSidebarVariant(item.a)"
          />
        </div>
      </div>

      <h6>brand背景色</h6>

      <hr class="mb-2 bg-light" />
      <div class="d-flex">
        <div class="d-flex flex-wrap mb-3">
          <nly-controlSidebar-button
            v-for="(item, index) in sidebar.brand.variantOption"
            :key="index"
            :bg-variant="item"
            @click.native="changeSidebarBrandVariant(item)"
          />
        </div>
      </div>
    </nly-control-sidebar>
  </nly-control-sidebar-container>
</template>

<script>
export default {
  name: "TheControlAside",
  props: {
    collapseStatus: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>
