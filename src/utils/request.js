import {SH_API,API} from '../api/api'


function getAccessToken() {
  //取出code
  let accessToken = wx.getStorageSync('token');
  // console.log('取出token',accessToken);
  if (accessToken.length!=0) {
     return "Bearer " + accessToken;
  }else{
    return "";
  }
}

// 封装请求
function request(url, method, data, header = {}){
  wx.showLoading({
    title: "加载中" //数据请求前loading
  });
  return new Promise((resolve,reject)=>{
    wx.request({
      // url: API + url,
      url,
      method,
      data,
      header:{
        'content-type':'application/json; charset=utf-8',
        'Authorization': getAccessToken(),
      },
      success: (res) => { 
        wx.hideLoading();
        resolve(res.data);
      },
      fail:(error) => { 
        wx.hideLoading();
        reject(false);
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  });
}
export function get(url, data) {
  return request(url, "GET", data);
}
export function post(url, data) {
  return request(url, "POST", data);
}

//用户登录
export function login() {
  const userInfo = wx.getStorageSync("userInfo");
  if (userInfo) {
    return userInfo;
  }
}

//用户未登录
export function toLogin() {
  const userInfo = wx.getStorageSync("userInfo");
  if (!userInfo) {
    wx.navigateTo({
      url: "/pages/usedMarket/person/main"
    });
  } else {
    return true;
  }
}