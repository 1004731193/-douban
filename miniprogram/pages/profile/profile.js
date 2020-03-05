// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    imgUrl:"",
  },
  getUser3(e){
    //功能  获取当前登录用户信息
    // console.log(e)
    // 1.显示授权确认框e
    // 2.用于同义获取用户头像;昵称
    // 3.赋值nickName;imgUrl
    var n = e.detail.userInfo.nickName;
    var u = e.detail.userInfo.avatarUrl;
    this.setData({
      nickName:n,
      imgUrl:u
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})