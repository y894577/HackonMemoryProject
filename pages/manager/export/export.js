// pages/manager/export/export.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileID:'',
    FileURL:'',
    
  },
  fileDownload:function(){
    wx.showLoading({
      title: '下载中...',
    })
    wx.cloud.downloadFile({  
      fileID: fileID,  
      success: res => {    
        // get temp file path    
        console.log(res.tempFilePath)  
        const tempFilePath = res.tempFilePath
        wx.saveFile({
          tempFilePath: tempFilePath,
          //filePath: wx.env.USER_DATA_PATH + '/11',
          success (res) {
            const savedFilePath = res.savedFilePath
            console.log(res.savedFilePath)
            wx.setStorageSync('1', savedFilePath)
            wx.hideLoading();
            wx.showToast({
              title: '文件下载成功',
              icon: 'success',
              duration: 2000         
            })
            wx.openDocument({//打开
              filePath: savedFilePath,
              success: function (res) {}
            })
          }
        })
      },  
      fail: err => {    
        // handle error
        console.log('失败')
        wx.showToast({
          title: '文件下载失败',
        })
      }
    })
  },
  

  // 邮箱验证部分  
  inputemail:function (e) {
    let email = e.detail.value
    let checkedNum=this.checkEmail(email)
    if(checkedNum){
      wx.showLoading({
        title: '发送中...',
      })
      wx.cloud.callFunction({
        name:"sendEmail",
        data:{
            email:e.detail.value
        },
        success(res){
          console.log("发送成功",res),
          wx.hideLoading();
          wx.showToast({
            title: '发送成功',
          })
        },
        fail(res){
          wx.hideLoading();
          wx.showToast({
            title: '发送失败',
          })
          console.log("发送失败",res)
        }
      })
    }
  },
  checkEmail: function (email) {
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
      return true
    } else {
    wx.showToast({
      title: '请填写正确的邮箱号',
    })
    return false
    }
  },
  getExcel(){
    var that=this
    wx.cloud.callFunction({
      name: 'getExcel',
      data: {
        isUser: false
      },
      success: function (res) {
        console.log(res.result)
        that.setData({
          fileID:res.result.fileurl[0].fileID,
          FileURL: res.result.fileurl[0].tempFileURL
        })
      },
      fail: console.error
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExcel()
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

  }
})
