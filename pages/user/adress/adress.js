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

  submitForm: function(e){
    //判空
    wx.cloud.callFunction({
      name: 'submitAddress',
      data: {
        userOpenid: this.data.userOpenid,
        addressName: e.detail.value.unit,
        comOpenid: this.data.comOpenid,
        time: this.formatTime(new Date()),
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
        wx.showToast({
          title: '提交失败',
          image: '../../image/close.png',
          duration: 1800
        })
      }
    })
  },

  formatTime: function(date){
    const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
      const year  =  date.getFullYear()
      const month  =  date.getMonth()  +  1
      const day  =  date.getDate()
      const hour  =  date.getHours()
      const minute  =  date.getMinutes()
      const second  =  date.getSeconds()
      return  [year,  month,  day].map(formatNumber).join('/')  +  ' '  +  [hour,  minute,  second].map(formatNumber).join(':')
  },
  
  
})