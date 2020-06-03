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

// export const PUT = (url,data)=>request(url,"PUT",data)
// export const DELETE = (url,data)=>request(url,"DELETE",data)

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
    wx.showModal({
      title: '提示',
      content: '还没登陆，去登陆',
      success (res) {
        if (res.confirm) {
          wx.switchTab({
            url: "/pages/usedMarket/person/main"
          });
        } else if (res.cancel) {
        }
      }
    })
  } else {
    return true;
  }
}