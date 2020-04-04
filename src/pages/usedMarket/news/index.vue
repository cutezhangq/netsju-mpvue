<template>
  <div>
    <div class="whole_back">
      <div class="head_back"></div>
      <!-- icon面板 -->
      <div class="head">
        <div class="headContent">
          <img src="../../../../static/images/news_person/icon/icon_system_top.png">
          <p class="icon-font">通知消息</p>
        </div>
        <div class="headContent">
          <img src="../../../../static/images/news_person/icon/icon_reply_message_entry.png">
          <p class="icon-font">互动消息</p>
        </div>
        <div class="headContent">
          <img src="../../../../static/images/news_person/icon/icon_sell_top.png">
          <p class="icon-font">活动消息</p>
        </div>
        <div class="headContent">
          <img src="../../../../static/images/news_person/icon/icon_pond_top.png">
          <p class="icon-font">鱼塘消息</p>
        </div>
      </div>
      <!-- 广告 -->
      <div class="advertise">
        <img :src="img_advertise">
      </div>
      <!-- 消息列表 -->
      <div>
        <div class="newsList">
          <img class="imgFl" src="../../../../static/images/news_person/avater/1.png">
          <div class="newsContent">
            <div class="text">
              <h2><strong>syj1138962153</strong></h2>
              <p>[呲牙][呲牙]</p>
              <span>1天前</span>
            </div>
            <img src="../../../../static/images/news_person/goods/1.png">
          </div>
        </div>
        <div class="newsList">
          <img class="imgFl" src="../../../../static/images/news_person/avater/2.png">
          <div class="newsContent">
            <div class="text">
              <h2><strong>生如夏花</strong></h2>
              <p>你有一条新消息</p>
              <span>1天前</span>
            </div>
            <img src="../../../../static/images/news_person/goods/2.png">
          </div>
        </div>
        <div class="newsList">
          <img class="imgFl" src="../../../../static/images/news_person/avater/3.png">
          <div class="newsContent">
            <div class="text">
              <h2><strong>幸福树168</strong></h2>
              <p>你有一条新消息</p>
              <span>2天前</span>
            </div>
            <img src="../../../../static/images/news_person/goods/3.png">
          </div>
        </div>
        <div class="newsList">
          <img class="imgFl" src="../../../../static/images/news_person/avater/4.png">
          <div class="newsContent">
            <div class="text">
              <h2><strong>sin520</strong></h2>
              <p>是呀，他这个对话框有的会多一些</p>
              <span>2天前</span>
            </div>
            <img src="../../../../static/images/news_person/goods/4.png">
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import { img_API,advertise } from "../../../api/api";
  export default {
    data() {
      return {
        img_advertise:img_API+advertise+"/operation_enter.png"
      }
    },

    created() {}
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";
</style>
