<template>
  <div class="addaddress">
    <!-- 地址信息 -->
    <div class="item">
      <input type="text" placeholder="姓名" v-model="userName">
    </div>
    <div class="item">
      <input type="text" placeholder="手机号码" v-model="telNumber">
    </div>
    <div class="item">
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <input type="text" placeholder="城市" v-model="address">
      </picker>
    </div>
    <div class="item">
      <input type="text" placeholder="学校" v-model="adress_school">
    </div>
    <div class="item">
      <input type="text" placeholder="校区" v-model="adress_campus">
    </div>
    <div class="item">
      <input type="text" placeholder="楼号" v-model="adress_dormitory">
    </div>
    <div class="item">
      <input type="text" placeholder="宿舍号" v-model="adress_room">
    </div>
    <div class="item">
      <input type="text" placeholder="备注" v-model="detail">
    </div>
    <!-- 设置 -->
    <div class="item itemend">
      <checkbox-group @change="checkboxChange">
        <label class="checkbox">
          <checkbox class="box" value="true" :checked="checked" color="#B4282D" />设置为默认地址
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
    //已有地址，获取地址
    if (this.$root.$mp.query.res) {
      this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res));
      console.log(this.res);
      this.userName = this.res.userName;
      this.telNumber = this.res.telNumber;
      this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`;
      
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
      userName: "",
      telNumber: "",
      address: "",
      adress_school:"",
      adress_campus:"",
      adress_dormitory:"",
      adress_room:"",
      detail:"",  //备注
      checked: false
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
      const data = await get(SH_API+"/address", {
        id: this.id
      });
      var detail = data.data;
      this.userName = detail.name;
      this.telNumber = detail.telNumber;
      this.address = detail.address;
      this.adress_school = detail.university;
      this.adress_campus = detail.campus;
      this.adress_dormitory = detail.dormitory;
      this.adress_room = detail.room;
      this.checked = detail.is_default == 1 ? true : false;
    },

    //是否选择 设为默认地址
    checkboxChange(e) {
      this.checked = e.mp.detail.value[0];
    },

    //保存地址--添加地址
    async saveAddress() {
      var _this = this;
      const data = await post(SH_API+"/address", {
        userName: _this.userName,
        telNumber: _this.telNumber,
        address: _this.address,
        university: _this.adress_school,
        campus: _this.adress_campus,
        dormitory: _this.adress_dormitory,
        room: _this.adress_room,
        isDefault: _this.checked,
        detail:_this.detail,  
        userId: _this.id  //userId是获取的用户表的
      });
      if (data.data) {
        wx.showToast({
          title: "添加成功",
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

    //获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址
    wxaddress() {
      var _this = this;
      wx.chooseAddress({
        success: function (res) {
          console.log('res',res);
          _this.userName = res.userName;
          _this.telNumber = res.telNumber;
          _this.address = `${res.provinceName} ${res.cityName} ${res.countyName}`;
          // _this.detailadress = res.detailInfo;
        }
      });
    },

    //修改地址
    async editAddress(){
      var _this = this;
      const data = await put(SH_API+"/address", {
        userName: _this.userName,
        telNumber: _this.telNumber,
        address: _this.address,
        university: _this.adress_school,
        campus: _this.adress_campus,
        dormitory: _this.adress_dormitory,
        room: _this.adress_room,
        isDefault: _this.checked,
        detail:_this.detail,  
        userId: _this.id  //userId是获取的用户表的
      });
      if (data.data) {
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
