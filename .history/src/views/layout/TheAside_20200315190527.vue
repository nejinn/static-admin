<template>
  <NLY-sider>
    <NLY-sider-brand brandRouter="/">
      <NLY-sider-brand-img :brandImg="brandImg" />
      <NLY-sider-brand-info>
        {{ brandName }}
      </NLY-sider-brand-info>
    </NLY-sider-brand>

    <NLY-siderbar>
      <!-- Sidebar user panel (optional) -->
      <NLY-siderbar-user>
        <NLY-siderbar-user-img :userImg="userImg" />
        <NLY-siderbar-user-info itemRouter="/user">
          {{ userName }}
        </NLY-siderbar-user-info>
      </NLY-siderbar-user>

      <!-- Sidebar Menu -->
      <!-- <NLY-siderbar-menu>
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
      </NLY-siderbar-menu> -->

      <NLY-RenderFunction
        flat
        :content-to-render="sidebarMenuData"
        v-if="sidebarMenuData"
      />
      <!-- /.sidebar-menu -->
    </NLY-siderbar>
  </NLY-sider>
</template>

<script>
export default {
  name: "TheAside",
  props: {
    brandImg: {
      type: String,
      required: true
    },
    brandName: {
      type: String,
      default: "Nejinn Lerity Admin"
    },
    userImg: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      default: "nejinn lerity"
    },
    asideNavbar: {
      type: Array,
      required: true
    }
  },
  computed: {
    sidebarMenuData: function() {
      const sider = this.asideNavbar;
      const siderData = sider.map(item => {
        // console.log(item);
        // console.log(item.hasOwnProperty("itemRouter"));
        // console.log(item.children);
        if (item.hasOwnProperty("itemRouter") && !item.children) {
          return {
            _type: "NLY-siderbar-menu-nav-item",
            _name: item.name,
            activeProof: item.activeProof,
            itemRouter: item.itemRouter,
            icon: item.icon
          };
        } else if (!item.hasOwnProperty("itemRouter") && item.children) {
          const tree = {
            _type: "NLY-siderbar-menu-nav-tree",
            _children: []
          };

          const treeItem = {
            _type: "NLY-siderbar-menu-nav-tree-item",
            icon: item.icon,
            toggleId: item.activeProof,
            activeProof: item.activeProof,
            _name: item.name
          };

          const treeNav = {
            _type: "NLY-siderbar-menu-nav-tree-nav",
            _children: []
          };
          const treeNavCollapse = {
            _type: "NLY-siderbar-menu-nav-tree-nav-collapse",
            collapseId: item.activeProof,
            visibleProof: item.activeProof,
            _children: []
          };

          const treeNavCollapseItem = item.children.map(k => {
            return {
              _type: "NLY-siderbar-menu-nav-tree-nav-item",
              itemRouter: k.itemRouter,
              activeProof: k.activeProof,
              icon: k.icon,
              _name: k.name
            };
          });

          treeNavCollapse._children = treeNavCollapseItem;
          treeNav._children.push(treeNavCollapse);
          tree._children.push(treeItem);
          tree._children.push(treeNav);

          const sidebarHasChildData = tree;
          return sidebarHasChildData;
        }
      });

      const sidebarNav = [
        {
          _type: "NLY-siderbar-menu",
          _children: [
            {
              _type: "NLY-siderbar-menu-nav",
              _children: siderData
            }
          ]
        }
      ];

      return sidebarNav;
    }
  }
};
</script>
