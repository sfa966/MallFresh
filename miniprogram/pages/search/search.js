// pages/search/search.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:[],
    produceList:[]
  },
  onSearch:function(e){
    let that = this
    console.log(e.detail.value);
    db.collection('index_produce').where({
      name:e.detail.value
    }).get({
      success:res =>{
        that.setData({
          search:res.data
        })
        console.log('成功',that.data.search);
        if(that.data.search == ""){
          wx.showToast({
            title: '未找到商品',
            icon:"none"
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('index_produce').get({
      success:res =>{
        console.log(res); 
        that.setData({
            produceList:res.data
          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})