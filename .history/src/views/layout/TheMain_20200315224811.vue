<template>
  <nly-content-wrapper>
    <nly-content-header>
      <nly-container fluid>
        <nly-row row-class="mb-2">
          <nly-col sm="6">
            <h1 class="m-0 text-dark">Home</h1>
          </nly-col>
          <nly-col sm="6">
            <nly-breadcrumb
              :item="breadcrumbItems"
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
    breadcrumbItems() {
      const routerArray = this.$route.matched.map(item => {
        console.log(item.path);
        console.log(this.$route);
        if (item.path == this.$route) {
          console.log(1);
          return {
            text: item.meta.title,
            active: true,
            to: item.path
          };
        } else {
          return {
            text: item.meta.title,
            to: item.path
          };
        }
      });

      console.log(routerArray);
      return routerArray;
    }
  }
};
</script>
