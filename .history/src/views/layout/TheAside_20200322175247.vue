<template>
  <nly-sidebar-container variant="darkPink">
    <nly-sidebar-brand to="/" variant="dark" class="text-center p-0">
      <nly-sidebar-brandimg
        :src="logo"
        elevation
        style="float: inherit;width: 250px; max-height:57px"
        class="m-0"
      />
      <!-- <nly-sidebar-brandtext>WY PyStatic System</nly-sidebar-brandtext> -->
    </nly-sidebar-brand>

    <nly-sidebar>
      <nly-sidebar-userpanel class="mt-3 pb-3 mb-3 d-flex">
        <nly-sidebar-userpanel-img :src="userimg" class="SSS" />
        <nly-sidebar-userpanel-info to="/">
          {{ username }}
        </nly-sidebar-userpanel-info>
      </nly-sidebar-userpanel>
      <nly-render-function flat :content-to-render="sidebarMenu" />
    </nly-sidebar>
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
    userimg: {
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
    sidebarMenu: function() {
      const sidebarArray = this.asideNavbar;
      const siderbarChildren = sidebarArray.data.map(item => {
        if (item.itemRouter && !item.children) {
          return {
            _type: "nly-sidebar-nav-item",
            _name: item.name,
            to: item.itemRouter,
            exact: true,
            icon: item.icon
          };
        } else if (!item.itemRouter && item.children) {
          const tree = {
            _type: "nly-sidebar-nav-tree",
            _children: [],
            target: item.activeProof,
            visible:
              this.$route.path.indexOf(item.activeProof) == 1 ? true : false,
            icon: item.icon,
            text: item.name,
            active:
              this.$route.path.indexOf(item.activeProof) == 1 ? true : false
          };

          const treeChildren = item.children.map(itemChild => {
            return {
              _type: "nly-sidebar-nav-item",
              _name: itemChild.name,
              to: itemChild.activeProof,
              exact: true,
              icon: itemChild.icon
            };
          });
          tree._children = treeChildren;

          return tree;
        } else {
          return {
            _type: "nly-sidebar-nav-header",
            _name: item.name
          };
        }
      });

      const sidebarVnode = [
        {
          _type: "nly-sidebar-nav",
          _children: siderbarChildren,
          legacy: true,
          childIndent: true,
          sidebarNavClass: "mt-2"
        }
      ];

      return sidebarVnode;
    }
  }
};
</script>
