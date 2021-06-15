<style lang="less">
@import '../../assets/mixin.less';
.v_line_index {
  background: @bg;
}
</style>

<template>
  <div class="v_line_index" :style="{height: h + 'px'}"></div>
</template>

<script>
export default {
  name: 'vLine',
  props: {
    h: {
      type: Number || String,
      default: 10
    }
  }
};
</script>
