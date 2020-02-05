const db = wx.cloud.database()
const userCollection = db.collection('User')
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    userOpenid:"",
    userPerInfo:{},//获取成功后，该字典存在name、tel、addressName、addressOpenid四个字段之中的某几个
    //userRecords:{},
    userManageComOpenid:"",
    comOpenid:"",

  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
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
        db.collection('User').where({
          _openid: this.data.userOpenid
        }).get().then(res => {
          this.setData({
            userPerInfo: res.data[0].perInfo,
            //userRecords: res.data[0].records,
            userManageComOpenid: res.data[0].manageComOpenid
          })
          app.globalData.userName = res.data[0].perInfo.userName
        })
      },
      fail: err => {
        console.error('【index】【云函数获取openid】【失败】', err)
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
<<<<<<< Updated upstream
  JumpToInfo: function(e){
    wx.navigateTo({
      url: '../user/information/information'
    })
  },
  JumpToHistory: function(e){
    console.log(e)
    wx.navigateTo({
      url: '../user/record/record'
    })
  },
  // 判断该跳转到register还是manager
  JudgeRegister: function(e){
    
  },
  JumpToRegister: function(e){
    wx.navigateTo({
      url: '../user/record/record',
    })
  },
  JumpToManager: function(e){
    wx.redirectTo({
      url: '../manager/manager',
    })
  }
=======


  

   // 判断该用户是否有填写个人基本信息（不包括住户）
  isFistTime : function(){
    if(this.data.userPerInfo.userName)
      return true;
    else
      return false;
  },

  // 判断该用户是否有填写自己的住户
  isHasRecordAddress : function(){
    if(this.data.userPerInfo.addressOpenid)
      return true;
    else
      return false;
  },

  //判断进入小区是否为自己小区
  isUserOwnAddress : function(address){
    if(address == this.data.userPerInfo.addressOpenid)
      jumpToOutsiderForm();
    else
      jumpToRegisterSuccess();
  },


   // 跳转外来人员填写界面
  jumpToOutsiderFormPage : function(){
    wx.navigateTo({
      url: '/pages/user/adress/adress?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid
    })
  },

   //跳转到登记成功界面
  jumpToRegisterSuccess : function(){
    var record = {
      name: this.data.userPerInfo.name,
      tel: this.data.userPerInfo.tel,
      destination: this.data.userPerInfo.addressName,
      time: new Date(),
    }
    wx.navigateTo({
      url: '/pages/user/successful/successful?userOpenid=' + this.data.userOpenid + '&comOpenid=' + this.data.comOpenid
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
    if(this.isFistTime())
      this.jumpToInformationPage();
    else if(this.isHasRecordAddress)
          if(this.isUserOwnAddress)
           this.jumpToRegisterSuccess();
          else
           this.jumpToOutsiderFormPage();
    else
      this.jumpToTypePage();
   }
>>>>>>> Stashed changes
})
