<template>
  <div>
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
          <span class="span">个人中心 ></span>
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
    <div class="advertise">
      <img :src="img_advertise">
    </div>

    <div class="model">
      <!-- 卖在闲鱼 -->
      <personModel :perModel="sell_Model"></personModel>
      <!-- 买在闲鱼 -->
      <personModel :perModel="buy_Model"></personModel>
      <!-- 玩在闲鱼 -->
      <personModel :perModel="play_Model"></personModel>
    </div>

  </div>
</template>

<script>
  import {
    get,
    post
  } from "@/utils/request";
  import {
    SH_API,
    img_API,
    avater,
    advertise,
    small_icon
  } from "@/api/api";
  import personModel from "@/components/personModel";
  export default {
    components: {
      personModel
    },
    data() {
      return {
        userInfo: {},
        isLogin: false,
        //头像
        img_userAvatar: img_API + avater + "/default_user_avatar.png",
        //广告
        img_advertise: img_API + advertise + "/advertise.png",
        sell_Model: {
          title: "卖在闲鱼",
          content: [{
              sell_goods: img_API + small_icon + "/sell_1.PNG",
              todo: "我发布的",
              num: 2
            },
            {
              sell_goods: img_API + small_icon + "/sell_2.PNG",
              todo: "我卖出的",
              num: 0
            }
          ]
        },
        buy_Model: {
          title: "买在闲鱼",
          content: [{
              sell_goods: img_API + small_icon + "/play_1.PNG",
              todo: "我买到的",
              num: 0
            },
            {
              sell_goods: img_API + small_icon + "/buy_2.PNG",
              todo: "我收藏的",
              num: 1
            },
            {
              sell_goods: img_API + small_icon + "/buy_3.PNG",
              todo: "我租到的",
              num: 0
            }
          ]
        },
        play_Model: {
          title: "玩在闲鱼",
          content: [{
              sell_goods: img_API + small_icon + "/play_1.PNG",
              todo: "闲鱼币"
            },
            {
              sell_goods: img_API + small_icon + "/play_2.PNG",
              todo: "我的鱼塘"
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
    created() {

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
      })
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
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/common.styl";
  @import "./style.styl";

</style>
