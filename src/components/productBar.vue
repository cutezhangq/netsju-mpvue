<template>
    <div>
      <div class="productList">
        <div class="product" v-for="(item,index) in product" :key="index">
          <img :src="item.pimg">
          <h3>{{item.pname}}</h3>
            <div class="price">
              <span>￥</span>
              <span class="fl">{{item.price}}</span>
              <span class="fr">51人想买</span>
            </div>
            <div class="userInfo">
              <img :src="item.uimg">
              <span>{{item.username}}</span>
              <span>芝麻信用 | 极好</span>
            </div>
        </div>
      </div>

    </div>
</template>

<script>
  export default{
    props: {
      product: Object
    },
    data(){
      return{
      }
    },     
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .productList{
    display:flex;
    flex-wrap: wrap;}
  .product{
      flex:0 0 46%;
      background-color: white;
      border-radius: 15px;
      margin:10px 0 0 2.5%;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;}
  .productList img{
      width:100%;
      max-height:180px;
  }
  h3{
    padding:0 15rpx;
    font-size: 30rpx;
    overflow:hidden;
    text-overflow:hidden;
  }
  .price{
    padding:0 15rpx;
    height:18px;
    margin:20rpx 0 10rpx 0;}
  span{
      float:left;
      color:red;
      font-size: 12px;
      line-height:18px;
    }
  .fl{
    color:red;
    font-weight: 400;
    font-size: 18px;
    float:left;}
  .fr{
    float:right;
    color:grey;}
      
  .userInfo{
    padding:0 15rpx;
    display:block;
    float:left;
    margin-bottom: 20rpx;}
  .userInfo img{
    width:20px;
    height:20px;
    border-radius: 50%;
    float:left;
    }
  .userInfo span{
    display:inline-block;
    font-size: 12px;
    padding-left:10px;
    color:grey;
  }


</style>