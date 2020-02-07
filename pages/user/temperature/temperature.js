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
    if(e){
      wx.cloud.callFunction({
        name: 'uploadTemp',
        data: {
          temp: temp,
          id: this.data.id
        },
        success: res => {
          var id = res.result
          wx.navigateTo({
            url: '/pages/user/successful/successful?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid 
          })
        },
        fail: err => {
          console.error('【temperature】【云函数】【更新温度】', err)
        }
      })
    }
  },

  
})