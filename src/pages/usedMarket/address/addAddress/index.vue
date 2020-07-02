<template>
  <div class="addaddress">
    <!-- 地址信息 -->
    <div class="item">
      <input type="text" placeholder="姓名" v-model="nickname">
    </div>
    <div class="item">
      <input type="text" placeholder="手机号码" v-model="phone">
    </div>
    <div class="item">
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <input type="text" placeholder="城市" v-model="address">
      </picker>
    </div>
    <div class="item">
      <input type="text" placeholder="学校" v-model="university">
    </div>
    <div class="item">
      <input type="text" placeholder="校区" v-model="campus">
    </div>
    <div class="item">
      <input type="text" placeholder="楼号" v-model="dormitory">
    </div>
    <div class="item">
      <input type="text" placeholder="宿舍号" v-model="room">
    </div>
    <div class="item">
      <input type="text" placeholder="备注" v-model="comment">
    </div>
    <!-- 设置 -->
    <div class="item itemend">
      <checkbox-group @change="checkboxChange">
        <label class="checkbox">
          <checkbox class="box" value="1" :checked="isDefault == 1" color="#B4282D" />设置为默认地址
        </label>
      </checkbox-group>
      <!-- 设置为默认地址 <switch class="box" checked type="switch" bindchange="checkboxChange"></switch> -->
      <div @click="wxaddress">一键导入微信></div>
    </div>
    <div @click="editAddress" v-if="!is_first" class="bottom">
      确认修改
    </div>
    <div @click="saveAddress" v-else class="bottom">
      保存
    </div>
  </div>
</template>

<script>
import { get,post,put } from "@/utils/request";
import { SH_API } from "@/api/api";

export default {
  mounted() {
    //从上一个路由处 获取地址
    if (this.$root.$mp.query.res) {
       //转码
      this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res));
      this.nickname = this.res.userName;
      this.phone = this.res.telNumber;
      this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`;
      this.province = this.res.provinceName;
      this.city = this.res.cityName;
      this.area = this.res.countyName;
    }
    //从地址列表页跳转过来  id是获取到url中传递的参数
    if (this.$root.$mp.query.id) {
      this.id = this.$root.$mp.query.id;
      this.is_first = false;
      this.getDetail();
    }else{
      this.is_first = true;
    }
  },
  data() {
    return {
      is_first:true,
      region: [],
      customItem: "全部",
      id: "",
      res: {},
      nickname: "",
      phone:Number,
      address: "",
      province:"",
      city:"",
      area:"",
      university:"",
      campus:"",
      dormitory:"",
      room:"",
      comment:"",  //备注
      isDefault: 0  //是否默认地址
    };
  },
  methods: {
    //选择城市
    bindRegionChange(e) {
      var value = e.mp.detail.value;
      this.address = value[0] + " " + value[1] + " " + value[2];
    },

    // 按照id，查看地址信息
    async getDetail() {
      const data = await get(SH_API+"/address/"+this.id);
      var res = data.data;
      this.nickname = res.nickname;
      this.phone = res.phone;
      this.province = res.province;
      this.city = res.city;
      this.area = res.area;
      this.university = res.university;
      this.campus = res.campus;
      this.dormitory = res.dormitory;
      this.room = res.room;
      this.comment = res.comment;
      this.isDefault = res.isDefault == 1 ? 1 : 0;
      this.address = `${res.province} ${res.city} ${res.area}`;
    },

    //是否选择 设为默认地址
    checkboxChange(e) {
      this.isDefault = e.mp.detail.value[0];
    },

    //保存地址--添加地址
    async saveAddress() {
      var _this = this;
      //字符串转数组
      let addressArr = _this.address.split(' ');
      const data = await post(SH_API+"/address", {
        nickname: _this.nickname,
        phone: _this.phone,
        province:addressArr[0],
        city:addressArr[1],
        area:addressArr[2],
        university: _this.university,
        campus: _this.campus,
        dormitory: _this.dormitory,
        room: _this.room,
        isDefault: _this.isDefault,
        comment:_this.comment
      });
      if (data.code === 200) {
        wx.showToast({
          title: "添加成功",
          icon: "success",
          duration: 2000, 
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {
            // wx.navigateBack({
            //   delta: 1    //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            // });
            wx.navigateTo({
              url: "/pages/usedMarket/address/addressSelect/main"
            });
          }
        });
      }
    },

    //一键导入微信
    //获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址
    wxaddress() {
      var _this = this;
      wx.chooseAddress({
        success: function (res) {
          _this.nickname = res.userName;
          _this.phone = res.telNumber;
          _this.address = `${res.provinceName} ${res.cityName} ${res.countyName}`;
        }
      });
    },

    //修改地址
    async editAddress(){
      var _this = this;
      //字符串转数组
      let addressArr = _this.address.split(' ');
      const data = await put(SH_API+"/address", {
        id:_this.id,
        nickname: _this.nickname,
        phone: _this.phone,
        province:addressArr[0],
        city:addressArr[1],
        area:addressArr[2],
        university: _this.university,
        campus: _this.campus,
        dormitory: _this.dormitory,
        room: _this.room,
        isDefault: _this.isDefault,
        comment:_this.comment
      });
      if (data.code === 200) {
        wx.showToast({
          title: "修改成功",
          icon: "success",
          duration: 2000, 
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {
            wx.navigateBack({
              delta: 1    //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            });
          }
        });
      }
    },
  }
};

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~@/assets/common.styl";
@import "./style.styl";
</style>
