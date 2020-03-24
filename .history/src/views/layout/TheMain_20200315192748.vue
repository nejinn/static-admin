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
