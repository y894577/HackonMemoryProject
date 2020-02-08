// pages/user/temperature/temperature.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onLoad: function (options) {
    
    this.setData({
      id: options.id,
      userOpenid: options.userOpenid,
      comOpenid: options.comOpenid
    })
  },

  submitForm: function (e) {
    
    var temp = e.detail.value.temperature;
    if(temp==''){
      wx.showToast({
        title: '您的体温为空',
        image: '../../image/close.png',
        duration: 2000
      })
    }
    else{
      wx.showLoading({
        title: '上传中...',
      })
      wx.cloud.callFunction({
        name: 'uploadTemp',
        data: {
          temp: temp,
          id: this.data.id
        },
        success: res => {
          var id = res.result
          wx.hideLoading();
          wx.reLaunch({
            url: '/pages/user/successful/successful?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid 
          })
        },
        fail: err => {
          console.error('【temperature】【云函数】【更新温度】', err)
          wx.hideLoading();
          wx.showToast({
            title: '上传失败',
            image: '../../image/close.png',
            duration: 1800
          })
        }
      })
    }
  },

  
})