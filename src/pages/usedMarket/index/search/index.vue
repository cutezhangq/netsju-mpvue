<template>
 <div class="back">
    <!-- 搜索框 -->
    <div class="search">
      <div class="search_goods">
        <input type="text" v-model="words" placeholder="搜索" maxlength="15"
        confirm-type="search" focus="true" @confirm="searchWords">
        <span class="icon"></span>
      </div>
    </div>

    <div class="searchTips" v-if="words">
       <div class=productList v-if="tipsData.length!=0">
        <div @click="goodsDetail(item.pid)" class="product" v-for="(item,index) in tipsData" :key="index">
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
            <!-- <img class="img_fr" src="/static/images/search/delete_box_icon.png"> -->
        </div>
        <div class="record_tip" v-for="(item,index) in keyword" :key="index">
            <div class="tip">{{item.tip}}</div>
        </div>
     </div>

     <!-- 热门搜索 -->
     <div class="record" v-if="!words">
      <div class="record_text">
          <p>热门搜索</p>
      </div>
      <div class="record_tip" v-for="(item,index) in history" :key="index">
          <div class="tip">{{item.tip}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from "@/components/searchBar";
import { API,SH_API } from "@/api/api";
import { get } from "@/utils/request";
export default {
  components: {
    searchBar,
  },
  data () {
    return {
      words:"",
      tipsData:[],
      confirm:false,
      keyword:[
        { tip:"色织六层纱布夏凉被" },
        { tip:"日式" },
        { tip:"kindle电子阅读书" },
      ],
      history:[
      { tip:"520元红包抢先领" },
      { tip:"单鞋" },
      { tip:"墨镜" },
      { tip:"夏凉被" },
      { tip:"新品上市" }
      ]
    }
  },
  methods: {
    async searchWords() {//点击完成按钮时触发
      const data = await get(API+"/search/helperaction",{
        keyword:this.words
      });
      this.tipsData = data.keywords;
      this.confirm=true;
    },
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
