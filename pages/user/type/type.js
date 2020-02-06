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
    console.log(options)
    this.setData({
      userOpenid: options.userOpenid,
      comOpenid: options.comOpenid
    });
  },

  jumpToAdressPage: function(event){
    if (event.currentTarget.dataset.flag == "local")
      wx.navigateTo({
        url: '/pages/user/adress/adress?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid + '&flag=local'
      })
    else 
      wx.navigateTo({
        url: '/pages/user/adress/adress?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid + '&flag=outsider'
      })
  }

})