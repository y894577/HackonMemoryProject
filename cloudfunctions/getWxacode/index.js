// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')

cloud.init()
const db = cloud.database()
const User = db.collection('User')
const Community = db.collection('Community')
// 云函数入口函数
exports.main = async (event, context) => {
  // let getResponse = await got('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx91d0d3fbfd9f3f51&secret=49269c72a432e51aeb58fbbe14783117')
  // console.log(getResponse.body)
  // access_token=getResponse.body.access_token

  userInfo = await db.collection('User').where({
    _openid: event.userInfo.openId // 填入当前用户 openid
  }).get()
  comId = userInfo.data[0].manageComOpenid
  
  const wxContext = cloud.getWXContext()
  id='id='+event.id
  const result = await cloud.openapi.wxacode.get({
    path: 'pages/index/index?id=' + event.id,
  })
  filename = event.id+'.png'
  const upload = await cloud.uploadFile({
    cloudPath: filename,
    fileContent: result.buffer,
  })
  const fileID=[upload.fileID]
  const result2 = await cloud.getTempFileURL({
    fileList: fileID,
  })
  fileUrl = result2.fileList[0].tempFileURL
 
  await Community.doc(comId).update({
    data: {
      comQRcode:fileUrl
    },
    success: function (res) {
      console.log(res.data)
    }
  })
  return {
    event,
    fileUrl,
    comId,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}