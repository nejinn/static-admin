<template>
  <nly-control-sidebar-container :size="controlSidebarSizeSm">
    <!-- Control sidebar content goes here -->
    <nly-control-sidebar class="p-3"> </nly-control-sidebar>
  </nly-control-sidebar-container>
</template>

<script>
export default {
  name: "TheControlAside",
  props: {
    collapseStatus: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>
