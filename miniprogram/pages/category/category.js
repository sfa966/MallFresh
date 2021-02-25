// 引入 发送请求的方法
import { request } from "../../request/index.js";

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 左侧菜单数据
    leftMenuList: [],

    // 右侧产品
    produceList:[],
    // tab切换默认值
    currentIndex:0

  },

  //接口的返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that  = this
    console.log("传递的值为"+options.no);
    if(options.no){
      that.setData({
      currentIndex:Number(options.no) -1
    }, () => {
      console.log('页面内容已经更新')
    })
    }
    
    db.collection('category_classify').get({
      success:res =>{
        console.log(res);
        that.setData({
          leftMenuList:res.data
        })
      }
    }),
    db.collection('index_produce').get({
      success:res =>{
        console.log(res);
        that.setData({
          produceList:res.data
        })
      }
    })
  },
  // 跳去别的tab页面时刷新索引值
  onTabItemTap:function(){
    this.setData({
      currentIndex:0
    })

  },

  // 左侧菜单点击事件
  handleItemTap (e) {
    console.log(e.currentTarget.dataset);
    const { index } = e.currentTarget.dataset;
    const no = index+1
    console.log(no);
    this.setData({
      currentIndex: index,
    })

    this.produceList
  }
})