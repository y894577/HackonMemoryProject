// pages/manager/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ComID: "",
    ComName: '',
    LeaderName: '',
    LeaderPhone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取input框的内容
  ComNameInput: function(e){
    var that = this;
    that.setData({
      ComName: e.detail.value
    });
  },
  LeaderNameInput: function (e) {
    var that = this;
    that.setData({
      LeaderName: e.detail.value
    })
  },
  LeaderPhoneInput: function (e) {
    var that = this;
    that.setData({
      LeaderPhone: e.detail.value
    })
  },
  //加密生成id函数
  RandomID: function () { // 生成n位长度的字符串
    var str = "abcdefghijklmnopqrstuvwxyz0123456789"; // 可以作为常量放到random外面
    var result = "";
    for (var i = 0; i < 8; i++) {
      result += str[parseInt(Math.random() * str.length)];
    }
    this.setData({
      ComID: result
    })
  },
  UpdateInfo: function(){
    var that = this;
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
        comQRcode: '',
        record: [],
      },
    }).then(res => {
      console.log(res)
      that.setData({
        _id: res._id
      })
      this.JumpToManager();
    })

  },
  JumpToManager: function(){
    wx.redirectTo({
      // 需要传参，暂时没写
      url: '../manager?_id=' + this.data._id,
    })
  },
  JoinToCom: function(){
    wx.navigateTo({
      url: '../joinCom/joinCom',
    })
  }
})