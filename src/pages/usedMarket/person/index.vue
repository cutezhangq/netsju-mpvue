<template>
  <div>
    <div class="top">
      <div class="userinfo">
        <!-- 头像 -->
        <div class="user_avatar"> 
          <img :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/images/news_person/avater/personal.png'" alt="">
        </div>
        <!-- 登陆按钮 -->
        <button class="btn" open-type="getUserInfo" @getuserinfo="handleGetUserInfo">登录</button>
        <!-- 授权手机号按钮 -->
        <!-- <button class="btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权手机号</button> -->
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
import { get } from "@/utils/request";
import { SH_API,img_API,avater,advertise,small_icon} from "@/api/api";
import personModel from "@/components/personModel";
export default {
  components: {
    personModel,
  },
  data () {
    return {
      userInfo: {},
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
  created(){
    
  },
  mounted(){
    //一进页面先获取状态（授权了直接拿到，未授权则获取失败）--进入页面执行一次
    wx.getUserInfo({
      success:(res)=>{
        // 更新userInfo的状态数据
        console.log('获取成功',res)      
        this.userInfo = res.userInfo  
      },
      fail: () => {
        console.log('获取失败');
      }
    })
  },
  methods:{
    //用户登录处理
    handleGetUserInfo(res){
      // console.log(res)
      //用户授权
      if(res.mp.detail.userInfo){
        this.userInfo = res.mp.detail.userInfo
        console.log('user',this.userInfo);
        wx.login({
          success: (res)=>{
            var that = this;
            let code = res.code
            console.log('code',res.code);
            //存储code
            wx.setStorage({key:"code",data:res.code})

            //同步取出code
            // let token = wx.getStorageSync('token')
            let token = get(SH_API+'/login/getOpenId',{user:this.userInfo,code:code});
            // 将自定义登录状态缓存到storage中
            // wx.setStorageSync('token', token);
            console.log('token',token)
          }
        })

      }else{
        console.log('用户没授权！')
      }
    },
    
   
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";
</style>
