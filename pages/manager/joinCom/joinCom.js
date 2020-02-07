// pages/manager/joinCom/joinCom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    comID: '',
    id: '',
    user_managecomid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      openid: options.userOpenid
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
  comIDInput: function(e) {
    var that = this;
    // 获取input填写的id
    that.setData({
      comID: e.detail.value
    });
  },
  SearchComID: function() {
    var that = this;
    //查找数据库是否有这个id
    console.log("comid=" + that.data.comID)
    const db = wx.cloud.database();
    db.collection('Community').where({
      comID: that.data.comID
    }).get({
      success: function(res) {
        console.log(res);
        if (res.data.length != 0) {
          that.setData({
            user_managecomid: res.data[0]._id
          })
          that.JumpToManager();
        } else {
          wx.showToast({
            title: '查找失败',
            image: '../../image/close.svg',
            duration: 1800
          })
        }
      },
      fail: console.error
    })
  },
  JumpToManager: function() {
    var that = this;
    //查找数据库是否有这个id
    const db = wx.cloud.database();
    //再查找user
    db.collection('User').where({
      //用户的openid查找user内的值
      _openid: that.data.openid
    }).get({
      success: function(res) {
        //成功则获取managecomopenid
        that.setData({
            id: res.data[0].manageComOpenid
          }),
          console.log('id=' + that.data.id)
        //如果为空则将user_managecomid填入
        if (that.data.id == null) {
          console.log('ComOpenId为空')
          db.collection('User').where({
            _openid: that.data.openid
          }).update({
            data: {
              manageComOpenid: that.data.user_managecomid
            }
          })
          wx.redirectTo({
            url: '../manager?manageComOpenid=' + that.data.user_managecomid,
          })
        } else if (that.data.id == that.data.user_managecomid) {
          console.log('ComOpenId不为空')
          db.collection('User').where({
            _openid: that.data.openid
          }).update({
            data: {
              manageComOpenid: that.data.user_managecomid
            }
          })
          wx.redirectTo({
            url: '../manager?manageComOpenid=' + that.data.user_managecomid,
          })
        } else {
          //返回失败信息
          console.log("查找失败")
        }
      },
      fail: function(res) {
        console.log("查找失败")
      }
    })

  }
})