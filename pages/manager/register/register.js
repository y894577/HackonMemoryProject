// pages/manager/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ComName: '',
    LeaderName: '',
    LeaderPhone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 获取input框的内容
  ComNameInput: function(e){
    this.setData({
      ComName: e.detail.value
    })
  },
  LeaderNameInput: function (e) {
    this.setData({
      LeaderName: e.detail.value
    })
  },
  LeaderPhoneInput: function (e) {
    this.setData({
      LeaderPhone: e.detail.value
    })
  },
  UpdateInfo: function(){
    var that = this;
    // 上传到数据库
    // 根据上传的信息上传manager
    const db = wx.cloud.database();
    db.collection('community').add({
      data: {
        comName: that.data.ComName,
        comManagerName: that.data.LeaderName,
        comManagerTel: that.data.LeaderPhone
      },
      success: function (res) {
        console.log(res)
        JumpToManager();
      },
      fail: console.error
    })
  },
  JumpToManager: function(){
    wx.redirectTo({
      // 需要传参，暂时没写
      url: '../manager',
    })
  },
  JoinToCom: function(){
    wx.navigateTo({
      url: '../joinCom/joinCom',
    })
  }
})