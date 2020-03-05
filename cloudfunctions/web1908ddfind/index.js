// 云函数入口文件
//1.创建云对象
const cloud = require('wx-server-sdk')
//2.初始化云对象
cloud.init()
//3.映入request
const rp = require("request-promise")
// 云函数入口函数
exports.main = async (event, context) => {
  ///4.创建变量url
  var url = `http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`;
  //5.向豆瓣发送ajax请求
  //6.返回豆瓣热门列表
  return rp(url)
  .then(res => {return res;})
  .catch(err => {console.log(err)})
}