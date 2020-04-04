// 封装请求

function request(){
  wx.showLoading({
    title: "加载中" //数据请求前loading
  });
  return new Promise((resolve,reject)=>{
    wx.request({
      url:url,
      method: method,
      data: data,
      header: {
        "content-type": "application/json" 
      },
      success: function(res) {
        wx.hideLoading();
        resolve(res.data);
      },
      fail: function(error) {
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