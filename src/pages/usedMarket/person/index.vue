<template>
  <div class="back">

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

  <personModel></personModel>

  </div>
</template>

<script>
import { img_API,avater,advertise} from "../../../api/api";
import personModel from "@/components/personModel";
export default {
  components: {
    personModel,
  },
  data () {
    return {
      getInfo:false,
      notGetInfo:true,
      img_userAvatar:img_API+avater+"/default_user_avatar.png",
      img_advertise:img_API+advertise+"/advertise.png",
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
