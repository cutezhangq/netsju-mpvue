const app = getApp();
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath:"/src/pages/usedMarket/index/main",
        iconPath:"/static/images/icon/ic_tabbar_home_nor.png",
        selectedIconPath: "/static/images/icon/ic_tabbar_home_sel.png",
        text: "首页",
        isSpecial: false
      },
      {
        pagePath: "/src/pages/usedMarket/boutique/main",
        iconPath: "/static/images/icon/ic_tabbar_jingpin_nor.png",
        selectedIconPath:"/static/images/icon/ic_tabbar_jingpin_sel.png",
        text: "精品",
        isSpecial: false
      }, 
      {
        pagePath:"/src/pages/usedMarket/sell_goods/main",
        iconPath: "/static/images/icon/ic_tabbar_maihuo_nor.png",
        selectedIconPath:"/static/images/icon/ic_tabbar_maihuo_sel.png",
        text: "卖货",
        isSpecial: false
      }, 
      {
        pagePath:  "/src/pages/usedMarket/news/main",
        iconPath:"/static/images/icon/ic_tabbar_message_nor.png",
        selectedIconPath:"/static/images/icon/ic_tabbar_message_sel.png",
        text: "消息",
        isSpecial: false
      }, 
      {
        pagePath:"/src/pages/usedMarket/person/main",
        iconPath: "/static/images/icon/ic_tabbar_my_nor.png",
        selectedIconPath:"/static/images/icon/ic_tabbar_my_sel.png",
        text: "我的",
        isSpecial: false
      }],
    //适配IphoneX的屏幕底部横线
    isIphoneX: app.globalData.isIphoneX
  },
  attached() {},
  methods: {
    switchTab(e) {
      const dataset = e.currentTarget.dataset
      const path = dataset.path
      const index = dataset.index
      //如果是特殊跳转界面
      if (this.data.list[index].isSpecial) {
        wx.navigateTo({
          url: path
        })
      } else {
        //正常的tabbar切换界面
        wx.switchTab({
          url: path
        })
        this.setData({
          selected: index
        })
      }
    }
  }
})