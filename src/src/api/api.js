// 全局API
const API = "http://118.25.222.68:5757/heyushuo";

const SH_API = "http://118.190.160.249:18000";
const img_API = "http://118.190.160.249:18000/images";

//图片
export const avater = "/news_person/avater";
export const advertise = "/news_person/advertise";
export const small_icon = "/news_person/small_icon";
export const goods = "/news_person/goods";
export const icon = "/news_person/icon";

//路由守卫页面
const FROM_PAGE = {
  page_usedM_allCategory:"pages/usedMarket/index/allCategory/main",
  page_usedM_index:"pages/usedMarket/index/main",
}

export {
  API,
  img_API,
  SH_API,
  FROM_PAGE
}
