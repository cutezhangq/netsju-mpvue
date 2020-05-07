<template>
  <div class="tabBar">
      <!-- <div>
        <div selected @click="toIndex()">
          <img class="icon" src="/static/images/ic_menu_choice_nor.png">
          <img class="icon-active" src="/static/images/ic_menu_choice_pressed.png">
          <span class="label">首页</span>
        </div>
        <div>
          <img class="icon" src="/static/images/ic_menu_topic_nor.png">
          <img class="icon-active" src="/static/images/ic_menu_topic_pressed.png">
          <span class="label">消息</span>
        </div>
        <div>
          <img class="icon" src="/static/images/ic_menu_shoping_nor.png">
          <img class="icon-active" src="/static/images/ic_menu_shoping_pressed.png">
          <span class="label">商品</span>
        </div>
        <div link="/mine">
          <img class="icon" src="/static/images/ic_menu_me_nor.png">
          <img class="icon-active" src="/static/images/ic_menu_me_pressed.png">
          <span class="label">我的</span>
        </div>
      </div> -->
  </div>
   <!-- <section class="tabBar-wrap">
    <article class="tabBar-box">
      <ul class="tabBar-nav" v-if="navList.length > 0">
        <li class="item" v-for="(item, index) in navList"
            @click="selectNavItem(index,item.pagePath)"
            :key="index">
          <p class="item-images">
            <img :src="selectNavIndex === index ? item.selectedIconPath : item.iconPath" alt="iconPath">
          </p>
          <p :class="selectNavIndex === index ? 'item-text item-text-active' : 'item-text' ">
            {{item.text}}
          </p>
        </li>
      </ul>
    </article>
  </section> -->

</template>

<script>
// export default {
  // data(){
  //   return{
  //     curClick:0,   //当前的点击的tab下标
  //   }
  // },
  // methods:{
  //   toIndex(){
  //     wx.navigateTo({
  //       url: '/pages/usedMarket/index/main'
  //     })
  //   },
  // }
// }

  //import store from '../vuex/index'
  export default {
    props: ['selectNavIndex', 'needButton', 'handButton', 'btnText'],
    data() {
      return {
        navList: [
          {
            pagePath: "/pages/usedMarket/index/main",
            iconPath: "/static/images/ic_menu_choice_nor.png",
            selectedIconPath: "/static/images/ic_menu_choice_pressed.png",
            text: "首页"
          },
          {
            pagePath: "/pages/usedMarket/news/main",
            iconPath: "/static/images/ic_menu_topic_nor.png",
            selectedIconPath: "/static/images/ic_menu_topic_pressed.png",
            text: "消息"
          },
          {
            pagePath: "/pages/usedMarket/goods/main",
            iconPath: "/static/images/ic_menu_shoping_nor.png",
            selectedIconPath: "/static/images/ic_menu_shoping_pressed.png",
            text: "商品"
          },
          {
            pagePath: "/pages/usedMarket/person/main",
            iconPath: "/static/images/ic_menu_me_nor.png",
            selectedIconPath: "/static/images/ic_menu_me_pressed.png",
            text: "我的"
          }
        ],
      }
    },
    created() {
      wx.hideTabBar()
    },
    methods: {
      /**
       * 点击导航栏
       * @param index
       */
      selectNavItem(index, pagePath) {
        console.log(this.selectNavIndex)

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
        wx.navigateTo({
          url
        })
      },

      /**
       * tabBar路由跳转
       */
      bindViewTap(url) {
        // 回到顶部
        if (url === '/pages/usedMarket/index/main') {
          //store.commit('setGroupsID', '');
        }
        wx.switchTab({
          url,
        })
      },
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

// .tabBar img{
//   width 1.5rem;
//   height:1.5rem;
// }
 .tabBar-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    padding: 20px 0;
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
      font-size: 28px;
      transition: .24s linear;
    }
    .item-text-active {
      color: #27a79a;
    }

    .item-images {
      width: 48px;
      height: 48px;
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

  .submit-box-btn {
    position: relative;
    z-index: 999;
    width: 85%;
    height: 90px;
    line-height: 90px;
    border-radius: 10px;
    color: #404040;
    font-size: 36px;
    border: none;
    background-color: #eee;
    text-align: center;
    border: 1px solid #eee;
  }

  .submit-box-btn-active {
    color: #fff;
    border: none;
    border: 1px solid #ff6c00;
    background-color: #ff6c00;
  }
</style>