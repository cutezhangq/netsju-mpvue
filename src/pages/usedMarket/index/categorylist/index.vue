<template>
  <div class="categoryList">
    <!-- navSwitch:点击监听导航栏
            navState:当前状态
            index:动态修改当前状态
            current:保持导航栏和滑块数据一致
            监听导航栏
                点击获取index,然后把index赋值给navState。若navState==index,显示红色。
            监听滑块
                滑动滑块，navState会改变（current改变）会触发change事件，调用bingChange方法。
            双向监听
                current动态绑定navState，点击导航栏=>改变navState=>改变current=>滑块跟着改变
                                        滑动滑块=>navState改变=>current改变=>触发change事件=>导航栏改变
        -->
    <!-- 导航栏 -->
    <scroll-view scroll-x="true" :scroll-left="scrollLeft" class="head">
      <div @click="navSwitch(index)" class="navState" v-for="(item, index) in test_navData" :key="index">
        {{item.name}}
      </div>
    </scroll-view>

    <!-- 主题介绍 -->
    <div class="info">
      <p>{{test_currentNav.name}}</p>
      <p>{{test_currentNav.front_desc}}</p>
    </div>

    <!-- 商品列表 -->
    <div @change="bingChange" :current="navState" v-if="test_navData.length!=0">
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
import {API} from "../../../../api/api"
  export default {

    data() {
      return {
        navData: [{
            text: "服装"
          },
          {
            text: "食品"
          },
          {
            text: "配件"
          },
          {
            text: "书籍"
          },
          {
            text: "服装"
          },
          {
            text: "食品"
          },
          {
            text: "配件"
          },
        ],
        goodsList: [{
            list_pic_url: "/static/images/categoryList/1.png",
            name: "抱枕",
            price: 30,
          },
          {
            list_pic_url: "/static/images/categoryList/1.png",
            name: "抱枕",
            price: 30,
          },
          {
            list_pic_url: "/static/images/categoryList/1.png",
            name: "抱枕",
            price: 30,
          },
          {
            list_pic_url: "/static/images/categoryList/1.png",
            name: "抱枕",
            price: 30,
          },
          {
            list_pic_url: "/static/images/categoryList/1.png",
            name: "抱枕",
            price: 30,
          },
          {
            list_pic_url: "/static/images/categoryList/1.png",
            name: "抱枕",
            price: 30,
          }
        ],
        test_navData:[],
        test_currentNav:[],
        nowIndex: 0,
        scrollLeft: 0,
      }
    },
    beforeMount(){
      this.getGoodsList()
    },
    methods: {
      //请求列表
      getGoodsList(){
        //let data = {req: this.searchContent}
        wx.request({
          url:API+'/category/categoryNav?id=1005000',
          // data:{},
          //data,   //es6中同名的属性可以简化不写
          success:(res)=>{
            this.test_navData = res.data.navData
            this.test_currentNav = res.data.currentNav
            console.log(res.data)
          }
        })
      },
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";

</style>
