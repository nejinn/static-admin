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
      const routerItems = routerArray.pop();
      return {
        breadcrumbItems: routerArray,
        currentName: this.$route.matched.slice(-1)[0].meta.title
      };
    }
  }
};
</script>
