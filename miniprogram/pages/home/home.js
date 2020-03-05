// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //1.添加属性list  保存电影列表
    list:[],
    //2.添加属性start  电影列表开始记录数据0
    start:0,
    //3.添加属性count  电影列表一页行数
    count:20,
  },
  //10.添加函数jumpcomment  跳转详情页
  jumpComment(event){
    //1.为button 添加一个自定义属性  data-id  电影id
    //2.为button 添加点击事件 ,调用jumpcomment
    //3.在函数内添加参数event
    //4.依据参数event 获取自定义属性id
    var id = event.target.dataset.id;
    console.log(id)
    //5.创建跳转url  并且绑定传参数id
    var path = "/pages/comment/comment?id="+id;
    //6.跳转详情组件  删除并且跳转
    // wx.redirectTo({
    //   url: path,
    // })
    //保留并且跳转
    wx.navigateTo({
      url: path,
    })

  },
  //4.创建通用函数 loadMore 加载电影列表
  loadMore(){
    //5.调用云函数web1908ddfind
    wx.cloud.callFunction({
      name:"web1908ddfind",
      data:{
      //6.参数start count
        start:this.data.list.length,  //起始页数
        count:this.data.count  //一页行数
      }
    })
    .then(res => {
      //json 解析
      var rows = JSON.parse(res.result)
      // console.log(rows.subjects);
      //7.接收云函数返回结果
      //8.保存list
      // this.setData({list:rows.subjects})
      //8.获取新的电影列表
      var rows1 = rows.subjects;
      //9.追加到现有的电影列表中 concat
      rows = this.data.list.concat(rows1)
      //10.保存list
      this.setData({list:rows})
    })
    .catch(err => {console.log(err)})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})