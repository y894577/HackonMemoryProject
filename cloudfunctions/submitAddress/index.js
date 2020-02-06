const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  console.log("【submitAddress】【evnet参数】",event,"【end】")
  var flag = event.flag
  var info = await db.collection('User').where({
    _openid: event.userOpenid
  }).get()
  console.log("【submitAddress】【info个人信息】", info.data,info.data[0],info.data[0]._id,"【end】")
  if(flag){               //个人地址记录
  //先更新个人信息
    db.collection('User').doc(info.data[0]._id).update({
      data: {
        perInfo: {
          addressName: event.addressName,
          addressOpenid: event.comOpenid
        }
      }
    })

    //再添加登记记录
    const res = await cloud.callFunction({
      // 要调用的云函数名称
      name: 'uploadRecord',
      // 传递给云函数的参数
      data: {
        tel: info.data[0].perInfo.tel,
        time: event.time,
        destination: event.addressName,
        name: info.data[0].perInfo.name,
        comOpenid: event.comOpenid,
        userOpenid: event.userOpenid,
        flag: 2
      }
    })
  }
  else{                   //非个人住址
    //直接添加记录
    const res = await cloud.callFunction({
      // 要调用的云函数名称
      name: 'uploadRecord',
      // 传递给云函数的参数
      data: {
        tel: info.data[0].perInfo.tel,
        time: event.time,
        destination: event.addressName,
        name: info.data[0].perInfo.name,
        comOpenid: event.comOpenid,
        userOpenid: event.userOpenid,
        flag: 1
      }
    })
  }
}