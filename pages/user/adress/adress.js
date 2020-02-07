// pages/user/adress/adress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {           //跳转到这个界面时传一个flag的参数给它，它就可以根据参数判断要显示哪个界面
    this.setData({
      flag: (options.flag == "local")?true:false,
      userOpenid: options.userOpenid,
      comOpenid: options.comOpenid
    })
  },

  submitForm: function () {
    //判空 
    wx.cloud.callFunction({
      name: 'submitAddress',
      data: {
        userOpenid: this.data.userOpenid,
        addressName: this.data.addressName,
        comOpenid: this.data.comOpenid,
        time: new Date(),
        flag: this.data.flag
      },
      success: res => {
        var id = res.result
        wx.navigateTo({
          url: '/pages/user/temperature/temperature?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid + '&id=' + id
        })
      },
      fail: err => {
        console.error('【adress】【云函数】【提交地址失败】', err)
      }
    })
  }
  
})