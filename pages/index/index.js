const db = wx.cloud.database()
const userCollection = db.collection('User')
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show:false,

    userOpenid:"",
    userPerInfo:{},//获取成功后，该字典存在name、tel、addressName、addressOpenid四个字段之中的某几个
    userManageComOpenid:"",
    comOpenid:"",
  },
  //事件处理函数
  onLoad: function (event) {
    console.log(event)
    if(!event.id) 
      this.setData({
        show: true,
        comOpenid: event.id
      })
    
    if (app.globalData.userInfo) {
      //console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //获取用户openid同时其他基本信息
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.data.userOpenid = res.result.openid;
        wx.cloud.callFunction({
          name: 'getInfo',
          data: {
            userOpenid: res.result.openid
          },
          success: res => {
            this.setData({
              userPerInfo: res.result.userPerInfo,
              userManageComOpenid: res.result.userManageComOpenid
            })
            console.log(res)

            if(!this.data.show){
              this.jumpToNextPage();
            }
          },
          fail: err => {
            console.error('【index】【云函数获取个人信息】【失败】', err)
          }
        })
      },
      fail: err => {
        console.error('【index】【云函数获取openid】【失败】', err)
      }
    })

  },
  scanQRCode:function(){
    var that = this
    wx.scanCode({
      onlyFromCamera: true,
      scanType: "QR_CODE",
      success(res) {
        var index = res.path.indexOf("?id=")
        that.setData({
          comOpenid: res.path.substr((index+4))
        })
        that.jumpToNextPage();
      }
    })
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  

   // 判断该用户是否有填写个人基本信息（不包括住户）
  isFistTime : function(){
    if(this.data.userPerInfo.name)
      return false;
    else
      return true;
  },

  // 判断该用户是否有填写自己的住户
  isHasRecordAddress : function(){
    if(this.data.userPerInfo.addressOpenid)
      return true;
    else
      return false;
  },

  //判断进入小区是否为自己小区
  isUserOwnAddress : function(comOpenid){
    if(comOpenid == this.data.userPerInfo.addressOpenid)
      return true;
    else
      return false;
  },

//跳转个人历史记录界面
  jumpToHistoryPage: function () {
    wx.navigateTo({
      url: '/pages/user/record/record?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid
    })
  },

//跳转管理人员界面
  jumpToRegisterPage: function () {
    if(this.data.userManageComOpenid){
       wx.navigateTo({
         url: '/pages/manager/manager?userOpenid=' + this.data.userOpenid + '&manageComOpenid=' + this.data.userManageComOpenid
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/manager/register/register?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid
      })
    }
  },

  //跳转基本信息填写界面
  jumpToInformationPage: function(){
    wx.navigateTo({
      url: '/pages/user/information/information?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid
    })
  },

   // 跳转外来人员填写界面
  jumpToOutsiderFormPage : function(){
    wx.navigateTo({
      url: '/pages/user/adress/adress?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid
    })
  },

   //跳转到登记温度界面
  jumpToTemperaturePage : function(){
    wx.cloud.callFunction({
      name: 'uploadRecord',
      data: {
        tel: this.data.userPerInfo.tel,
        time: new Date(),
        destination: this.data.userPerInfo.addressName,
        name: this.data.userPerInfo.name,
        comOpenid: this.data.comOpenid,
        userOpenid: this.data.userOpenid,
        flag: "3"
      },
      success: res => {
        var id = res.result
        wx.navigateTo({
          url: '/pages/user/temperature/temperature?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid + '&id=' + id
        })
      },
      fail: err => {
        console.error('【adress】【云函数】【提交地址失败】', err)
      }
    })

    
  },


  // 跳转到来访人员类型选择界面
  jumpToTypePage: function () {
    wx.navigateTo({
      url: '/pages/user/type/type?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid
    })
  },


   //扫码成功后跳转页面选择
  jumpToNextPage:function(){
    if(this.isFistTime()){
      console.log("【index】【用户为新用户未填基本信息，跳转基本信息填写界面】")
      this.jumpToInformationPage();
    }
    else if(this.isHasRecordAddress()){
      if(this.isUserOwnAddress(this.data.comOpenid)){
        console.log("【index】【用户已填基本信息和自己住址，扫码小区为自己小区，跳转登记成功界面】")
        this.jumpToTemperaturePage();
      }
      else{
        console.log("【index】【用户已填基本信息和自己住址，扫码别的小区，跳转目的地填写界面】")
        this.jumpToOutsiderFormPage();
      }
    }
    else{
      console.log("【index】【用户已填基本信息但未填自己住址，跳转选择小区界面】")
        this.jumpToTypePage();
    }
   }
})
