import {SH_API,API} from '../api/api'

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
        'content-type':'application/json'
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