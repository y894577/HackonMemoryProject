// pages/manager/joinCom/joinCom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    ComID: '',
    id: '',
    user_managecomid: ''
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
  SearchComID: function(){
    var that = this;
    //查找数据库是否有这个id
    const db = wx.cloud.database();
    db.collection('Community').where({
      comID: that.data.ComID
    }).get({
      success: function (res) {
        console.log(res)
        that.setData({
          user_managecomid: res.data[0]._id
        })
        that.JumpToManager();
      },
      fail: console.error
    })
  },
  JumpToManager: function(){
    var that = this;
    //查找数据库是否有这个id
    const db = wx.cloud.database();
    //再查找user
    db.collection('User').where({
      //用户的openid查找user内的值
      _openid: that.data.openid
    }).get({
      success: function (res) {
        //成功则获取managecomopenid
        that.setData({
          id: res.data[0].manageComOpenid
        }),
        console.log('id=' + that.data.id)
        //如果为空则将user_managecomid填入
        if (that.data.id == null) {
          db.collection('User').doc('manageComOpenid').update({
            data: {
              manageComOpenid: that.data.user_managecomid
            }
          })
        }
        else if (that.data.id == that.data.user_managecomid) {
          wx.redirectTo({
            url: '../manager?_id='+that.data.user_managecomid,
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