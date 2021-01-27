// 引入 发送请求的方法
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList:[]
  },
  // 接口数据
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPage:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodList();
  },

  // 获取商品数据
  async getGoodList(){
    const res = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:this.QueryParams})
    console.log(res.data.message);
    // 获取商品总条数
    const total = res.data.message.total
    console.log(total);
    // 获取商品总页数
    this.totalPage = Math.ceil(total/this.QueryParams.pagesize)
    console.log(this.totalPage);
    this.setData({
      // 数组拼接
      goodsList:[...this.data.goodsList,...res.data.message.goods]
    })
  },

  // 标题点击事件
  handletabsItemChange (e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },

  // 页面触底事件  
  onReachBottom(){
    console.log('end');
    // 进行判断是否还有下一页
    if(this.QueryParams.pagenum>=this.totalPage){
      console.log('没有下一页');
      wx.showToast({
        title: '没有下一页了',
      })
    }else{
      this.QueryParams.pagenum++;
      this.getGoodList()
    }
  },

  // 页面上方刷新
  onPullDownRefresh(){
    console.log("已刷新");
  }
})