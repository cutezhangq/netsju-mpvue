<template>
 <div class="back">
     <div class="head">
       <!-- 搜索框 -->
       <div class="search">
          <!-- <img src="/static/images/search/search_icon.png"> -->
          <input type="text" name="search" placeholder="商品搜索" :value="inputValue"/>
          <!-- <img @click="clear" src="/static/images/search/delete_icon.png"> -->
        </div>
        <p>取消</p>
     </div>

     <!-- 历史记录 -->
     <div class="record">
        <div class="record_text">
            <p>历史记录</p><br>
            <!-- <img class="img_fr" src="/static/images/search/delete_box_icon.png"> -->
        </div>
        <div class="record_tip">
            <div class="tip">色织六层纱布夏凉被</div>
            <div class="tip">日式</div>
            <div class="tip">kindle电子阅读书</div>
        </div>
     </div>

     <!-- 热门搜索 -->
     <div class="record">
      <div class="record_text">
          <p>热门搜索</p>
      </div>
      <div class="record_tip">
          <div class="tip">520元红包抢先领</div>
          <div class="tip">单鞋</div>
          <div class="tip">墨镜</div>
          <div class="tip">夏凉被</div>
          <div class="tip">新品上市</div>
          <div class="tip">日式</div>
      </div>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./style.styl";
</style>
