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
      flag: options.flag,
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
        time: new Date()
      },
      success: res => {
        this.setData({
          userPerInfo: res.result.userPerInfo,
          userManageComOpenid: res.result.userManageComOpenid
        })
      },
      fail: err => {
        console.error('【index】【云函数提交地址】【失败】', err)
      }
    })

    wx.navigateTo({
      url: '/pages/successful/successful/type?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid
    })
  }
  
})