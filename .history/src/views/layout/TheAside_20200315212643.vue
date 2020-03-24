<template>
  <nly-sidebar-container variant="darkPink">
    <nly-sidebar-brand to="collapse" variant="dark">
      <nly-sidebar-brandimg :src="logo" elevation circle />
      <nly-sidebar-brandtext>WY PyStatic System</nly-sidebar-brandtext>
    </nly-sidebar-brand>

    <nly-sidebar>
      <nly-sidebar-userpanel class="mt-3 pb-3 mb-3 d-flex">
        <nly-sidebar-userpanel-img :src="logo" class="SSS" />
        <nly-sidebar-userpanel-info to="collapse">
          {{ username }}
        </nly-sidebar-userpanel-info>
      </nly-sidebar-userpanel>
      <nly-sidebar-nav compact legacy child-indent sidebar-nav-class="mt-2">
        <!-- <nly-sidebar-nav-item
          to="/"
          link-class="xxx zzz"
          class="sss"
          icon="nav-icon fas nlyfont nly-icon-color-palette"
          exact
        >
          home
          <nly-badge bg-variant="teal" badge-class="right">
            NEW
          </nly-badge>
        </nly-sidebar-nav-item>

        <nly-sidebar-nav-tree
          target="components-one"
          visible
          icon="nav-icon fas nlyfont nly-icon-logo-polymer"
        >
          <template slot="link">
            components-one
          </template>
          <nly-sidebar-nav-item
            to="/collapse"
            link-class="xxx zzz"
            class="sss"
            icon="nav-icon far nlyfont nly-icon-logo-chrome"
            exact
          >
            collapse
          </nly-sidebar-nav-item>
        </nly-sidebar-nav-tree> -->
        <nly-render-function flat :content-to-render="sidebarMenuData" />
      </nly-sidebar-nav>
    </nly-sidebar>
    {{ sidebarMenuData }}
  </nly-sidebar-container>
</template>

<script>
import asideNavbar from "./siderbar";
export default {
  name: "TheAside",
  data() {
    return {
      asideNavbar
    };
  },
  props: {
    logo: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
    // asideNavbar: {
    //   type: Array
    //   // required: true
    // }
  },
  computed: {
    sidebarMenuData: function() {
      const sider = this.asideNavbar;
      const siderData = sider.data.map(item => {
        if (item.itemRouter && !item.children) {
          return {
            _type: "nly-sidebar-nav-item",
            _name: item.name,
            to: item.itemRouter,
            exact: true,
            icon: "nav-icon fas nlyfont nly-icon-color-palette"
          };
        } else if (!item.itemRouter && item.children) {
          console.log(111, this.$route.path);
          const tree = {
            _type: "nly-sidebar-nav-tree",
            _children: [],
            target: item.activeProof,
            visible:
              this.$route.path.indexOf(item.activeProof) == 1 ? true : false,
            icon: "nav-icon fas nlyfont nly-icon-color-palette",
            scopedSlots: {
              link: item.name
            }
          };

          const treeChildren = item.children.map(itemChild => {
            return {
              _type: "nly-sidebar-nav-item",
              _name: itemChild.name,
              to: itemChild.activeProof,
              exact: true,
              icon: "nav-icon fas nlyfont nly-icon-color-palette"
            };
          });
          tree._children = treeChildren;

          return tree;
        }
      });

      return siderData[1];
    }
  }
};
</script>
