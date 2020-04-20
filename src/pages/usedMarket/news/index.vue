<template>
  <div>
    <div class="whole_back">
      <div class="head_back"></div>
      <!-- icon面板 -->
      <div class="head">
        <div class="headContent" v-for="(item,index) in newsicon" :key="index">
          <img :src="item.icon_img">
          <p class="icon-font">{{item.icon_title}}</p>
        </div>
      </div>
      <!-- 广告 -->
      <div class="advertise">
        <img :src="img_advertise">
      </div>
      <!-- 消息列表 -->
      <div class="news">
        <div class="newsList" v-for="(item,index) in newsList" :key="index">
          <img class="imgFl" :src="item.img">
          <div class="newsContent">
            <div class="text">
              <h2>{{item.userName}}</h2>
              <p>{{item.news}}</p>
              <span>{{item.publishTime}}天前</span>
            </div>
            <img :src="item.goods_img">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { img_API,advertise,avater,goods,icon } from "@/api/api";
  export default {
    data() {
      return {
        img_advertise:img_API+advertise+"/operation_enter.png",
        newsicon:[
          {
            icon_img:img_API+icon+"/icon_system_top.png",
            icon_title:"通知消息",
          },
          {
            icon_img:img_API+icon+"/icon_reply_message_entry.png",
            icon_title:"互动消息",
          },
          {
            icon_img:img_API+icon+"/icon_sell_top.png",
            icon_title:"活动消息",
          },
          {
            icon_img:img_API+icon+"/icon_pond_top.png",
            icon_title:"鱼塘消息",
          },
        ],
        newsList:[
          {
            img:img_API+avater+"/1.png",
            userName:"syj1138962153",
            news:"[呲牙][呲牙]",
            publishTime:1,
            goods_img:img_API+goods+"/1.png"
          },
          {
            img:img_API+avater+"/2.png",
            userName:"生如夏花",
            news:"你有一条新消息",
            publishTime:1,
            goods_img:img_API+goods+"/2.png"
          },
          {
            img:img_API+avater+"/3.png",
            userName:"幸福树168",
            news:"你有一条新消息",
            publishTime:3,
            goods_img:img_API+goods+"/3.png"
          },
          {
            img:img_API+avater+"/4.png",
            userName:"sin520",
            news:"是呀，他这个对话框有的会多一些",
            publishTime:2,
            goods_img:img_API+goods+"/4.png"
          },
        ],
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";
</style>
