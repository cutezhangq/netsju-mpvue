<template>
  <div class="categoryList">
    <!-- 导航栏 -->
    <scroll-view scroll-x="true" :scroll-left="scrollLeft" class="head">
      <div @click="changeTab(index,item.id)" :class="[nowIndex==index?'active':'']" v-for="(item, index) in navData"
        :key="index">
        {{item.name}}
      </div>
    </scroll-view>

    <!-- 主题介绍 -->
    <div class="info">
      <p>{{currentNav.name}}</p>
      <p>{{currentNav.frontName}}</p>
    </div>

    <!-- 商品列表 -->
    <div class="list" v-if="goodsList.length!=0">
      <div @click="goodsDetail(item.pid)" class="item" v-for="(item, index) in goodsList" :key="index">
        <img :src="item.pimg" alt="">
        <p class="name">{{item.pname}}</p>
        <p class="price">￥{{item.price}}</p>
      </div>
    </div>
    <div v-else class="none">
      数据库暂无数据...
    </div>

  </div>
</template>

<script>
import { API,SH_API} from "@/api/api"
import { get } from "@/utils/request";
export default {
  mounted() {
    //参数 获取index页面传参
    this.getNavList(this.$root.$mp.query.categoryId);
  },
  data() {
    return {
      navData: [],
      currentNav: {},
      goodsList: [],
      scrollLeft: 0, //nav滑动的位置
      nowIndex: 0, //当前nav的下标
      goods_page: 0, //商品列表分页
    }
  },
  methods: {
    //请求nav列表,一级目录
    async getNavList(cur_categoryId) {
      const data = await get(SH_API + "/category", {
        parentId: 0
      });
      this.navData = data.data;
      //index页面传参--选择的分类id
      this.currentNav.id = cur_categoryId;
      //匹配当前nav下标
      for (let i = 0; i < this.navData.length; i++) {
        const id = this.navData[i].id;
        if (id == this.currentNav.id) {
          this.nowIndex = i;
          this.currentNav = this.navData[i]
        }
      }
      //需要让导航滚动到可见区域
      if (this.nowIndex > 4) {
        this.scrollLeft = this.nowIndex * 60;
      } else {
        this.scrollLeft = 0;
      }
      this.getGoodsList(this.currentNav.id);
    },
    //切换nav
    changeTab(index, current_navid) {
      this.nowIndex = index;
      this.currentNav = this.navData[index];
      this.getGoodsList(current_navid);
      //需要让导航滚动到可见区域
      if (this.nowIndex > 4) {
        this.scrollLeft = this.nowIndex * 60;
      }
    },
    //请求goodsList,二级目录
    async getGoodsList(navid) {
      const data = await get(SH_API + `/shProduct/category1/${navid}/${this.goods_page}`);
      this.goodsList = data.data
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/usedMarket/index/GoodsDetail/main?categoryId="+id
      });
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~@/assets/common.styl";
@import "./style.styl";
</style>
