// pages/manager/manager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'/pages/image/wait.png',
    communityName: '',
    id:'',
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.comID,
    })
    console.log(options.comID)

    //用comid查找数据库
    var that = this;
    const db = wx.cloud.database();
    db.collection('Community').where({
      _id: options._id
    }).get({
      success: function(res){
        console.log(res.data[0])
        that.setData({
          id: res.data[0].comID,
          communityName: res.data[0].comName,
          code: res.data[0].comQRcode
        })
      },
      fail: console.log('error')
    })

    //转换二维码图片
    wx.cloud.callFunction({
      name: 'getWxacode',
      success: function (res) {
        console.log(res)
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
    wx.redirectTo({
      url: 'register/register',
    })
  },
  // 通过comid来生成二维码

})