<template>
  <div>
    <div class="content">
      <div class="top">
        <div class="userinfo">
          <!-- 头像 -->
          <div class="user_avatar">
            <img :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/images/news_person/avater/personal.png'" alt="">
          </div>
          <!-- 登陆按钮 -->
          <button v-if="!isLogin" class="btn" open-type="getUserInfo" @getuserinfo="handleGetUserInfo">登录</button>
          <!-- <button class="btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权手机号</button> -->
          <!-- 注销按钮-->
          <button class="btn" @click="loginOut" v-else>注销</button>
          <!-- 用户信息 -->
          <div class="user_name">
            <span>昵称：{{userInfo.nickName?userInfo.nickName:'未设置'}}</span>
            <span class="span" @click="toUserSet()">个人中心 ></span>
          </div>
        </div>
      </div>

      <!-- 赞/粉丝/关注模块 -->
      <div class="fans">
        <p>0超赞</p>
        <p>0关注</p>
        <p class="none">0粉丝</p>
      </div>

      <!-- 广告 -->
      <div :class="[del?'none':'advertise']" v-for="(item,index) in ad" :key="index">
        <img :src="item.imageUrl">
        <span @click="delAd()"> X </span>
      </div>

      <div class="model">
        <!-- 卖在闲鱼 -->
        <personModel :perModel="sell_Model.title">
          <div class="sell">
            <div class="sellThings" @click="sell_box(index)" v-for="(item,index) in sell_contentModel" :key="index">
              <img :src="item.sell_goods">
              <p>{{item.todo}}</p>
            </div>
          </div>
        </personModel>
        <!-- 买在闲鱼 -->
        <personModel :perModel="buy_Model.title">
           <div class="sell">
            <div class="sellThings" @click="buy_box(index)" v-for="(item,index) in buy_contentModel" :key="index">
              <img :src="item.sell_goods">
              <p>{{item.todo}}</p>
            </div>
          </div>
        </personModel>
        <!-- 玩在闲鱼 -->
        <personModel :perModel="play_Model.title">
          <div class="sell">
            <div class="sellThings" @click="play_box(index)" v-for="(item,index) in play_contentModel" :key="index">
              <img :src="item.sell_goods">
              <p>{{item.todo}}</p>
            </div>
          </div>
        </personModel>
      </div>
    </div>
    <!-- tabbar -->
    <vueTabBar   
      @fetch-index="clickIndexNav"
      :selectNavIndex=selectNavIndex
      >
    </vueTabBar>
  </div>
</template>

<script>
  import {get,post} from "@/utils/request";
  import {SH_API,img_API,avater,advertise,small_icon} from "@/api/api";
  import personModel from "@/components/personModel";
   import vueTabBar from "@/components/usedMTabBar";

  export default {
    onShow(){
      wx.hideTabBar();
    },
    components: {
      personModel,
      vueTabBar
    },
    data() {
      return {
        selectNavIndex:4,
        sell_contentModel:[],
        buy_contentModel:[],
        play_contentModel:[],
        page:2,
        userInfo: {},
        ad:[],
        del:false,
        isLogin: false,
        //头像
        img_userAvatar: img_API + avater + "/default_user_avatar.png",
        //广告
        img_advertise: img_API + advertise + "/advertise.png",
        sell_Model: {
          title: "卖在校圈",
          content: [{
              sell_goods: img_API + small_icon + "/sell_1.PNG",
              todo: "我发布的"
            },
            {
              sell_goods: img_API + small_icon + "/sell_2.PNG",
              todo: "我卖出的"
            },
            {
              sell_goods: img_API + small_icon + "/play_2.PNG",
              todo: "我卖店铺"
            }
          ]
        },
        buy_Model: {
          title: "买在校圈",
          content: [{
              sell_goods: img_API + small_icon + "/play_1.PNG",
              todo: "我买到的"
            },
            {
              sell_goods: img_API + small_icon + "/buy_3.PNG",
              todo: "我收藏的"
            },
            {
              sell_goods: img_API + small_icon + "/buy_2.PNG",
              todo: "购物车"
            },
            {
              sell_goods: img_API + small_icon + "/buy_1.PNG",
              todo: "订单"
            }
          ]
        },
        play_Model: {
          title: "玩在校圈",
          content: [{
              sell_goods: img_API + small_icon + "/play_1.PNG",
              todo: "校圈币"
            },
            {
              sell_goods: img_API + small_icon + "/play_2.PNG",
              todo: "我的校圈"
            },
            {
              sell_goods: img_API + small_icon + "/play_3.PNG",
              todo: "我的帖子"
            },
            {
              sell_goods: img_API + small_icon + "/play_4.PNG",
              todo: "边逛边赚钱"
            },
            {
              sell_goods: img_API + small_icon + "/play_5.PNG",
              todo: "天天赚钱"
            },
            {
              sell_goods: img_API + small_icon + "/play_6.PNG",
              todo: "百币夺宝"
            },
            {
              sell_goods: img_API + small_icon + "/play_7.PNG",
              todo: "参与的免费送"
            }
          ]
        }
      }
    },
    beforeMount () {
      this.getAdvertise();
    },
    mounted() {
      //一进页面先获取状态（授权了直接拿到，未授权则获取失败）--进入页面执行一次
      wx.getUserInfo({
        success: (res) => {
          // 更新userInfo的状态数据
          this.userInfo = res.userInfo
        },
        fail: () => {
          console.log('userInfo 获取失败');
        }
      }),
      this.sell_contentModel = this.sell_Model.content,
      this.buy_contentModel = this.buy_Model.content,
      this.play_contentModel = this.play_Model.content
    },
    methods: {
      //用户登录处理
      handleGetUserInfo(res) {
        //用户授权 头像昵称
        if (res.mp.detail.userInfo) {
          this.userInfo = res.mp.detail.userInfo;
          this.loginIn(this.userInfo);
          wx.setStorage({key: "userInfo",data: this.userInfo });
        } else {
          console.log('用户没授权！');
        }
      },
      //登陆---用户认证
      loginIn(userInfo) {
        wx.login({
          success: (res) => {
            let code = res.code
            //存储code
            wx.setStorage({key: "code",data: res.code })
            let token = post(SH_API + "/login/wechat", {
              avatarUrl: userInfo.avatarUrl,
              code: code,
              gender: userInfo.gender,
              nickname: userInfo.nickName,
              phone: ""
            }).then(resData => {
              // 存储token,加入Storage缓存
              wx.setStorage({key: "token",data: resData.data});
              this.isLogin = true;
              this.Toast_login();
            });
          }
        })
      },
      //注销登陆
      loginOut() {
        get(SH_API + "/logout").then(res => {
          this.isLogin = false;
          wx.setStorage({key: "token",data:""});
          this.Toast_login();
        })
      },
      Toast_login() {
        if (this.isLogin) {
          wx.showToast({
            title: "登陆成功",
            icon: "success",
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {
              // wx.navigateBack({
              //   delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
              // });
            }
          });
        } else {
          wx.showToast({
            title: "注销登陆",
            icon: "success",
            duration: 2000,
            mask: true,
            success: res => {}
          });
        }
      },

      //广告
      async getAdvertise(){
        const data = await get(SH_API+`/ad/${this.page}`)
        this.ad = data.data;
      },
      //删除广告
      delAd(){
        this.del = true;
      },

      buy_box(index){
        switch(index){
          case 0:
            break
          case 1:
            break
          case 2:
            //购物车box
            wx.navigateTo({
              url:"/pages/usedMarket/cart/main"
            });
            break
          case 3:
            //订单列表页
            wx.navigateTo({
              url:"/pages/usedMarket/order/orderList/main"
            });
            break
        }
      },

      toUserSet(){
         wx.navigateTo({
          url: "/pages/usedMarket/userSet/main"
        });
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~@/assets/common.styl";
@import "./style.styl";
</style>
