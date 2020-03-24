<template>
  <nly-content-wrapper>
    <nly-content-header>
      <nly-container fluid>
        <nly-row row-class="mb-2">
          <nly-col sm="6">
            <h1 class="m-0 text-dark">{{ breadcrumbArray.currentName }}</h1>
          </nly-col>
          <nly-col sm="6">
            <nly-breadcrumb
              :item="breadcrumbArray.breadcrumbItems"
              breadcrumb-class="float-sm-right"
            />
          </nly-col>
        </nly-row>
      </nly-container>
    </nly-content-header>
    <nly-content>
      <router-view />
    </nly-content>
  </nly-content-wrapper>
</template>

<script>
export default {
  name: "TheMain",
  computed: {
    breadcrumbArray() {
      // const routerArray = this.$route.matched.map(item => {
      //   console.log(this.$route);
      //   console.log(item.path);
      //   if (item.path == this.$route.path) {
      //     return {
      //       text: item.meta.title,
      //       active: true,
      //       to: item.path
      //     };
      //   } else {
      //     if (item.path == "") {
      //       return {
      //         text: item.meta.title,
      //         to: "/"
      //       };
      //     } else {
      //       return {
      //         text: item.meta.title,
      //         to: item.path
      //       };
      //     }
      //   }
      // });

      const routerArray = this.$route.matched;
      routerArray.pop();
      console.log(111, routerArray);
      // const routerItem = routerArray.map(item => {
      //   if (item.path == "") {
      //     return {
      //       text: item.meta.title,
      //       to: "/"
      //     };
      //   } else {
      //     return {
      //       text: item.meta.title,
      //       to: item.path
      //     };
      //   }
      // });

      // routerItem.push({
      //   text: this.$route.matched.slice(-1)[0].meta.title,
      //   to: this.$route.matched.slice(-1)[0].path,
      //   active: true
      // });
      return {
        breadcrumbItems: routerItem,
        currentName: this.$route.matched.slice(-1)[0].meta.title
      };
    }
  }
};
</script>
