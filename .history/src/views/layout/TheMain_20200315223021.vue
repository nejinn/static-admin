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
              :item="itemIconOnly"
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
  name: "TheMain"
};
</script>

<style scoped>
.nly-router-fade-enter-active {
  opacity: 1;
  transition: opacity 1s;
}

.nly-router-fade-leave-active {
  opacity: 0;
}
.nly-router-fade-enter {
  opacity: 0;
}
.nly-router-fade-leave {
  opacity: 1;
}
</style>
