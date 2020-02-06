const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  var map = {}
  var userInfo = await db.collection('User').where({
    _openid: event.userOpenid // 填入当前用户 openid
  }).get()
  if(!userInfo.data[0]){
    try {
      await db.collection('User').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _openid: event.userOpenid,
          manageComOpenid: "",
          perInfo: {},
          records: []
        }
      })
      map = {
        userPerInfo: {},
        userManageComOpenid: ""
      }
    } catch (e) {
      console.error(e)
    }
  }
  else {
    map = {
      userPerInfo: userInfo.data[0].perInfo,
      userManageComOpenid: userInfo.data[0].manageComOpenid
    }
  }
  return map
}