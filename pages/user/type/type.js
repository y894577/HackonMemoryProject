// pages/user/Type/type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName: options.userName,
      comOpenid: options.comOpenid
    });
  },

  jumpToAdressPage: function(event){
    if (event.cureentTarget.dataset.flag == "local")
      wx.navigateTo({
        url: '/pages/user/adress/adress?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid + '&flag=true'
      })
    else 
      wx.navigateTo({
        url: '/pages/user/adress/adress?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid + '&flag=false'
      })
  }

})