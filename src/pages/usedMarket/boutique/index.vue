<template>
  <div class="topic">
    <ul class="list">
      <li @click="topicDetail(item.id)" v-for="(item, index) in topicList" :key="index">
        <div class="t-img">
          <img :src="item.scene_pic_url" alt="">
        </div>
        <div class="info">
          <p>{{item.title}}</p>
          <p>{{item.subtitle}}</p>
          <p>{{item.price_info}}元起</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { get } from "@/utils/request";
import { API,SH_API } from "@/api/api";

export default {
  //下拉刷新
  onPullDownRefresh() {
    this.page = 1;
    this.getListData(true);
    //刷新完成后关闭
    wx.stopPullDownRefresh();
  },
  //滑到底部
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.total) {
      return false;
    }
    this.getListData();
  },
  created() {},
  mounted() {
    this.getListData(true);
  },
  data() {
    return {
      topicList: [],
      page: 1,
      total: ""
    };
  },
  components: {},
  methods: {
    async getListData(first) {
      const data = await get(API+"/topic/listaction", {
        page: this.page
      });
      this.total = data.total;
      if (first) {
        //刷新
        this.topicList = data.data;
      } else {
        //上拉加载跟多
        this.topicList = this.topicList.concat(data.data);
      }
    },
    topicDetail(id) {
      console.log(id);
      wx.navigateTo({ url: "/pages/topicdetail/main?id=" + id });
    }
  },
  computed: {}
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "./style.styl";
</style>
