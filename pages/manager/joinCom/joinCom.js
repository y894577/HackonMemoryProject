// pages/manager/joinCom/joinCom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    comID: '',
    id: '',
    user_managecomid: '',
    manageComOpenid: ''
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
  submitForm: function(e) {
    let val = e.detail.value
    let comID1=val.ComID
    var that = this;
    if(comID1==''){
      wx.showToast({
        title: '社区ID为空',
        image: '../../image/close.png',
        duration: 2000
      })
    }
    else{
      that.setData({
        comID: comID1
      });
      wx.showLoading({
        title: '查找中...',
      })
      //查找数据库是否有这个id
      console.log("comid=" + that.data.comID)
      const db = wx.cloud.database();
      db.collection('Community').where({
        comID: that.data.comID
      }).get({
        success: function(res) {
          console.log("acc")
          console.log(res);
          wx.hideLoading();
          if (res.data.length != 0) {
            that.setData({
              user_managecomid: res.data[0]._id,
              manageComOpenid: res.data[0]._openid,
            })
            that.JumpToManager();
            that.Field();
          } else {
            wx.hideLoading();
            wx.showToast({
              title: '查找失败',
              image: '../../image/close.png',
              duration: 1800
            })
          }
        },
        fail: function(res) {
          console.log(res)
          wx.hideLoading();
          wx.showToast({
            title: '查找失败',
            image: '../../image/close.png',
            duration: 1800
          })
        }
      })
    }
  },
  JumpToManager: function() {
    var that = this;
    //查找数据库是否有这个id
    const db = wx.cloud.database();
    //再查找user
    db.collection('User').where({
      //用户的openid查找user内的值
      _openid: that.data.userOpenid
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
            _openid: that.data.userOpenid
          }).update({
            data: {
              manageComOpenid: that.data.user_managecomid
            }
          })
          wx.redirectTo({
            url: '../manager?manageComOpenid=' + that.data.user_managecomid,
          })
          that.Field();
        } else{
          console.log('ComOpenId不为空')
          db.collection('User').where({
            _openid: that.data.userOpenid
          }).update({
            data: {
              manageComOpenid: that.data.user_managecomid
            }
          })
          wx.redirectTo({
            url: '../manager?manageComOpenid=' + that.data.user_managecomid,
          })
          that.Field();
        }
      },
      fail: function(res) {
        console.log("查找失败")
        wx.showToast({
          title: '查找失败',
          image: '../../image/close.png',
          duration: 1800
        })
      }
    })
  },
  Field: function(){
    var field = that.data._id; //当前页面选择的内容
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 3]; //获取上一个页面
    prevPage.setData({ //修改上一个页面的变量
      userManageComOpenid: that.data.user_managecomid,
      userOpenid: that.data.userOpenid
    })
    wx.navigateBack({
      url: '../index/index',
    })
  }
})