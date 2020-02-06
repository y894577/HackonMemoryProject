const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  console.log("【uploadRecord】【event参数】" ,event,"【end】")
  //向Records集合添加记录
  var res = {};
  try {
    res =  await db.collection('Records').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        passTel: event.tel,
        passTime: event.time,
        passerDestination: event.destination,
        passerName: event.name,
      }
    })
    console.log(res)
  } catch (e) {
    console.error(e)
  }
  console.log("【uploadRecord】【添加reord记录返回值】", res, "【end】")

  //向User集合添加记录
  //先获取记录的id
  var userInfo = await db.collection('User').where({
    _openid: event.userOpenid // 填入当前用户 openid
  }).get()
  console.log("【uploadRecord】【user的信息】", userInfo, "【end】")

  var userid = userInfo.data[0]._id
  //添加记录
  db.collection('User').doc(userid).update({
    data: {
      records: _.unshift(res._id)
    }
  })

  //向Community集合添加记录
      //先获取记录的id
  var comInfo = await db.collection('Community').where({
    _id: event.comOpenid // 填入当前用户 openid
  }).get()
  console.log("【uploadRecord】【com的信息】", comInfo, "【end】")

  var comid = comInfo.data[0]._id
      //添加记录
  if(event.flag == 1){
    db.collection('Community').doc(comid).update({
      data: {
        records: _.unshift(res._id),
        resident: _.inc(1)

      }
    })
  }
  else if(event.flag == 2){
    db.collection('Community').doc(comid).update({
      data: {
        records: _.unshift(res._id),
        visitor: _.inc(1)
      }
    })
  }
  else{
    db.collection('Community').doc(comid).update({
      data: {
        records: _.unshift(res._id)
      }
    })
  }
  

  

}