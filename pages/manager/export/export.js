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
      fileID: this.data.fileID,  
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
          image: '../../image/close.png',
          duration: 1800
        })
      }
    })
  },
  


  submitForm:function(e){
    var that = this;
    let val= e.detail.value
    if(val.email=='')
    {
      wx.showToast({
        title: '邮箱地址为空',
        image: '../../image/close.png',
        duration: 2000
      })
    }
    else{
      let email =val.email
      let checkedNum=this.checkEmail(email)
      if(checkedNum){
        wx.showModal({
          title: '提示',
          content: '请仔细检查以下邮箱是否正确：\n'+email,
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定')
              wx.showLoading({
                title: '发送中...',
              })
              wx.cloud.callFunction({
                name:"sendEmail",
                data:{
                    email:val.email,
                    html:that.data.FileURL
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
                    image: '../../image/close.png',
                    duration: 1800
                  })
                  console.log("发送失败",res)
                }
              })
            } else {//这里是点击了取消以后
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },
  // 邮箱验证部分  
  checkEmail: function (email) {
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
      return true
    } else {
    wx.showToast({
      title: '请填写正确邮箱',
    })
    return false
    }
  },
  getExcel(){
    var that=this
    wx.showLoading({
      title: '生成excel文件中...',
    })
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
        wx.hideLoading();
        wx.showToast({
          title: '成功生成excel',
          icon: 'success',
          duration: 1800
        })
        console.log('fileID:',that.data.fileID,',FileURL:',that.data.FileURL)
      },
      fail: err => {
        wx.hideLoading();
        console.log('生成excel文件失败',err)
        wx.showToast({
          title: '生成失败',
          image: '../../image/close.png',
          duration: 1800
        })
      }
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
