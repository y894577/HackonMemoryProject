// 云函数入口文件
const cloud = require('wx-server-sdk')
const xlsx = require('node-xlsx');
cloud.init()
const db = cloud.database()
const User = db.collection('User')
const Records = db.collection('Records')
const Community = db.collection('Community')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var userInfo = await db.collection('User').where({
    _openid: event.userInfo.openId // 填入当前用户 openid
  }).get()
  manageComOpenid = userInfo.data[0].manageComOpenid
  comInfo = await Community.doc(manageComOpenid).get()
  records = comInfo.data.records
  var recordsList = []
  for (id in records) {
    r = await Records.doc(records[id]).get()
    recordsList.push(r.data)
  }


  let dataCVS = comInfo.data.comName + '历史数据.xlsx'

  let alldata=[]
  let row = ['时间','姓名','手机号','目的地','体温']
  alldata.push(row)
  
  for(let key in recordsList){
    let arr = [];
    arr.push(recordsList[key].passTime)
    arr.push(recordsList[key].passerName)
    arr.push(recordsList[key].passerTel)
    arr.push(recordsList[key].passerDestination)
    arr.push(recordsList[key].temp)
    alldata.push(arr)
  }

  var buffer=await xlsx.build([{
    name:"one",
    data:alldata
  }])

  var result=await cloud.uploadFile({
    cloudPath:dataCVS,
    fileContent:buffer,
  })
  fileID=result.fileID
  const fileList = [fileID]
  const result2 = await cloud.getTempFileURL({
    fileList: fileList,
  })

  return {
    event,
    fileurl:result2.fileList,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}