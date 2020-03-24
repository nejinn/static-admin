<template>
  <nly-content-wrapper>
    <nly-content-header>
      <nly-container fluid>
        <nly-row class="mb-2">
          <nly-col sm="6">
            <h1>nly-badge</h1>
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
