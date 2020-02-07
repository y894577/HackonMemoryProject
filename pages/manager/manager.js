// pages/manager/manager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    communityName: '',
    id: '',
    _id: '',
    com_id: '',
    userOpenid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      _id: options.manageComOpenid,
      userOpenid: options.userOpenid
    })
    console.log(options.manageComOpenid)
    //用openid查找数据库
    var that = this;
    const db = wx.cloud.database();
    db.collection('Community').where({
      _id: options.manageComOpenid
    }).get({
      success: function(res) {
        console.log("openid查找结果：")
        console.log(res.data[0])
        that.setData({
          id: res.data[0].comID,
          communityName: res.data[0].comName,
          code: res.data[0].comQRcode,
          com_id: res.data[0]._id
        })
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //通过id来获取数据库内容
  JumpToStatistics: function(e) {
    //需要传参
    console.log("test" + this.data.com_id)
    wx.navigateTo({
      url: 'statistics/statistics?com_id=' + this.data.com_id,
    })
  },
  ExportData: function(e) {
    //需要传参
    wx.navigateTo({
      url: 'export/export?comID=' + this.data.comID,
    })
  },
  ReturnComRegister: function() {
    var that = this;
    const db = wx.cloud.database();
    db.collection('User').where({
      _openid: that.data.userOpenid
    }).update({
      data: {
        manageComOpenid: '',
      },
      success: function(res) {
        console.log(res)
        wx.redirectTo({
          url: 'register/register',
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })

  },
  Field: function() {
    var field = that.data._id; //当前页面选择的内容
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2]; //获取上一个页面
    prevPage.setData({ //修改上一个页面的变量
      userManageComOpenid: that.data._id,
      userOpenid: that.data.userOpenid
    })
    wx.navigateBack({
      url: '../index/index',
    })
  }
})