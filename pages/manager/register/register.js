// pages/manager/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ComID: "",
    ComName: '',
    LeaderName: '',
    LeaderPhone: '',
    QRcode: '',
    _id: '',
    userOpenid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      _id: options.userOpenid,
      userOpenid: options.userOpenid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //加密生成id函数
  RandomID: function() { // 生成n位长度的字符串
    var str = "abcdefghijklmnopqrstuvwxyz0123456789"; // 可以作为常量放到random外面
    var result = "";
    for (var i = 0; i < 8; i++) {
      result += str[parseInt(Math.random() * str.length)];
    }
    this.setData({
      ComID: result
    })
  },
  UpdateUserComOpenid: function() {
    var that = this;
    const db = wx.cloud.database();
    console.log("openid=" + that.data._openid)
    db.collection('User').where({
      _openid: that.data._id,
    }).update({
      data: {
        manageComOpenid: that.data._id
      },
      success: function(res) {
        console.log(res)
      }
    })
  },
  submitForm: function(e) {
    let val = e.detail.value
    let communityName1=val.communityName
    let name1=val.name
    let phonenumber1=val.phonenumber
    if(communityName1==''){
      wx.showToast({
        title: '社区名称为空',
        image: '../../image/close.png',
        duration: 2000
      })
    }
    else if(name1==''){
      wx.showToast({
        title: '负责人姓名为空',
        image: '../../image/close.png',
        duration: 2000
      })
    }
    else if(phonenumber1==''){
      wx.showToast({
        title: '联系方式为空',
        image: '../../image/close.png',
        duration: 2000
      })
    }
    else{
      var that = this;
      that.setData({
        ComName: communityName1,
        LeaderName: name1,
        LeaderPhone: phonenumber1
      });
      this.RandomID();
      // 上传到数据库
      // 根据上传的信息上传manager
      const db = wx.cloud.database();
      db.collection('Community').add({
        data: {
          comID: that.data.ComID,
          comName: that.data.ComName,
          comManageName: that.data.LeaderName,
          comManageTel: that.data.LeaderPhone,
          comQRcode:'',
          records: [],
          resident: 0,
          visitor: 0,
        },
      }).then(res => {
        console.log(res)
        that.setData({
          _id: res._id
        })
        wx.cloud.callFunction({
          name: 'getWxacode',
          data: {
            id: that.data._id
          },
          success: function (res) {
            console.log("【二维码生成成功】")
          },
          fail: function (err) {
            console.log(err)
          }
        })
        this.UpdateUserComOpenid();
        this.JumpToManager();
        var field = that.data._id; //当前页面选择的内容
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        var prevPage = pages[pages.length - 2]; //获取上一个页面
        prevPage.setData({ //修改上一个页面的变量
          userManageComOpenid: that.data._id,
          userOpenid: that.data.userOpenid
        })
        wx.navigateTo({
          url: '../index/index',
        })
      })
    }
  },
  JumpToManager: function() {
    wx.redirectTo({
      // 需要传参，暂时没写
      url: '../manager?manageComOpenid=' + this.data._id + '?userOpenid =' + this.data.userOpenid,
    })
  },
  JoinToCom: function() {
    wx.redirectTo({
      url: '../joinCom/joinCom?manageComOpenid=' + this.data._id + '?userOpenid=' + this.data.userOpenid,
    })
  }
})