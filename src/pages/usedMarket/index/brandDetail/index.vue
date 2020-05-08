<template>
    <div>
        <div class="banner">
            <img src="http://yanxuan.nosdn.127.net/1541445967645114dd75f6b0edc4762d.png" alt="">
            <div class="info">
                <span>MUJI制造商</span>
            </div>
        </div>
        <div class="info-desc">
            <p>严选精选了MUJI制造商和生产原料，用几乎零利润的价格，剔除品牌溢价，让用户享受原品牌的品质生活。</p>
        </div> 

        <div v-if="goodsList.length!=0" class="sortlist">
            <div v-for="(item,index) in goodsList" :key="index" class="item" @click="toGoodsDetail()">
                <img :src="item.list_pic_url" alt="">
                <p class="name">{{item.name}}</p>
                <p class="price">{{item.retail_price}}</p>
            </div>
        </div>
        <div v-else class="none">
            数据库暂无数据...
        </div>
    </div>
</template>

<script>
import { API,SH_API } from "@/api/api";
import { get } from "@/utils/request";
export default{
    created () {},
    mounted(){
        this.id=this.$root.$mp.query.id;
        this.getDetail();
    },
    data () {
        return {
            id:"",
            detailData:{},
            goodsList:[]
        };
    },
    components: {},
    methods:{
        async getDetail(){
            const data = await get(API+"/brand/detailaction", { id: this.id });
            this.detailData = data.data;
            this.goodsList = data.goodsList;
        },
        toGoodsDetail(){
            wx.navigateTo({
            url: "/pages/usedMarket/index/GoodsDetail/main"
            });
        }
    },
    computed:{}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "./style.styl";
</style>