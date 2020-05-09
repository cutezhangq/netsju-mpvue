<template>
  <div class="categoryList">
    <!-- 导航栏 -->
    <scroll-view scroll-x="true" :scroll-left="scrollLeft" class="head">
      <div @click="changeTab(index,item.id)" class="navState" v-for="(item, index) in navData" :key="index">
        {{item.name}}
      </div>
    </scroll-view>

    <!-- 主题介绍 -->
    <div class="info">
      <p>{{currentNav.name}}</p>
      <p>{{currentNav.frontName}}</p>
    </div>

    <!-- 商品列表 -->
    <div @change="bingChange" :current="navState" v-if="navData.length!=0">
      <div class="list">
        <div class="item" v-for="(item, index) in test_navData" :key="index">
          <img :src="item.img_url">
          <p class="name">{{item.name}}</p>
          <p class="price">￥{{item.price}}</p>
        </div>
      </div>
    </div>

    <div v-else class="none">
      数据库暂无数据...
    </div>

  </div>
</template>

<script>
import {API,SH_API} from "@/api/api"
import {get} from "@/utils/request";

  export default {
    mounted() {
    //获取index页面传参
    this.categoryId = this.$root.$mp.query.id;
  },
    data() {
      return {
        categoryId: "",
        navData:[],
        currentNav:{},
        goodsList: [],
        scrollLeft: 0,
      }
    },
    beforeMount(){
      this.getNavList()
     
    },
    methods: {
      //请求nav列表,一级目录
      async getNavList() {
        const data = await get(SH_API + "/category",{
          parentId:0
        });
        this.navData = data.data
        
      },
      //切换nav
      changeTab(index,current_navid){
        console.log('点击----',index+current_navid);
        this.getGoodsList(current_navid);
      },
      //请求goodsList,二级目录
      async getGoodsList(navid){
        const data = await get(SH_API + "/category/"+this.navId);
        this.goodsList = data.data
        console.log('----请求GoodsList列表---',this.goodsList)
      }
      

    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";

</style>
