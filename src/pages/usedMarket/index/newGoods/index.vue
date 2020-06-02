<template>
    <div class="newgoods">
        <div class="banner">
          <img src="http://yanxuan.nosdn.127.net/8976116db321744084774643a933c5ce.png" alt="">
        </div>
        <div class="sortnav">
          <div @click="changeTab(0)" :class="[0==nowIndex ?'active':'']">综合</div>
          <div @click="changeTab(1)" class="price" :class="[1==nowIndex ?'active':'', order =='desc'? 'desc':'asc']">价格</div>
          <div @click="changeTab(2)" :class="[2==nowIndex ?'active':'']">分类</div>
        </div>
        <div class="sortlist">
          <div @click="goodsDetail(item.id)" v-for="(item, index) in listData" :key="index" class="item">
            <img :src="item.pimg" alt="">
            <p class="name">{{item.pname}}</p>
            <p class="price">￥{{item.price}}</p>
          </div>
        </div>
      </div>
</template>

<script>
import { API,SH_API,FROM_PAGE} from "@/api/api"
import { get } from "@/utils/request";

export default {
  created() { },
  mounted() {
    if (this.$root.$mp.query.isHot) {
      this.choose = "hot"
    }
    if (this.$root.$mp.query.isNew) {
      this.choose = "new"
    }
    this.getlistData(this.choose)
  },
  data() {
    return {
      order: "",
      choose:"",
      nowIndex: 0,
      navData: ["综合", "价格", "分类"],
      listData: []
    };
  },
  components: {},
  methods: {
    async getlistData(choose) {
      const data = await get(SH_API + `/shProduct/${choose}`);
      this.listData = data.data;
    },
    changeTab(index) {
      this.nowIndex = index;
      if (index == 1) {
        this.order = this.order == "asc" ? "desc" : "asc";
      } else {
        this.order = "";
      }
      this.getlistData();
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/usedMarket/index/goodsDetail/main?categoryId="+id
      });
    }
  },
  computed: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~@/assets/common.styl";
    @import "./style.styl";
</style>