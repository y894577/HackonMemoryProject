// pages/manager/joinCom/joinCom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    ComID: '',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid : options.openid
    })
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
  comIDInput: function(e){
    var that = this;
    // 获取input填写的id
    that.setData({
      ComID: e.detail.value
    });
  },
  JumpToManager: function(){
    var that = this;
    //查找数据库是否有这个id
    const db = wx.cloud.database();
    db.collection('User').where({
      _openid: that.data.openid
    }).get({
      success: function (res) {
        console.log(res.data[0].manageComOpenid)
        that.setData({
          id: res.data[0].manageComOpenid
        }),
        console.log('id=' + that.data.id)
        if (that.data.id == null) {
          db.collection('User').doc('manageComOpenid').update({
            data: {
              manageComOpenid: 'that.data.ComID'
            }
          })
        }
        else if (that.data.id == that.data.ComID) {
          wx.redirectTo({
            url: '../manager',
          })
        }
        else {
          //返回失败信息
          //暂时未写
        }
      }
    })

  }
})