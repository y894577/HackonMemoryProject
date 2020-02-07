// pages/user/information/information.js
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
      toWuhsn: (e.detail.value == "是")?true:false
    })
   },
   
  onLoad: function (options) {
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
   formSubmit: function(e)  {
    let that = this
    let val = e.detail.value
    let ajxtrue = this.data.ajxtrue
    if (ajxtrue == true) {
    //表单提交进行
      wx.cloud.callFunction({
        name: 'uploadBasicInfo',
        data: {
          userOpenid: this.data.userOpenid,
          name: val.name,
          tel: val.phonenumber,
          toWuhsn: this.data.toWuhsn
        },
        success: res => {
       
        },
        fail: err => {
          console.error('【index】【云函数上传个人基本信息】【失败】', err)
        }
      })
      wx.navigateTo({
        url: '/pages/user/type/type?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid
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