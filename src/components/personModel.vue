<template>
  <!--二手市场--- "我的"模块组件 -->
  <div class="part">
    <h2>{{perModel}}</h2>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      perModel: Object
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .part {
    width: 90%;
    margin: 20rpx auto;
    border-radius: 20px;
    background-color: white;
    padding: 20rpx 0 30rpx 30rpx;
  }
  h2 {
    font-size: 34rpx;
    font-weight: bold;
  }
</style>
