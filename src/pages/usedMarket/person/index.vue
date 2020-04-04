<template>
  <div class="back">
  <!-- 头像昵称 -->
  <div class="header">
    <img :src="img_userAvatar">
    <div class="headerContent">
      <h4>t_147952436838413_0</h4>
      <p>昵称：未设置</p>
      <span> 个人主页> </span>
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
  <!-- 卖在闲鱼 -->
  <div class="part"> 
    <h2>卖在闲鱼</h2>
    <div class="sell">
      <div class="sellThings" v-for="(item, index) in sellThings" :key="index">
        <img :src="item.img_sellThing">
        <p>我发布的{{item.num}}</p>
      </div>
    </div>

  </div>
  <!-- 买在闲鱼 -->
  <div class="part"> 
    <h2>买在闲鱼</h2>
    <div class="sell">
      <div class="sellThings">
        <img src="../../../../static/images/news_person/small_icon/buy_1.PNG">
        <p>我买到的0</p>
      </div>
      <div class="sellThings">
        <img src="../../../../static/images/news_person/small_icon/buy_2.PNG">
        <p>我收藏的0</p>
      </div>
      <div class="sellThings">
        <img src="../../../../static/images/news_person/small_icon/buy_3.PNG">
        <p>我租到的</p>
      </div>
    </div>
    
  </div>
  <!-- 玩在闲鱼 -->
  <div class="part"> 
    <h2>玩在闲鱼</h2>
    <div class="sell">
      <div class="sellThings">
        <img src="../../../../static/images/news_person/small_icon/play_1.PNG">
        <p>闲鱼币</p>
      </div>
      <div class="sellThings">
        <img src="../../../../static/images/news_person/small_icon/play_2.PNG">
        <p>我的鱼塘</p>
      </div>
      <div class="sellThings">
        <img src="../../../../static/images/news_person/small_icon/play_3.PNG">
        <p>我的帖子</p>
      </div>
      <div class="sellThings">
        <img src="../../../../static/images/news_person/small_icon/play_4.PNG">
        <p>边逛边赚钱</p>
      </div>
      <div class="sellThings">
        <img src="../../../../static/images/news_person/small_icon/play_5.PNG">
        <p>天天赚钱</p>
      </div>
      <div class="sellThings">
        <img src="../../../../static/images/news_person/small_icon/play_6.PNG">
        <p>百币夺宝</p>
      </div>
      <div class="sellThings">
        <img src="../../../../static/images/news_person/small_icon/play_7.PNG">
        <p>参与的免费送</p>
      </div>
      <div class="sellThings">
        <img src="">
        <p></p>
      </div>
    </div>

</div>

  </div>
</template>

<script>
import { img_API,avater,advertise,small_icon } from "../../../api/api";
export default {
  data () {
    return {
      img_userAvatar:img_API+avater+"/default_user_avatar.png",
      img_advertise:img_API+advertise+"/advertise.png",
      sellThings:[
        {
          img_sellThing:img_API+small_icon+"/sell_1.PNG",
          num:2
        },
        {
          img_sellThing:img_API+small_icon+"/sell_2.PNG",
          num:8
        }
      ],

    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";
</style>
