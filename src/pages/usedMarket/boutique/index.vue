<template>
  <div>
    <productBar :product="productDetail"></productBar>
  </div>
  
</template>

<script>
import { get } from "@/utils/request";
import { API,SH_API } from "@/api/api";
import productBar from "@/components/productBar"

export default {
  components: {
    productBar
  },
  mounted () {
    this.getShProductDetails()
  },
  data() {
    return {
      productId:1045000,
      productDetail:[]
    };
  },
  methods: {
    async getShProductDetails(){
      const data = await get(SH_API+`/shProduct/${this.productId}`)
      this.productDetail = data.data.productList
      console.log(this.productDetail)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "./style.styl";
</style>
