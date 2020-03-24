<template>
  <NLY-main>
    <NLY-breadcrumb />
    <div class="nly-main-content">
      <transition name="nly-router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </NLY-main>
</template>

<script>
export default {
  name: "TheMain"
};
</script>

<style lang="less" scoped>
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
