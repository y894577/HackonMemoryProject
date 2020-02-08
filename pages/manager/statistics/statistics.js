// pages/manager/statistics/statistics.js
var util = require('../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      "number": 0,
      text: '总人数'
    },
    {
      "number": 0,
      text: '住户人数'
    },
    {
      "number": 0,
      text: '访客人数'
    },
    ],
    information: {},
  },
  dateChange: function (e) {
    let value = e.detail.value;
    this.setData({
      date: value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //根据_id查找社区
    var TIME = util.formatSmallTime(new Date());
    this.setData({
      date: TIME,
      com_id: options.com_id
    });
    console.log(options)
    wx.cloud.callFunction({
      // 需要调用的云函数名
      name: 'getRecord',
      // 传给云函数的参数
      data: {
        isUser: false
      },
      success: function (res) {
        console.log(res.result)
        const db = wx.cloud.database();
        db.collection('Community').where({
          _id: that.data.com_id
        }).get({
          success: function (res) {
            console.log(".....")
            console.log(res.data[0].visitor)
            var list1 = 'list[1].number'
            var list2 = 'list[2].number'
            var list0 = 'list[0].number'
            that.setData({
              [list1]: res.data[0].resident,
              [list2]: res.data[0].visitor,
              [list0]: res.data[0].resident + res.data[0].visitor,
            })
          },
          fail:function(err){
            console.log(err)
          }
        })
        var r = that.data.resident
        var v = that.data.visitor
        that.setData({
          information: res.result.recordsList,
          //人数统计
          

        })
      },
      fail: function (err) {
        console.log(err)
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
    var TIME = util.formatSmallTime(new Date());
    this.setData({
      date: TIME,
    });
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
  //获取url传来的id后查找记录
  GetRecord: function () { }
})