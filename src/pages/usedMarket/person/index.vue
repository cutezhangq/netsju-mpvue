<template>
  <div>
    <!-- 头像昵称 -->
    <div class="top">
      <div class="userinfo">
        <div class="user_avatar"> 
          <open-data type="userAvatarUrl" v-if="getInfo"></open-data> 
        </div>
        <div class="user_name">
          <span>昵称：</span><span v-if="notGetInfo">未设置</span>
          <open-data type="userNickName" v-if="getInfo"></open-data> 
          <span class="span">个人中心 ></span>   
        </div>
        <button class="btn" wx:if="canIUse" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-if="notGetInfo">登录</button>
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
import { img_API,avater,advertise,small_icon} from "@/api/api";
import personModel from "@/components/personModel";
export default {
  components: {
    personModel,
  },
  data () {
    return {
      getInfo:false,
      notGetInfo:true,
      //头像
      img_userAvatar:img_API+avater+"/default_user_avatar.png",
      //广告
      img_advertise:img_API+advertise+"/advertise.png",
      sell_Model: {
        title:"卖在闲鱼",
        content:[
          {
            sell_goods:img_API+small_icon+"/sell_1.PNG",
            todo:"我发布的",
            num:2
          },
          {
            sell_goods:img_API+small_icon+"/sell_2.PNG",
            todo:"我卖出的",
            num:0
          }
        ]
      },
      buy_Model:{
        title:"买在闲鱼",
        content:[
          {
            sell_goods:img_API+small_icon+"/play_1.PNG",
            todo:"我买到的",
            num:0
          },
          {
            sell_goods:img_API+small_icon+"/buy_2.PNG",
            todo:"我收藏的",
            num:1
          },
          {
            sell_goods:img_API+small_icon+"/buy_3.PNG",
            todo:"我租到的",
            num:0
          }
        ]
      },
      play_Model:{
        title:"玩在闲鱼",
        content:[
          {
            sell_goods:img_API+small_icon+"/play_1.PNG",
            todo:"闲鱼币"
          },
          {
            sell_goods:img_API+small_icon+"/play_2.PNG",
            todo:"我的鱼塘"
          },
          {
            sell_goods:img_API+small_icon+"/play_3.PNG",
            todo:"我的帖子"
          },
          {
            sell_goods:img_API+small_icon+"/play_4.PNG",
            todo:"边逛边赚钱"
          },
          {
            sell_goods:img_API+small_icon+"/play_5.PNG",
            todo:"天天赚钱"
          },
          {
            sell_goods:img_API+small_icon+"/play_6.PNG",
            todo:"百币夺宝"
          },
          {
            sell_goods:img_API+small_icon+"/play_7.PNG",
            todo:"参与的免费送"
          }
        ]
      }
    }
  },
  mounted(){
    //判断用户是否授权登录过
  //   try {
  //   var value = wx.getStorageSync('userinfo')
  //   if (value) {
  //     getInfo=true
  //     notGetInfo=false
  //   }else{
  //     getInfo=false
  //     notGetInfo=true
  //   }
  //   } catch (e){
  // }
  },
  methods:{
    //获取用户登录信息
    bindGetUserInfo(){
      wx.getUserInfo({
      success: userInfo => {
        console.log('登录成功',userInfo)
        this.loginSuccess(userInfo)
        this.getInfo=true
        this.notGetInfo=false       
      },
      fail:err =>{
        console.log('登录失败',err)
      }
      });
    },
    //登录成功后获取缓存信息
    loginSuccess(userInfo){
      wx.setStorageSync('userinfo',userInfo)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";
</style>
