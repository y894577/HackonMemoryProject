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
  onLoad: function (options) {           //跳转到这个界面时传一个zhuhu的参数给它，它就可以根据参数判断要显示哪个界面
    this.setData({
      flag: options.flag,
      userOpenid: options.userOpenid,
      comOpenid: options.comOpenid
    })
  },

  submitForm: function(){
    //判空
    wx.navigateTo({
      url: '/pages/successful/successful/type?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid
    })
  }
  
})