// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//2.第三方入口
const rp = require("request-promise")
// 云函数入口函数
exports.main = async (event, context) => {
  //云函数上下对象
  const wxContext = cloud.getWXContext()
  //wxContext.OPENID  用户钥匙
  //wxContext.APPID   微信钥匙
  //wxContext.UNIONID  微信平台上当前用户唯一ID 
  //3.创建变量url  请求豆瓣
  var url = `http://api.douban.com/v2/movie/subject/${event.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  //4.向豆瓣网发送请求  ,并且将结果再次返回
  return rp(url)
  .then(res => { 
    return res; })
  .catch(err => {console.log(err)})
}