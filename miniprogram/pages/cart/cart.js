// pages/cart/cart.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_all:false,
    produceList:[],
    delect:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('index_produce').get({
      success:res =>{
        this.setData({
          produceList:res.data
        })
      }
    })
  },
  // 全选点击事件
  selectall:function(){
    let that = this
    for(let i = 0 ; i < that.data.produceList.length ; i++){
      that.data.produceList[i].checked = (!that.data.select_all)}
      that.setData({
        produceList: that.data.produceList,
        select_all: (!that.data.select_all)
    })
  },

  // 管理点击删除
  handleSet:function(){
    console.log('dd');
    this.setData({
      delect :!this.data.delect
    })
  },
  //  input点击事件
  handleInput(e){
    console.log(e.detail.value);
    this.setData({
      buyNumber:e.detail.value.buyNumber
    })
    console.log(this.buyNumber);
  },

 //  按钮点击事件
 handleTap(e){
   // console.log(e.currentTarget.dataset.num);
   const number =  e.currentTarget.dataset.num
   const no =this.data.produceList.buyNumber
   // console.log(number);
   this.data.produceList.buyNumber = no + number
   // console.log(this.data.produceList.buyNumber);
   this.setData({
     buyNumber : this.data.produceList.buyNumber
   })
   console.log(this.buyNumber);
   
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