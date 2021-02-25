// pages/goods_detail/goods_detail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    produceList:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    let that = this
    db.collection('index_produce').doc(options.id).get({
      success:res =>{
        console.log(res.data);
        that.setData({
          produceList:res.data
          // .map(item =>{
          //   if(item.type == 1){
          //     item.type = "品种"
          //   }else{
          //     item.type = "品牌"
          //   }
          //   return item
          // })
          // .map(item =>{
          //   if(item.type_name){
          //     console.log(item.type_name);
          //   }else{
          //     item.type_name = "暂无"
          //   }
          //   return item
          // })
        })

      }
    })
  },

  // 点击加购红点变化
  clickAfter:function(e){
    // console.log(this.data.joinNumber);
    const join = this.data.produceList.joinNumber
    this.data.produceList.joinNumber = join +1
    // console.log(join);
    this.setData({
      joinNumber:this.data.produceList.joinNumber
    })
    // console.log(this.joinNumber);
    

  },

  //点击购买显示底部弹出框
  clickNow:function(){
    this.showModal();
  },

//显示对话框
 showModal: function () {
   // 显示遮罩层
   var animation = wx.createAnimation({
     duration: 200,
     timingFunction: "linear",
     delay: 0
   })
   this.animation = animation
   animation.translateY(300).step()
   this.setData({
     animationData: animation.export(),
     showModalStatus: true
   })
   setTimeout(function () {
     animation.translateY(0).step()
     this.setData({
       animationData: animation.export()
     })
   }.bind(this), 200)
 },
 //隐藏对话框
 hideModal: function () {
   // 隐藏遮罩层
   var animation = wx.createAnimation({
     duration: 200,
     timingFunction: "linear",
     delay: 0
   })
   this.animation = animation
   animation.translateY(300).step()
   this.setData({
     animationData: animation.export(),
   })
   setTimeout(function () {
     animation.translateY(0).step()
     this.setData({
       animationData: animation.export(),
       showModalStatus: false
     })
   }.bind(this), 200)
   this.setData({
     buyNumber:1
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