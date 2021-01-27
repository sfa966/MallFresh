
// 引入 发送请求的方法
import { request } from "../../request/index.js";

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList: [],
    // 模拟新品推荐数据
    produceList: [
      {
        "image": "https://s1.ax1x.com/2020/10/14/0I8vCT.jpg",
        "name": "白菜",
        "price": "2元/斤"
      },
      {
        "image": "https://s1.ax1x.com/2020/10/14/0IU6KS.md.jpg",
        "name": "白萝卜",
        "price": "1.2元/斤"
      },
      {
        "image": "https://s1.ax1x.com/2020/10/14/0IUovT.md.jpg",
        "name": "扁豆",
        "price": "2元/斤"
      },
      {
        "image": "https://s1.ax1x.com/2020/10/14/0IUx8x.jpg",
        "name": "冬瓜",
        "price": "2元/斤"
      },
    ]
  },

  // 页面开始加载后触发
  onLoad: function (options) {

    this.getSwiperList();

    this.getCateList();
  },


  // 获取轮播图数据
  getSwiperList () {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },

  // 获取分类导航数据
  getCateList () {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems" })
      .then(result => {
        this.setData({
          catesList: result.data.message
        })
      })
  }

})
