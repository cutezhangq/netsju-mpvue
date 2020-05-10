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
        <div class="iconText" v-for="(item, index) in listData" :class="[index==nowIndex?'active':'']" :key="index">
          {{item.name}}
        </div>
      </scroll-view>
      <!-- 右侧 商品滑动栏 -->
      <scroll-view class="right" scroll-y="true">
        <div class="banner" v-for="(item, index) in listData" :key="index"> 
          <img :src="item.bannerUrl" alt="">
        </div>
        <div class="title" v-for="(item, index) in listData" :key="index">
          <span>—</span>
          <span>{{item.name}}分类</span>
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

export default {
  components: {
  },
  created() {},
  mounted() {
    //获取列表数据
    this.getListData();
    //获取默认右侧数据
    this.selectitem(this.id, this.nowIndex);
    //this.changeTab();
  },
  data() {
    return {
      id: "1005000",
      nowIndex: 0,
      listData: [],
      detailData: {}
    };
  },
  components: {},
  methods: {
    tosearch() {
      wx.navigateTo({ url: "/pages/usedMarket/index/search/main" });
    },
    //右边数据接口
    selectitem(id, index) {
      let data = {id: id};
      this.nowIndex = index;
       wx.request({
        url:SH_API+'/category/1005000',
        data,
        success:(res)=>{
          this.detailData = res.data.data;
          console.log(this.detailData)
        }
      })
      
    }, 

    //左边列表接口
    getListData(){
      wx.request({
        url:SH_API+'/category/?parentId='+this.id,
        success:(res)=>{
          this.listData = res.data.data;
        }
      })
    },
  },
  computed: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";

</style>

