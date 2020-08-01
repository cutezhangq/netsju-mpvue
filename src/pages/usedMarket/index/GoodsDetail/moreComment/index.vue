<template>
  <div>
     <div class="message">
        <div v-for="(item,index) in comment" :key="index">
          <div class="commenter" v-if="item.isFirst">
              <img class="userAvatar" :src="item.headPortrait" alt="">
              <div class="user">
                <p>{{item.username}}</p>
                <p @click="reply(index)" @longpress='longPress(item.id,index,item.canDelete)'>{{item.content}}</p>
                <p ref="createTime">{{finallyTime | time(item.createTime)}}前</p>
              </div>

              <div v-for="(item1,index1) in comment" :key="index1">
                 <div class="replyer" v-if="item1.replayCommentId==item.id">
                  <img class="userAvatar" :src="item1.headPortrait" alt="">
                  <div class="user">
                    <p>{{item1.username}}</p>
                    <p @click="reply(index)" @longpress='longPress(item1.id,index1,item1.canDelete)'>{{item1.content}}</p>
                    <p>{{finallyTime | time(item.createTime)}}前</p>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div class="end">
          - THE END -
        </div>
      </div>
  </div>
</template>

<script>
import {SH_API} from "@/api/api";
import {get } from "@/utils/request";
export default {
  mounted () {
    this.getAllComment(this.$root.$mp.query.categoryId);
  },
  data(){
    return{
      comment:[]
    }
  },
  methods: {
    async getAllComment(categoryId){
      const data = await get(SH_API + `/comment/${categoryId}`);
      console.log(categoryId)
        this.comment = data.data;
      },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/common.styl";
  @import "./style.styl";
</style>
