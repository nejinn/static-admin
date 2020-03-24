<template>
  <div>
    <div>
      我是仪表盘
    </div>
    <div class="nly-tooltip" style="left:300px">
      鼠标移动到我这
      <span class="nly-tooltip-text danger-bottom sm">提示文本</span>
    </div>
    <div class="test" v-nly-tooltip="{ text: 'qqqqq' }">
      SSS
    </div>
  </div>
</template>

<style lang="less">
@class: nly;

@info: info;
@info-color: #f8f9fa;
@info-background-color: #17a2b8;

@primary: primary;
@primary-color: #f8f9fa;
@primary-background-color: #007bff;

@secondary: secondary;
@secondary-color: #f8f9fa;
@secondary-background-color: #6c757d;

@success: success;
@success-color: #f8f9fa;
@success-background-color: #28a745;

@warning: warning;
@warning-color: #f8f9fa;
@warning-background-color: #ffc107;

@danger: danger;
@danger-color: #f8f9fa;
@danger-background-color: #dc3545;

@light: light;
@light-color: #343a40;
@light-background-color: #f8f9fa;

@dark: dark;
@dark-color: #f8f9fa;
@dark-background-color: #343a40;

@top: top;
@left: left;
@bottom: bottom;
@right: right;
@site1: 150%;
@site2: 100%;
@site3: 110%;
@site4: 50%;
@site5: 40%;
.arrowTopAfter(@type) {
  @color: "@{type}-background-color";
  border-color: @@color transparent transparent transparent;
  top: @site2;
  left: @site4;
}
.arrowBottomAfter(@type) {
  @color: "@{type}-background-color";
  border-color: transparent transparent @@color transparent;
  bottom: @site2;
  left: @site4;
}

.arrowLeftAfter(@type) {
  @color: "@{type}-background-color";
  border-color: transparent transparent transparent @@color;
  top: @site5;
  left: @site2;
  margin-left: 0px;
}
.arrowRightAfter(@type) {
  @color: "@{type}-background-color";
  border-color: transparent @@color transparent transparent;
  top: @site5;
  right: @site2;
  margin-right: 0;
}

.arrowTop(@type) {
  @color: "@{type}-color";
  @background-color: "@{type}-background-color";
  color: @@color;
  background-color: @@background-color;
  bottom: @site1;
  left: @site4;
  margin-left: -100px;
}
.arrowBottom(@type) {
  @color: "@{type}-color";
  @background-color: "@{type}-background-color";
  color: @@color;
  background-color: @@background-color;
  top: @site1;
  left: @site4;
  margin-left: -100px;
}

.arrowLeft(@type) {
  @color: "@{type}-color";
  @background-color: "@{type}-background-color";
  color: @@color;
  background-color: @@background-color;
  top: @site4;
  transform: translate(0, -50%);
  right: @site3;
}
.arrowRight(@type) {
  @color: "@{type}-color";
  @background-color: "@{type}-background-color";
  color: @@color;
  background-color: @@background-color;
  top: @site4;
  transform: translate(0, -50%);
  left: @site3;
}

.arrowAfter(@site,@type) when (@site = top) {
  .arrowTopAfter(@type);
}
.arrowAfter(@site,@type) when (@site = bottom) {
  .arrowBottomAfter(@type);
}

.arrowAfter(@site,@type) when (@site = left) {
  .arrowLeftAfter(@type);
}
.arrowAfter(@site,@type) when (@site = right) {
  .arrowRightAfter(@type);
}

.arrow(@site,@type) when (@site = top) {
  .arrowTop(@type);
}

.arrow(@site,@type) when (@site = bottom) {
  .arrowBottom(@type);
}

.arrow(@site,@type) when (@site = left) {
  .arrowLeft(@type);
}

.arrow(@site,@type) when (@site = right) {
  .arrowRight(@type);
}

.tooltipBg(@type,@site) {
  &.@{type}-@{site} {
    .arrow(@site, @type);
  }
  &.@{type}-@{site}::after {
    .arrowAfter(@site, @type);
  }
}
.nly-tooltip {
  position: relative;
  display: inline-block;

  .nly-tooltip-text {
    width: 200px;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 9;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.8s ease-in, visibility 0.8s ease-in;

    .tooltipBg(@info, @top);
    .tooltipBg(@primary, @top);
    .tooltipBg(@secondary, @top);
    .tooltipBg(@success, @top);
    .tooltipBg(@warning, @top);
    .tooltipBg(@danger, @top);
    .tooltipBg(@light, @top);
    .tooltipBg(@dark, @top);
    .tooltipBg(@info, @bottom);
    .tooltipBg(@primary, @bottom);
    .tooltipBg(@secondary, @bottom);
    .tooltipBg(@success, @bottom);
    .tooltipBg(@warning, @bottom);
    .tooltipBg(@danger, @bottom);
    .tooltipBg(@light, @bottom);
    .tooltipBg(@dark, @bottom);

    .tooltipBg(@info, @left);
    .tooltipBg(@primary, @left);
    .tooltipBg(@secondary, @left);
    .tooltipBg(@success, @left);
    .tooltipBg(@warning, @left);
    .tooltipBg(@danger, @left);
    .tooltipBg(@light, @left);
    .tooltipBg(@dark, @left);

    .tooltipBg(@info, @right);
    .tooltipBg(@primary, @right);
    .tooltipBg(@secondary, @right);
    .tooltipBg(@success, @right);
    .tooltipBg(@warning, @right);
    .tooltipBg(@danger, @right);
    .tooltipBg(@light, @right);
    .tooltipBg(@dark, @right);

    // &.info-top {
    //   color: #f8f9fa;
    //   background-color: #17a2b8;
    //   bottom: 150%;
    // }

    // &.info-top::after {
    //   border-color: #17a2b8 transparent transparent transparent;
    //   top: 100%;
    // }

    // &.dark-left {
    //   visibility: hidden;
    //   width: 120px;
    //   background-color: black;
    //   color: #fff;
    //   text-align: center;
    //   border-radius: 6px;
    //   padding: 5px 0;
    //   position: absolute;
    //   z-index: 1;
    //   top: 50%;
    //   transform: translate(0, -50%);
    //   right: 110%;
    // }

    // &.dark-left::after {
    //   content: "";
    //   position: absolute;
    //   top: 50%;
    //   left: 100%;
    //   margin-top: -5px;
    //   border-width: 5px;
    //   border-style: solid;
    //   border-color: transparent transparent transparent black;
    // }
    &.sm {
      font-size: 0.875rem;
    }
  }

  .nly-tooltip-text::after {
    content: "";
    position: absolute;
    // top: 100%;
    // left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    z-index: 9;
    // border-color: transparent transparent black transparent;
  }
}

.nly-tooltip:hover {
  .nly-tooltip-text {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.8s ease-in 0.8s, visibility 0.8s ease-in 0.8s;
  }
}
</style>
