<template>
  <!--二手市场--- "我的"模块组件 -->
  <div class="part">
    <h2>{{perModel.title}}</h2>
    <div class="sell">
      <div class="sellThings" v-for="(item,index) in contentModel" :key="index">
        <img :src="item.sell_goods">
        <p>{{item.todo}}{{item.num}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {img_API,small_icon } from "@/api/api";
  export default {
    props: {
      perModel: Object
    },
    data(){
      return{
        contentModel:Array
      }
    },
    mounted(){
      this.contentModel = this.perModel.content
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .part {
    width: 90%;
    margin: 20rpx auto;
    border-radius: 20px;
    background-color: white;
    padding: 20rpx 0 30rpx 30rpx;
  }
  h2 {
    font-size: 34rpx;
    font-weight: bold;
  }
  .sell {
    display: flex;
    margin-top: 20rpx;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  .sellThings {
    display: inline-block;
    font-size: 14px;
    color: grey;
    align-self: center;
    text-align: center;
    flex: 0 0 25%;
  }
  img {
    width: 70rpx;
    height: 70rpx;
  }
</style>
