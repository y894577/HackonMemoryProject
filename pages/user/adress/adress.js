// pages/user/adress/adress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhuhu:true,    //当为true时显示住户登记界面，当为false时显示到访登记界面
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {           //跳转到这个界面时传一个zhuhu的参数给它，它就可以根据参数判断要显示哪个界面
    let value=option.zhuhu
    this.setData({zhuhu:value})
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