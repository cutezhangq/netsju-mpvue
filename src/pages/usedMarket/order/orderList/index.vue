<template>
  <div>
    <searchBar></searchBar>
    <div class="box">
      <div class="nav">
        <div :class="{'selected':tab === 1,'title':true}" @click="changTab(1)">
          <p>全部</p>
        </div>
        <div :class="{'selected':tab === 2,'title':true}" @click="changTab(2)">
          <p>待支付</p>
        </div>
        <div :class="{'selected':tab === 3,'title':true}" @click="changTab(3)">
          <p>待收货</p>
        </div>
      </div>
      <div class="context">
        <!-- 全部 -->
        <div v-if="tab===1">
          <div class="model">
            <!-- 下单商品 -->
            <div class="cartlist">
              <div class="item" v-for="(item,index) in orderList" :key="index">
                <div v-for="(item2,index2) in item.orderItemDtoList" :key="index2">
                  <div class="m-title">
                    <span>xxxxx号订单</span>
                    <span>交易成功</span>
                  </div>
                  <div class="con" @click="ordeDetails(item2.orderId)">
                    <div class="left">
                      <div class="img">
                        <img :src="item2.productImg" alt="">
                      </div>
                      <div class="info">
                        <p>{{item2.productName}}</p>
                        <p>单价￥{{item2.price}}</p>
                      </div>
                    </div>
                    <div class="right">
                      <div class="num">
                        x{{item2.num}}
                      </div>
                      <div>
                        ￥{{item2.totalMoney}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order-bottom">
                  <div class="order-price">总价￥{{item.totalPrice}} 实付款￥{{item.realPayment}}</div>
                  <span class="order-btn">删除订单</span>
                  <span class="order-btn">修改订单</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="tab===2">
          <p>待支付商品</p>
        </div>
        <div v-else>
          <p>待收货商品</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import searchBar from "@/components/searchBar";
  import {get,post,del} from "@/utils/request";
  import {SH_API} from "@/api/api";

  export default {
    components: {
      searchBar
    },
    data() {
      return {
        pageNum: 0,
        orderList: [],
        tab: 1,
      }
    },
    beforeMount() {
      this.getAllOrder();
    },
    methods: {
      changTab(index) {
        this.tab = index
      },
      async getAllOrder() {
        const data = await post(SH_API + "/order/search/" + this.pageNum, {
          pageNum: this.pageNum
        })
        this.orderList = data.data;
      },
      ordeDetails(id) {
        console.log('点击的订单编号为:', id);
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/common.styl";
  @import "./style.styl";

</style>
