<template>
  <section class="tabBar-wrap">
    <article class="tabBar-box">
      <ul class="tabBar-nav" v-if="navList.length > 0">
        <li class="item" v-for="(item, index) in navList" @click="selectNavItem(index,item.pagePath)" :key="index">
          <p class="item-images">
            <img :src="selectNavIndex === index ? item.selectedIconPath : item.iconPath" alt="iconPath">
          </p>
          <p :class="selectNavIndex === index ? 'item-text item-text-active' : 'item-text' ">
            {{item.text}}
          </p>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
  export default {
    props: ['selectNavIndex'],
    data() {
      return {
        navList: [
          {
            pagePath: "/pages/usedMarket/index/main",
            iconPath: "/static/images/icon/ic_tabbar_home_nor.png",
            selectedIconPath: "/static/images/icon/ic_tabbar_home_sel.png",
            text: "首页"
          },
          {
            pagePath: "/pages/usedMarket/boutique/main",
            iconPath: "/static/images/icon/ic_tabbar_jingpin_nor.png",
            selectedIconPath: "/static/images/icon/ic_tabbar_jingpin_sel.png",
            text: "精品"
          },
          {
            pagePath: "/pages/usedMarket/sell_goods/main",
            iconPath: "/static/images/icon/ic_tabbar_maihuo_nor.png",
            selectedIconPath: "/static/images/icon/ic_tabbar_maihuo_sel.png",
            text: "卖货"
          },
          {
            pagePath: "/pages/usedMarket/news/main",
            iconPath: "/static/images/icon/ic_tabbar_message_nor.png",
            selectedIconPath: "/static/images/icon/ic_tabbar_message_sel.png",
            text: "消息"
          },
          {
            pagePath: "/pages/usedMarket/person/main",
            iconPath: "/static/images/icon/ic_tabbar_my_nor.png",
            selectedIconPath: "/static/images/icon/ic_tabbar_my_sel.png",
            text: "我的"
          }
        ],
      }
    },
    created() { },
    methods: {
      /**
       * 点击导航栏
       * @param index
       */
      selectNavItem(index, pagePath) {
        // console.log(this.selectNavIndex)
        if (index === this.selectNavIndex) {
          return false;
        }
        if (index == 0 && this.selectNavIndex == -1) {
          this.$emit("fetch-index");
        }
        this.bindViewTap(pagePath);
      },

      /**
       * 路由跳转
       */
      bindNavigateTo(url) {
        wx.switchTab({
          url
        })
      },

      /**
       * tabBar路由跳转
       */
      bindViewTap(url) {
        // 回到顶部
        // if (url === '../index/main') {
        //   store.commit('setGroupsID', '');
        // }
        wx.switchTab({
          url,
        })
      },
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/common.styl";

  .tabBar-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 38px;
    padding: 6px 0;
    border-top: 1px solid #eee;
    background-color: #f8f8f8;
  }

  .tabBar-nav {
    width: 100%;
    display: flex;

    .item {
      flex: 1;
      text-align: center;
    }

    .item-text {
      color: #666;
      font-size: 13px;
      transition: .24s linear;
    }

    .item-text-active {
      color: $mainColor;
    }

    .item-images {
      width: 25px;
      height: 25px;
      margin: 0 auto;
      text-align: center;
      transition: .24s linear;

      & img {
        display: inline;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>