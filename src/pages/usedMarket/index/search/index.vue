<template>
 <div class="back">
    <!-- 搜索框 -->
    <searchBar v-on:listenToChildEvent="searchWords"></searchBar>

    <div class="searchTips" v-if="words">
       <div class=productList v-if="tipsData.length!=0">
        <div @click="goodsDetail(item.id)" class="product" v-for="(item,index) in tipsData" :key="index">
          <img :src="item.list_pic_url">
          <h3>{{item.name}}</h3>
            <div class="price">
              <span>￥</span>
              <span>{{item.retail_price}}</span>
            </div>
        </div>
      </div>


      <div class="noGoods">
        <p v-if="!confirm && words"> 输入中... </p>
        <p v-if="confirm && tipsData.length==0"> 数据库暂无此类商品... </p>
      </div>
    </div>


     <!-- 历史记录 -->
     <div class="record" v-if="!words">
        <div class="record_text">
            <p>历史记录</p><br>
            <img class="img_fr" src="/static/images/search/delete_box_icon.png">
        </div>
        <div class="cont">
          <div class="record_tip" @click="searchWords(item.keyword)" :data-value="item.keyword" v-for="(item,index) in historyData" :key="index">
              <div class="tip">{{item.keyword}}</div>
          </div>
        </div>
     </div>

     <!-- 热门搜索 -->
     <div class="record" v-if="!words">
      <div class="record_text">
          <p>热门搜索</p>
      </div>
      <div class="cont">
        <div class="record_tip" @click="searchWords(item.keyword)" :data-value="item.keyword" v-for="(item,index) in hotData" :key="index">
            <div class="tip">{{item.keyword}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from "@/components/searchBar";
//import productBar from "@/components/productBar";
import { API,SH_API } from "@/api/api";
import { get } from "@/utils/request";
export default {
  components: {
    searchBar,
    //productBar
  },
  mounted () {
    this.openid = wx.getStorageSync("openid") || "";
    this.getHotData()
    this.tipsData=[]
    this.confirm=false;
    this.words=false;
  },
  data () {
    return {
      words:"",
      tipsData:[],
      confirm:false,
      words:false,
      historyData: [],
      hotData: [],
      openid: "",
    }
  },
  methods: {
    async searchWords(val) {//点击完成按钮时触发
      //console.log(val)
      const data = await get(API+"/search/helperaction",{
        keyword:val
      });
      this.tipsData = data.keywords;
      //console.log(this.tipsData)
      this.confirm=true;
      this.words=true;
    },
    async getHotData(first) {
      const data = await get(API+"/search/indexaction?openId=" + this.openid);
      this.hotData = data.hotKeywordList;
      this.historyData = data.historyData;
    },
    //跳转到商品详情页
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/usedMarket/index/goodsDetail/main?categoryId="+id
      });
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/common.styl";
  @import "./style.styl";
</style>
