<template>
    <!-- 搜索模块 -->
    <div class="record">
        <div class="record_text">
            <p>{{searchModel.title}}</p>
        </div>
        <div class="record_tip" v-for="(item,index) in contentModel" :key="index">
            <div class="tip">{{item.text}}</div>
        </div>
     </div>

</template>

<script>
    export default {
    props: {
      searchModel: Object
    },
    data(){
      return{
        contentModel:Array
      }
    },
    mounted(){
      this.contentModel = this.searchModel.content
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.record{
    width:90%;
    font-size: 30rpx;
    padding:0 32rpx;
    background-color: white;
    margin:20rpx auto;
}
.record_text{
    padding:20rpx 0 10rpx 0;
}
p{
    display: inline-block;
    font-weight: 400;
}
i{
    width:31rpx;
    height:31rpx;
    float:right;
}

.record_tip{
    display:inline-block;
    flex-wrap: wrap;
    padding-bottom: 20rpx;
}
.tip{
    padding:10rpx 17rpx;
    margin:10rpx;
    border-radius: 13px;
    background-color: #f1f1f1;
    color:gray;
}

</style>