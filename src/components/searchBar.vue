<!-- 搜索框组件 -->
<template>
    <div class="search">
        <div class="search_goods">
          <input type="text" placeholder="搜索商品">
          <span class="icon"></span>
        </div>
    </div>

  </template>
  
  <script>
  export default {
    props: {},
    data () {
      return {
      }
    },
    methods: {
  }
}
  
  </script>
  
  <style lang="stylus" rel="stylesheet/stylus" scoped>
    .search {
        width: 100%;
        box-sizing: border-box;
        padding: 0 25rpx 0 10rpx;
        top: 0;
        z-index: 99;
        height: 80rpx;
        display: flex;
        align-items: center;
        background: #fff;
    }
    .search_goods{
      flex: 1;
      font-size: 32rpx;
      position: relative;
    }
      input {
        width: 100%;
        height: 56rpx;
        border-radius: 8rpx;
        background: #ededed;
        box-sizing: border-box;
        padding-left: 40rpx;
      }

      .icon {
        position: absolute;
        top: 15rpx;
        left: 10rpx;
        background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png') center no-repeat;
        background-size: 100%;
        width: 28rpx;
        height: 28rpx;
        margin-right: 10rpx;
      }
  </style>