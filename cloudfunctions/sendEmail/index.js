// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
//引入发送邮件的类库
var nodemailer = require('nodemailer')
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.qq.com', //网易163邮箱 smtp.163.com
  port: 465, //网易邮箱端口 25
  auth: {
    user: '', //邮箱账号
    pass: '' //邮箱的授权码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async(event, context) => {
  var htmltext =
    '<p>您好，您的社区的所有数据已经导出</p> <p>请点击下方链接下载excel文件</p> '+event.html
  // 创建一个邮件对象
  var mail = {
    // 发件人
    from: '来自记疫团队',
    // 主题
    subject: '来自记疫团队的社区数据文件',
    // 收件人
    to: event.email,
    // 邮件内容，text或者html格式
    html: htmltext //可以是链接，也可以是验证码
  };

  let res = await transporter.sendMail(mail);
  return res;
}