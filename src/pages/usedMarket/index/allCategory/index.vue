<template>
  <div class="category">
    <!-- 搜索 -->
    <div class="search" @click="tosearch">
      <div class="ser">
        <span class="icon"></span>
        <span>商品搜索,共239款好物</span>
      </div>
    </div>
    <!-- 全部分类 -->
    <div class="content">
      <!-- 左侧 分类滑动栏 -->
      <scroll-view class="left" scroll-y="true">
        <div class="iconText" @click="changeTab(index,item.id)" v-for="(item, index) in listData" :class="[index==nowIndex?'active':'']" :key="index">
          {{item.name}}
        </div>
      </scroll-view>
      <!-- 右侧 商品滑动栏 -->
      <scroll-view class="right" scroll-y="true">
        <div class="banner"> 
          <img :src="currentNav.bannerUrl" alt="">
        </div>
        <div class="title">
          <span>—</span>
          <span>{{currentNav.name}}分类</span>
          <span>—</span>
        </div>
        <div class="bottom">
          <div class="item" v-for="(item, index) in detailData" :key="index">
            <img :src="item.bannerUrl" alt="">
            <span>{{item.name}}</span>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import {API} from "@/api/api";
import {SH_API} from "@/api/api";
import { get} from "@/utils/request";

export default {
  components: {
  },
  created() {},
  mounted() {
    //获取默认数据
    this.getListData();
    //获取页面传的参数
    this.id = this.$root.$mp.query.id;
  },
  data() {
    return {
      id: "",
      nowIndex: 0,
      listData: [],
      detailData: {},
      currentNav:{}
    };
  },
  components: {},
  methods: {
    tosearch() {
      wx.navigateTo({ url: "/pages/usedMarket/index/search/main" });
    },
    //点击改变当前的下标,右边的数据动态改变
    changeTab(index,id){
      let data = {id: id};
      this.nowIndex = index;
       wx.request({
        url:SH_API+'/category/'+id,
        data,
        success:(res)=>{
          this.detailData = res.data.data;
        }
      }),
      wx.request({
        url:SH_API+'/category/?parentId='+this.id,
        success:(res) =>{
          this.listData = res.data.data;
          this.currentNav = res.data.data[this.nowIndex];
          }     
      })
    },
    //获取默认数据
    getListData(index,id){
      let data = {id: id};
      this.nowIndex = index;
       wx.request({
        url:SH_API+'/category/1005000',
        data,
        success:(res)=>{
          this.detailData = res.data.data;
        }
      }),
      wx.request({
        url:SH_API+'/category/?parentId='+this.id,
        success:(res) =>{
          this.listData = res.data.data;
          this.currentNav = res.data.data[0];
          }     
      })
    },

  },
  computed: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~@/assets/common.styl";
@import "./style.styl";
</style>

