// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    string:'helloworld',
    isUser:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.test()
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

  },

  test:function(){
    console.log(this.data.string)
    var that=this
    wx.cloud.callFunction({
      name: 'getWxacode',
      data: {
        isUser:false
      },
      success: function (res) {
        console.log(res.result)
        that.setData({
          string:res.result.event.userInfo.appId
        })
      },
      fail: console.error
    })
    
  }
})
