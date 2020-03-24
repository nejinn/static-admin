<template>
  <NLY-control-sider :collapseStatus="collapseStatus">
    <div class="p-3">
      <h5>Title</h5>
      <p>Sidebar content</p>
    </div>
  </NLY-control-sider>
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
