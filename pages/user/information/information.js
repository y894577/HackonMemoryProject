// pages/user/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ajxtrue: false,
   },
   
  onLoad: function (options) {
    this.setData({
      userName: options.userName,
      comOpenid: options.comOpenid
    });
  },

  //提交个人基本信息
  submit: function(){

    wx.navigateTo({
      url: '/pages/user/type/type?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid
    })
  },

   // 手机号验证
   blurPhone: function(e) {
    var phone = e.detail.value;
    let that = this
    if (!(/^1[34578]\d{9}$/.test(phone))) {
     this.setData({
      ajxtrue: false
     })
     if (phone.length >= 11) {
      wx.showToast({
       title: '手机号有误',
       icon: 'success',
       duration: 2000
      })
     }
    } else {
     this.setData({
      ajxtrue: true
     })
     console.log('验证成功', that.data.ajxtrue)
    }
   },
   // 表单提交
   formSubmit: function(e)  {
    let that = this
    let val = e.detail.value
    let ajxtrue = this.data.ajxtrue
    if (ajxtrue == true) {
    //表单提交进行
    } else {
    wx.showToast({
      title: '手机号有误',
      icon: 'success',
      duration: 2000
    })
    }
   },
  
 
  
})