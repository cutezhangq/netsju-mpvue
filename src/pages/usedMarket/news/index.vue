<template>
  <div>
    <div class="content">
      <div class="head_bg"></div>
      <!-- icon面板 -->
      <div class="head">
        <div class="headContent" v-for="(item,index) in newsicon" :key="index">
          <img :src="item.icon_img">
          <p class="icon-font">{{item.icon_title}}</p>
        </div>
      </div>
      <!-- 广告 -->
      <div :class="[del?'none':'advertise']" v-for="(item,index) in ad" :key="index">
        <img :src="item.imageUrl">
        <span @click="delAd()"> X </span>
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
     <!-- tabbar -->
    <vueTabBar   
      @fetch-index="clickIndexNav"
      :selectNavIndex=selectNavIndex
      >
    </vueTabBar>
  </div>
</template>

<script>
import { img_API,advertise,avater,goods,icon } from "@/api/api";
import {API,SH_API} from "@/api/api";
import {get} from "@/utils/request";
import vueTabBar from "@/components/usedMTabBar";

  export default {
    onShow(){
      wx.hideTabBar();
    },
    components: {
      vueTabBar
    },
    data() {
      return {
        selectNavIndex:3,
        page:1,
        ad:[],
        del:false,
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
            icon_title:"校圈消息",
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
    },
    beforeMount () {
      this.getAdvertise()
    },
    methods: {
      async getAdvertise(){
        const data = await get(SH_API+`/ad/${this.page}`)
        this.ad = data.data;
      },
      delAd(){
        console.log('调用该方法');
        this.del=true;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/common.styl";
  @import "./style.styl";
</style>
