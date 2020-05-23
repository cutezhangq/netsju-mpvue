<template>
  <div class="bg">
  <!-- <div class="bar">
    <productBar :product="productDetail"></productBar>
  </div> -->

  <div class="evaluation">
    <span>评价（3.4万+）</span>
    <span>好评率98%> </span>
  </div>

  <scroll-view scroll-x>
  <div class="reviewList">
    
    <div class="review" v-for="(item,index) in review" :key="index">
      <div class="user">
        <div class="userInfo">
          <img :src="item.uImg">
          <div class="userName">
            <p>{{item.uName}}</p>
            <p>{{item.time}}</p>
          </div>
        </div>

        <p class="userReview">{{item.uReview}}</p>

        <div class="image">
          <img :src="item.goodsImg">
          <img :src="item.goodsImg">
          <img :src="item.goodsImg">
        </div>
      </div>
      <div class="reply">
        <p><span>[官方恢复]</span>{{item.reply}}</p>
      </div>
    </div>

    <div class="more">
      <p>查看更多</p>
    </div> 
    
  </div>
</scroll-view>
   </div>  
</template>

<script>
import { get } from "@/utils/request";
import { API,SH_API,img_API } from "@/api/api";
import productBar from "@/components/productBar"

export default {
  components: {
    productBar
  },
  //下拉刷新
  onPullDownRefresh(){
      this.page=1
      this.getShProductDetails(true)
      //刷新后关闭
      wx.stopPullDownRefresh()
    },
    //划到底部
    onReachBottom(){
      this.page=this.page+1;
      wx.showToast({
        title: '数据库中没有数据啦',
        icon: 'none',
        duration: 2000
      })
      //判断数据是否还有没有
      if(this.page>1){
        return false;
      }
      this.getShProductDetails()
    },
  mounted () {
    this.getShProductDetails(true)
  },
  data() {
    return {
      productId:1045000,
      productDetail:[],
      page:1,
      review:[
        {
          uImg:"/static/images/user.png",
          uName:"七***花",
          time:"2020-05-12",
          uReview:"速度非常快，次日中午拿到货。手机很漂亮，很好用。一家人都用vivo手机。手持iqoo来评价",
          goodsImg:"/static/images/sell_goods/1.png",
          reply:"看到您这句话，就知道您是我们最最最可爱的v粉啦，您和您的家人是我们坚强的后盾，。。",
        },
        {
          uImg:"/static/images/user.png",
          uName:"七***花",
          time:"2020-05-23",
          uReview:"速度非常快，次日中午拿到货。手机很漂亮，很好用。一家人都用vivo手机。手持iqoo来评价",
          goodsImg:"/static/images/sell_goods/1.png",
          reply:"看到您这句话，就知道您是我们最最最可爱的v粉啦，您和您的家人是我们坚强的后盾，。。",
        },
        {
          uImg:"/static/images/user.png",
          uName:"七***花",
          time:"2020-05-18",
          uReview:"速度非常快，次日中午拿到货。手机很漂亮，很好用。一家人都用vivo手机。手持iqoo来评价",
          goodsImg:"/static/images/sell_goods/1.png",
          reply:"看到您这句话，就知道您是我们最最最可爱的v粉啦，您和您的家人是我们坚强的后盾，。。",
        },
      ]
    };
  },
  methods: {
    async getShProductDetails(first){
      const data = await get(SH_API+`/shProduct/${this.productId}?page=${this.page}`)
      if(first){
          this.productDetail = data.data.productList;
        } else {
          this.productDetail = this.productDetail.concat(data.data.productList);
        }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "./style.styl";
</style>
