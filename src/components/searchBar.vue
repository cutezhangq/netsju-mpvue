<!-- 搜索框组件 -->
<template>
  <div class="search">
    <div class="search_goods">
      <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png" alt="">
      <input type="text" :value="words" placeholder="搜索" maxlength=15 @focus="auto"
      confirm-type="search" focus="true" @input="search" @confirm="searchWords($event)">
      <img @click="clearInput" class="del" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png" alt="">
    </div>
  </div>
</template>

<script>
  import {API} from "@/api/api";
  export default {
    props: {},
    data() {
      return {
        words:""
      }
    },
    methods: {
      search(){//键盘输入时触发
        //this.words = this.words.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
        this.words=this.words.replace(/[*]/g,'')
        this.words=this.words.replace(/[^\w\u4E00-\u9FA5\s*]/g, '');
      },
      searchWords(e){
        var word = e.target.value
        console.log(word)
        this.$emit("listenToChildEvent",word)
      },
      clearInput(){
        
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .search {
    //width: 100%;
    box-sizing: border-box;
    padding: 0 32rpx;   
    top: 0;
    z-index: 99;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    position: relative;
  }        
  .search_goods {
    font-size: 32rpx;
    height: 59rpx;
    display: flex;
    align-items: center;
    background: #f4f4f4;
    border-radius: 8rpx
  }
  input {
    border-radius: 8rpx;
    display: inline-block;
    width: 560rpx;
    height: 59rpx;
    margin-left: 10rpx;
  }
  img {
    display: inline-block;
    width: 31rpx;
    height: 31rpx;
    padding:0 20rpx;
  }
  .del {
    width: 60rpx;
    height: 60rpx;
    padding: 0;
  }

</style>
