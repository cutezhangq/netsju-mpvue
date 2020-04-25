<template>
  <div class="back">
     <div class="head">
       <!-- 搜索框 -->
       <div class="search">
          <i class="iconfont icon-netsju-search-line"></i>
          <input type="text" name="search" placeholder="商品搜索" :value="inputValue"/>
          <i @click="clear" class="iconfont icon-netsju-shijianxuanze-shanchu-"></i>
        </div>
        <p>取消</p>
     </div>

     <!-- 历史记录 -->
     <searchModel :searchModel="record_Model"></searchModel>
     <!-- 热门搜索 -->
     <searchModel :searchModel="hot_Model"></searchModel>

  </div>
</template>

<script>
import searchModel from "@/components/searchModel";
export default {
  components: {
    searchModel
  },
  data () {
    return {
      record_Model:{
        title:"历史记录",
        content:[
          {
            text:"色织六层纱布夏凉被"
          },
          {
            text:"日式"
          },
          {
            text:"kindle电子阅读书"
          }
        ]
      },
      hot_Model:{
        title:"热门搜索",
        content:[
          {
            text:"520元红包抢先领"
          },
          {
            text:"单鞋"
          },
          {
            text:"夏凉被"
          },
          {
            text:"新品上市"
          }
        ]
      }
    }
  },

  methods: {
    
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";
</style>
