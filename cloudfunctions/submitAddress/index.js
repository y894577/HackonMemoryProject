const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  var flag = event.flag
  var userInfo =  await db.collection('user').where({
    _openid: event.userOpenid // 填入当前用户 openid
  }).get()
  if(flag){               //个人地址记录
  //先更新个人信息
    var info = await db.collection('User').where({
      _openid: event.userOpenid
    }).get()
    db.collection('User').doc(info.data[0]._id).update({
      data: {
        perInfo: {
          addressName: event.addressName,
          addressOpenid: event.comOpenid
        }
      }
    })
    //再添加登记记录
    try {
      return await db.collection('Records').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          passTel: userInfo.data[0].perInfo.tel,
          passTime: event.time,
          passerDestination: event.addressName,
          passerName: userInfo.data[0].perInfo.name
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
  else{                   //非个人住址
    //直接添加记录
    try {
      return await db.collection('Records').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          passTel: userInfo.data[0].perInfo.tel,
          passTime: event.time,
          passerDestination: event.addressName,
          passerName: userInfo.data[0].perInfo.name
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
}