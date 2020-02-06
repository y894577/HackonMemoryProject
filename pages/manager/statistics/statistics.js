// pages/manager/statistics/statistics.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        number: 251,
        text: '总人数'
      },
      {
        number: 251,
        text: '住户人数'
      },
      {
        number: 251,
        text: '访客人数'
      },
    ],
    information: {}

  },
  dateChange: function(e) {
    let value = e.detail.value;
    this.setData({
      date: value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var TIME = util.formatSmallTime(new Date());
    this.setData({
      date: TIME,
    });
    var that = this;
    wx.cloud.callFunction({
      // 需要调用的云函数名
      name: 'getRecord',
      // 传给云函数的参数
      data: {
        isUser: false
      },
      success: function(res) {
        console.log(res.result)
        var list0 = 'list[0].number'
        that.setData({
          information: res.result.recordsList,
          //人数统计
          [list0]: res.result.recordsList.length,
        })
      },
      fail: function(err) {
        console.log(err)
      }
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
    var TIME = util.formatSmallTime(new Date());
    this.setData({
      date: TIME,
    });
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
  //获取url传来的id后查找记录
  GetRecord: function() {}
})