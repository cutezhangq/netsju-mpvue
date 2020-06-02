<template>
 <div class="back">
    <!-- 搜索框 -->
    <searchBar></searchBar>

     <!-- 历史记录 -->
     <div class="record">
        <div class="record_text">
            <p>历史记录</p><br>
            <!-- <img class="img_fr" src="/static/images/search/delete_box_icon.png"> -->
        </div>
        <div class="record_tip" v-for="(item,index) in keyword" :key="index">
            <div class="tip">{{item.tip}}</div>
        </div>
     </div>

     <!-- 热门搜索 -->
     <div class="record">
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
     // keyword:[],
    //  history:[]
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

  beforeMount() {
    //this.sh_keyword();  // 搜索关键词 sh_keyword
    // this.sh_history();  // 搜索历史  sh_history
    // this.sh_hotList();  // 热搜 sh_hotList
    // this.cl_history();  // 清空历史  cl_history
    // this.cl_pointHistory();  // 删除指定历史记录 cl_pointHistory
  },
  methods: {
    //请求---搜索关键词
    // async sh_keyword(){
    //   const data = await get (SH_API+"/search/keyword", data);
    //   this.keyword = data.data;
    // },
    //请求---搜索历史
    // async sh_history(){
    //   const data = await get (SH_API+"/search/history");
    //   this.history = data.data;
    // },
    // //请求---热搜
    // async sh_hotList(){
    //   const data = await get (SH_API+"/search/hotList");
    //   this.hotList = data.data;
    // },
    // //请求---清空历史记录
    // async cl_history(){
    //   const data = await get (SH_API+"/search/history/empty");
    //   this.empty = data.data;
    // },
    // //请求---删除指定历史记录
    // async cl_pointHistory(){
    //   const data = await get (SH_API+"/search/history/{historyId}");
    //   this.historyId = data.data;
    // }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";
</style>
