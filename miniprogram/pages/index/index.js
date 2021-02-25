
// 引入 发送请求的方法
import { request } from "../../request/index.js";

const db = wx.cloud.database()

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类数组
    classList:[],
    // 模拟新品推荐数据
    produceList: []
  },

  // 页面开始加载后触发
  onLoad: function (options) {

    let that = this
        // 获取云服务轮播图数据
    db.collection('index_swiper').get({
      success:function(res){
        console.log('success',res);
        that.setData({
          swiperList:res.data
        })
      },
      fail:res =>{
        console.log('fail',res);
      }
    }),
    // 获取云服务分类
    db.collection('index_classify').get({
      success:res =>{
        console.log(res);
        that.setData({
          classList:res.data
         
        })
      }
    }),
    // 获取产品显示
    db.collection('index_produce').get({
      success:res =>{
        console.log(res); 
        that.setData({
            produceList:res.data
          })
      }
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
  },
  
  // 点击商品
  onClick(res){
    console.log('this.produceList._id');
  }

})
