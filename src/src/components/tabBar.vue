<template>
  <cover-view class="tab-bar">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view
      v-for="(item,index) in list"
      :key="index"
      class="tab-bar-item"
      :data-path="item.pagePath"
      :data-index="index"
      @click="switchTab"
    >
      <cover-image
        :src="selected == index ? item.selectedIconPath : item.iconPath"
        :class="{'icon': index===1}"
      ></cover-image>
      <cover-view style="color:  #7CCFFE" v-if="selected == index">{{item.text}}</cover-view>
      <cover-view style="color: #808080" v-else>{{item.text}}</cover-view>
    </cover-view>
  </cover-view>
</template>
 
<script>
export default {
  props: ['selected'],
  data () {
    return {
      selected: 0,
      list: [
      {
        pagePath: "pages/usedMarket/index/main",
        iconPath: "static/images/icon/ic_tabbar_home_nor.png",
        selectedIconPath:"static/images/icon/ic_tabbar_home_sel.png",
        text: "首页"
      },
      {
        pagePath:  "pages/usedMarket/boutique/main",
        iconPath: "static/images/icon/ic_tabbar_jingpin_nor.png",
        selectedIconPath: "static/images/icon/ic_tabbar_jingpin_sel.png",
        text: "精品"
      },
      {
        pagePath:"pages/usedMarket/sell_goods/main",
        iconPath: "static/images/icon/ic_tabbar_maihuo_nor.png",
        selectedIconPath:"static/images/icon/ic_tabbar_maihuo_sel.png",
        text: "卖货"
      },
      {
        pagePath:  "pages/usedMarket/news/main",
        iconPath: "static/images/icon/ic_tabbar_message_nor.png",
        selectedIconPath: "static/images/icon/ic_tabbar_message_sel.png",
        text: "消息"
      },
      {
        pagePath:"pages/usedMarket/person/main",
        iconPath:"static/images/icon/ic_tabbar_my_nor.png",
        selectedIconPath: "static/images/icon/ic_tabbar_my_sel.png",
        text: "我的"
      }
    ]
    }
  },
  methods: {
    switchTab (e) {
      const { currentTarget: { dataset: {
        path, index
      } } } = e
      console.log(path, index)
      wx.switchTab({ url: path })
      // this.$setData({
      //   selected: index
      // })
    }
  }
}
</script>
 
<style lang="stylus" rel="stylesheet/stylus" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}
 
.tab-bar-border {
  background-color: rgba(0, 0, 0, 0.33);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}
 
.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
 
.tab-bar-item cover-image {
  width: 27px;
  height: 27px;
}
 
.tab-bar-item cover-image.icon {
  width: 100rpx;
  height: 100rpx;
}
 
.tab-bar-item cover-view {
  font-size: 10px;
}
</style>
