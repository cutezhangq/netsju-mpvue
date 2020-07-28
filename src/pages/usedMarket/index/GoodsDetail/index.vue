<template>
  <div class="goods">
    <!-- 轮播 -->
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item, index) in gallery " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.imgUrl" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
      <button class="share" hover-class="none" open-type="share" value="">分享商品</button>
    </div>

    <!-- 退货 退款 邮费 -->
    <div class="swiper-b">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88元免邮费</div>
    </div>

    <!-- 商品简介 -->
    <div class="goods-info">
      <div class="c">
        <p>{{info.name}}</p>
        <p>{{info.description}}</p>
        <p>￥{{info.price}}</p>
        <!-- <div v-if="brand.name" class="brand">
          <p>{{brand.name}}</p>
        </div> -->
      </div>
    </div>

    <!-- 商品数量 -->
    <div @click="showType" class="section-nav">
      <div>请选择规格数量</div>
      <div></div>
    </div>

    <!-- 评论 -->
    <!-- <div class="bg" style=" margin-bottom: 20rpx">
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
    </div> -->

    <!-- 评论_2 -->
    <div class="allMessage">
      <div class="hr"> <h2>全部留言</h2> 
        <div class="clickInput" v-if="comment.length!=0">
          <img src="/static/images/news_person/avater/personal.png">
          <input type="text" placeholder="看对眼就留言，问问更多细节~" @click="showInput">
        </div>
      </div>
      <div class="noMessage" v-if="comment.length==0">
        <img src="../../../../../static/images/sell_goods/留言板.png">
        <p>还没有人留言，还不快来抢沙发...</p>
        <div class="btn" @click="showInput">留言</div>
      </div>

        <!-- 输入框 软键盘 -->
      <div class="put" v-if="showInputBox">
        <open-data type="userAvatarUrl" class="userAvatar"></open-data>
        <input class="input" type="text" focus="auto" v-model="inputMessage" placeholder="看对眼就留言，问问更多细节~" 
         @blur="onHideInput" confirm-type="send" @confirm="sendTextMsg">
        <div class="send" @click="sendTextMsg()"><p>发送</p></div>
     </div>
      

      <div class="message" v-if="comment.length!=0">
        <div v-for="(item,index) in comment" :key="index">
          <div class="commenter" v-if="item.isFirst">
              <img class="userAvatar" :src="item.headPortrait" alt="">
              <div class="user">
                <p>{{item.username}}</p>
                <p @click="reply(index)" @longpress='longPress(item.id,index)'>{{item.content}}</p>
                <p>{{item.id}}天前</p>
              </div>

              <div v-for="(item1,index1) in comment" :key="index1">
                 <div class="replyer" v-if="item1.replayCommentId==item.id">
                  <img class="userAvatar" :src="item1.headPortrait" alt="">
                  <div class="user">
                    <p>{{item1.username}}</p>
                    <p @click="reply(index)" @longpress='longPress(item1.id,index1)'>{{item1.content}}</p>
                    <p>{{item1.id}}天前</p>
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

    <!-- 解析富文本图片 -->
    <div v-if="goods_desc" class="detail">
      <wxParse :content="goods_desc" />
    </div>

    <!-- 大家都在看 -->
    <div class="common-problem">
      <div class="h">
        <div class="line"></div>
        <text class="title">大家都在看</text>
        <div class="line"></div>
      </div>
      <div class="sublist">
        <div @click="togoodsDetail(subitem.pid)" v-for="(subitem, subindex) in productList" :key="subindex">
          <img :src="subitem.pimg" alt="">
          <p>{{subitem.pname}}</p>
          <p>￥{{subitem.price}}</p>
        </div>
      </div>
    </div>

    <!-- 底部固定栏 -->
    <div class="bottom-fixed">
      <div @click="collect">
        <div class="collect" :class="[collectFlag ? 'active' :'']"></div>
      </div>
      <!-- 购物车 -->
      <div @click="toCart">
        <div class="car">
          <span>
            {{allnumber}}
          </span>
          <!-- <img src="/static/images/ic_menu_shoping_nor.png" alt=""> -->
          <i class="iconfont cart" style="font-size:142%">&#xe6c7;</i>
        </div>
      </div>
      <div @click="buy">立即购买</div>
      <div @click="addCart">加入购物车</div>
    </div>

    <!-- 选择规格部分 -->
    <div v-show="showpop" @click="showType" class="pop"></div>
    <!-- 弹出层  点击"立即购买"/"加入购物车"弹出 -->
    <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
      <div class="top">
        <div class="left">
          <img :src="info.primaryPicUrl" alt="">
        </div>
        <div class="right">
          <div>
            <p>价格￥{{info.price}}</p>
            <p>请选择数量</p>
          </div>
        </div>
        <div @click="showType" class="close">
          X
        </div>
      </div>
      <div class="b">
        <p>数量</p>
        <div class="count">
          <div @click="reduce" class="cut">-</div>
          <input class="number" disabled="" v-model="number" />
          <div @click="add" class="add">+</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    API,
    SH_API
  } from "@/api/api";
  import {
    get,
    post,
    del,
    toLogin,
    login
  } from "@/utils/request";
  import wxParse from "mpvue-wxparse";

  export default {
    onShow() {},
    mounted() {
      //判断是否登录获取用户信息
      if (login()) {
        this.userInfo = login();
      }
      this.goodsDetail(this.$root.$mp.query.categoryId);
      this.getComment(this.$root.$mp.query.categoryId);
    },
    //商品转发
    onShareAppMessage() {
      return {
        title: this.info.name,
        path: "/pages/goods/main?id=" + this.info.id,
        imageUrl: this.gallery[0].imgUrl //拿第一张商品的图片
      };
    },
    data() {
      return {
        allnumber: 0,
        // collectFlag: false,
        number: 0,
        showpop: false,
        gallery: [],
        info: {},
        productList: [],
        goods_desc: "",
        userInfo: "",
        goodsId: "",
        showInputBox:false,
        type:"",
        inputMessage:"",
        comment:[],
        items:[],
        i:0,
        userId:1,
        review: [{
          //   uImg: "/static/images/user.png",
          //   uName: "七***花",
          //   time: "2020-05-12",
          //   uReview: "速度非常快，次日中午拿到货。手机很漂亮，很好用。一家人都用vivo手机。手持iqoo来评价",
          //   goodsImg: "/static/images/sell_goods/1.png",
          //   reply: "看到您这句话，就知道您是我们最最最可爱的v粉啦，您和您的家人是我们坚强的后盾，。。",
          // },
          // {
          //   uImg: "/static/images/user.png",
          //   uName: "七***花",
          //   time: "2020-05-23",
          //   uReview: "速度非常快，次日中午拿到货。手机很漂亮，很好用。一家人都用vivo手机。手持iqoo来评价",
          //   goodsImg: "/static/images/sell_goods/1.png",
          //   reply: "看到您这句话，就知道您是我们最最最可爱的v粉啦，您和您的家人是我们坚强的后盾，。。",
          // },
          // {
          //   uImg: "/static/images/user.png",
          //   uName: "七***花",
          //   time: "2020-05-18",
          //   uReview: "速度非常快，次日中午拿到货。手机很漂亮，很好用。一家人都用vivo手机。手持iqoo来评价",
          //   goodsImg: "/static/images/sell_goods/1.png",
          //   reply: "看到您这句话，就知道您是我们最最最可爱的v粉啦，您和您的家人是我们坚强的后盾，。。",
          },
        ]
      };
    },
    components: {
      wxParse
    },
    methods: {
      //跳转--商品详情页
      togoodsDetail(id) {
        //关闭当前页面，跳转到应用内的某个页面，不允许跳转到 tabbar 页面
        wx.redirectTo({
          url: "/pages/usedMarket/index/goodsDetail/main?categoryId=" + id
        });
      },

      add() {
        this.number = this.number + 1;
      },
      reduce() {
        if (this.number > 1) {
          this.number = this.number - 1;
        } else {
          return false;
        }
      },

      //立即购买
      async buy() {
        if (toLogin()) {
          if (this.showpop) {
            if (this.number == 0) {
              wx.showToast({
                title: "请选择商品数量", //提示的内容,
                duration: 2000, //延迟时间,
                icon: "none",
                mask: true, //显示透明蒙层，防止触摸穿透,
                success: res => {}
              });
              return false;
            }

            // const data = await post("/order/submitAction", {
            //   goodsId: this.goodsId,
            // });
            if (data) {
              wx.navigateTo({
                url: "/pages/usedMarket/order/main"
              });
            }
          } else {
            this.showpop = true;
          }
        }
      },
      // async collect() {
      //   if (toLogin()) {
      //     this.collectFlag = !this.collectFlag;
      //     const data = await post("/collect/addcollect", {
      //       goodsId: this.goodsId
      //     });
      //   }
      // },

      //加入购物车
      async addCart() {
        if (toLogin()) {
          if (this.showpop) {
            if (this.number == 0) {
              wx.showToast({
                title: "请选择商品数量", //提示的内容,
                duration: 2000, //延迟时间,
                icon: "none",
                mask: true, //显示透明蒙层，防止触摸穿透,
                success: res => {}
              });
              return false;
            }
            const data = await post(SH_API + "/cart", {
              productId: this.goodsId,
              number: this.number
            });
            //添加成功后
            if (data) {
              this.allnumber = this.allnumber + 1;
              wx.showToast({
                title: "添加购物车成功",
                icon: "success",
                duration: 1500
              });
            }
          } else {
            this.showpop = true;
          }
        }
      },

      // 跳转--购物车
      toCart() {
        if (toLogin()) {
          wx.navigateTo({
            url: "/pages/usedMarket/cart/main"
          });
        }
      },

      //请求--商品详情页
      async goodsDetail(categoryId) {
        const data = await get(SH_API + `/shProduct/${categoryId}`);
        this.gallery = data.data.gallery;
        this.info = data.data.productInfo;
        this.goodsId = data.data.productInfo.id;
        this.goods_desc = data.data.productInfo.productDesc;
        // this.brand = data.data.brand;
        // this.collectFlag = data.data.collected;
        const data_cart = await get(SH_API+"/cart")
        this.allnumber = data_cart.data.length;
        this.productList = data.data.productList;
      },

      showType() {
        this.showpop = !this.showpop;
      },

      //请求评论即查询留言信息
      async getComment(categoryId){
        const data = await get(SH_API + `/comment/${categoryId}`);
        this.comment = data.data;
      },

      //显示输入框 评论
      showInput() {
        this.showInputBox = true;
        this.type="comment";
      },
      //回复
      reply(index){
        this.showInputBox=true;
        this.i=index;
        this.type="reply";
      },
      
      //点击发送按钮时触发
      sendTextMsg(){
        this.addComment()
        wx.showToast({
          title: '已留言',
          icon: 'success'
        });
        this.inputMessage="";
      },

      async addComment(){
        var index = this.i;
        //console.log(this.$root)
        var replyId;
        if(this.type=="comment"){
          replyId=null
        }else if(this.type=="reply"){
          replyId = this.$root.comment[index].id
        }
        var obj={
          "userId":this.userId,
          "content": this.inputMessage,
          "productId": this.$root.$mp.query.categoryId,
          "replayCommentId":replyId
        };
        var myJson=JSON.stringify(obj);
        const data = await post(SH_API + "/comment",myJson);
        this.getComment(this.$root.$mp.query.categoryId);
      },

      //长按删除
      longPress(id,index){
        var that = this;
        wx.showModal({
            title: "",
            content: "是否要删除该留言",
            success: function (res) {
              if (res.confirm) {
                //根据ID删除评论中的某条数据
                that.comment.splice(index, 1);
                const data = del(SH_API + `/comment/${id}`)
                .then(() => {
                  this.getComment(that.$root.$mp.query.categoryId);
                });
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            }
          });
        },

      //隐藏输入框
      onHideInput(){
        this.showInputBox=false;
      },

      //下拉刷新
      onPullDownRefresh(){    
        //刷新后关闭
        wx.stopPullDownRefresh()
      },
    },
    computed: {}
  };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");
  @import "~@/assets/common.styl";
  @import "./style.styl";

</style>
