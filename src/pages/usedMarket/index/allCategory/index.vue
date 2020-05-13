<template>
   <div class="category">
    <!-- 搜索 -->
    <div class="search" @click="tosearch">
      <div class="ser">
        <span class="icon"></span>
        <span>商品搜索,共239款好物</span>
      </div>
    </div>
    <div class="content">
      <!-- 左侧 分类滑动栏 -->
      <scroll-view class="left" scroll-y="true">
        <div class="iconText" @click="selectitem(item.id,index)" v-for="(item, index) in listData" :class="[index==nowIndex?'active':'']" :key="index">
          {{item.name}}
        </div>
      </scroll-view>
      <!-- 右侧 商品滑动栏 -->
      <scroll-view class="right" scroll-y="true">
        <div class="banner">
          <img :src="cur_listData.bannerUrl" alt="">
        </div>
        <div class="title">
          <span>—</span>
          <span>{{cur_listData.name}}分类</span>
          <span>—</span>
        </div>
        
        <div class="bottom">
          <div @click="categoryList(item.id)" v-for="(item,index) in detailData" :key="index" class="item">
            <img :src="item.wrapBannerUrl" alt="">
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
import { mapMutations} from "vuex";

export default {
  data() {
    return {
      id: "1005000",
      nowIndex: 0,
      listData: [], //分类导航部分数据（含海报）
      detailData: {},
      currentNav:{},
      bannerUrl:"",
      cur_listData:{},
    };
  },
  beforeMount() {
    //获取列表数据
    this.getListData();
    //获取默认右侧数据
    this.selectitem(this.id, this.nowIndex);
  },
  methods: {
    ...mapMutations(["category_selected"]),
    tosearch() {
      wx.navigateTo({ url: "/pages/usedMarket/index/search/main" });
    },
    async selectitem(id, index) {
      this.nowIndex = index;
      const data = await get(SH_API+`/category/${id}`);
      this.detailData = data.data;
      this.cur_listData = this.listData[this.nowIndex];
      //存入vuex
      this.category_selected({
        AllCg_curSelectId:data.data
      })
    },
    async getListData() {
      const data = await get(SH_API+"/category");
      this.listData = data.data;
      this.cur_listData = this.listData[this.nowIndex];
    },
    categoryList(id) {
      //全部分类中使用一级分类id判断
      let parentCategoryId = this.listData[this.nowIndex].id;
      wx.navigateTo({
        url: "/pages/usedMarket/index/categoryList/main?categoryId="+parentCategoryId+"&sonCategoryId="+id
      });
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~@/assets/common.styl";
@import "./style.styl";
</style>

