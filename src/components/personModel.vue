<template>
<div>
    <!-- 卖在闲鱼 -->
    <div class="part"> 
      <h2>买在闲鱼</h2>
      <div class="sell">
        <div class="sellThings" v-for="(item, index) in sellThings" :key="index">
          <img :src="item.img_sellThing">
          <p>{{item.todo}}{{item.num}}</p>
        </div>
      </div>

    </div>
    <!-- 买在闲鱼 -->
    <div class="part"> 
        <h2>买在闲鱼</h2>
        <div class="sell">
          <div class="sellThings" v-for="(item, index) in buyThings" :key="index">
            <img :src="item.img_sellThing">
            <p>{{item.todo}}{{item.num}}</p>
          </div>
        </div>
        
    </div>
    <!-- 玩在闲鱼 -->
    <div class="part"> 
        <h2>玩在闲鱼</h2>
        <div class="sell">
          <div class="sellThings" v-for="(item, index) in playThings" :key="index">
            <img :src="item.img_sellThing">
            <p>{{item.todo}}{{item.num}}</p>
          </div>
        </div>
    </div>
</div>
</template>

<script>
import { img_API,small_icon } from "../api/api";
export default {
  data () {
    return {
      sellThings:[
          {
            img_sellThing:img_API+small_icon+"/sell_1.PNG",
            todo:"我发布的",
            num:2
          },
          {
            img_sellThing:img_API+small_icon+"/sell_2.PNG",
            todo:"我卖出的",
            num:0
          }
      ],
      buyThings:[
        {
          img_sellThing:img_API+small_icon+"/play_1.PNG",
          todo:"我买到的",
          num:0
        },
        {
          img_sellThing:img_API+small_icon+"/buy_2.PNG",
          todo:"我收藏的",
          num:1
        },
        {
          img_sellThing:img_API+small_icon+"/buy_3.PNG",
          todo:"我租到的",
          num:0
        }
      ],
      playThings:[
        {
          img_sellThing:img_API+small_icon+"/play_1.PNG",
          todo:"闲鱼币"
        },
        {
          img_sellThing:img_API+small_icon+"/play_2.PNG",
          todo:"我的鱼塘"
        },
        {
          img_sellThing:img_API+small_icon+"/play_3.PNG",
          todo:"我的帖子"
        },
        {
          img_sellThing:img_API+small_icon+"/play_4.PNG",
          todo:"边逛边赚钱"
        },
        {
          img_sellThing:img_API+small_icon+"/play_5.PNG",
          todo:"天天赚钱"
        },
        {
          img_sellThing:img_API+small_icon+"/play_6.PNG",
          todo:"百币夺宝"
        },
        {
          img_sellThing:img_API+small_icon+"/play_7.PNG",
          todo:"参与的免费送"
        }
      ]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.part{
  width: 90%;
  margin: 20rpx auto;
  border-radius: 20px;
  background-color: white;
  padding: 20rpx 0 30rpx 30rpx;}
  h2{
      font-size: 34rpx;
      font-weight: bold;}

  .sell{  
    display:flex;
    margin-top: 20rpx;
    justify-content:space-around;
    align-items:center;
    flex-wrap:wrap;}

    .sellThings{
      display:inline-block;
      font-size: 14px;
      color:grey;
      align-self: center;
      text-align: center;
      flex:0 0 25%;}
      img{
        width:70rpx;
        height:70rpx;
      }
  

</style>