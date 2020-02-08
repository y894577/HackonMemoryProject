// pages/user/information/information.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ajxtrue: false,
    items:[
      { name: '是', checked: false},
      { name: '否', checked: true}
    ],
   },
   changeSex:function(e){
    console.log('radio-group发生change事件，携带value值为：', e.detail.value)
    this.setData({
      toWuhan: (e.detail.value == "是")?true:false
    })
   },
   
  onLoad: function (options) {
    console.log(options)
    this.setData({
      userOpenid: options.userOpenid,
      comOpenid: options.comOpenid
    });
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
   submitForm: function(e)  {
    let that = this
    let val = e.detail.value
    let ajxtrue = this.data.ajxtrue
    app.globalData.name = val.name
    if (ajxtrue == true) {
    //表单提交进行
      wx.cloud.callFunction({
        name: 'uploadBasicInfo',
        data: {
          userOpenid: this.data.userOpenid,
          name: val.name,
          tel: val.phonenumber,
          toWuhan: this.data.toWuhan
        },
        success: res => {
          wx.redirectTo({
            url: '/pages/user/type/type?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid
          })
        },
        fail: err => {
          console.error('【index】【云函数上传个人基本信息】【失败】', err)
        }
      })
      
    } else {
    wx.showToast({
      title: '手机号有误',
      icon: 'success',
      duration: 2000
    })
    }
   },
  
 
  
})