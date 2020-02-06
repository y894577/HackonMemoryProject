// pages/manager/manager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'/pages/image/wait.png',
    communityName:'华南师范大学南海校区',
    id:'1526271623213',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.comID,
    })
    console.log(options.comID)
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
  //通过id来获取数据库内容
  JumpToStatistics: function (e) {
    //需要传参
    wx.navigateTo({
      url: 'statistics/statistics?comID='+this.data.comID,
    })
  },
  ExportData: function(e){
    //需要传参
    wx.navigateTo({
      url: 'export/export?comID='+this.data.comID,
    })
  },
  ReturnComRegister: function () {
    //需要传参
    wx.redirectTo({
      url: 'register/register',
    })
  }
})