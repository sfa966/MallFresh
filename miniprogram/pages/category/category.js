// 引入 发送请求的方法
import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 左侧菜单数据
    leftMenuList: [],

    // 右侧商品数据
    rightContent: [],

    // 被点击左侧菜单
    currentIndex: 0,

    // 右侧内容滚动条距离设置
    scrollTop: 0

  },

  //接口的返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      // 不存在时 发送请求获取数据
      this.getCates()
    } else {
      // 有旧数据时 定义过期时间 10s 改为5分钟
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates()
      } else {
        // 可以使用旧的数据
        this.Cates = Cates.data;
        // 构造左侧菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        // 构造右侧商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  // 获取分类数据
  getCates () {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
    })
      .then(res => {
        this.Cates = res.data.message;

        // 将接口数据存放到本地存储中
        wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });

        // 构造左侧菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        // 构造右侧商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      })
  },

  // 左侧菜单点击事件
  handleItemTap (e) {
    // console.log(e);
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;

    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置右侧内容scroll标签距离
      scrollTop: 0


    })
  }


})