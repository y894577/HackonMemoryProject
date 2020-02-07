// pages/user/successful/successful.js
const app = getApp()

var util=require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var TIME = util.formatTime(new Date());
    this.setData({
      time: TIME,
    });

    this.data.name = app.globalData.userName
  },

  //上传登记数据
  jumpToIndexPage: function(){
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }

})