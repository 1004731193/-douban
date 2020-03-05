 // pages/comment/comment.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //1.添加属性movieid：接收exam01传递来的id
    movieid: 0,     //接收home组件传过来的id
    info:[],    //接收info 电影详情信息
    val2:"",      //接收val2  接收电影评分
    val3:0,      //接收val3  电影评分
    images:[],    //接收预览 的图片
    fileIDs: [],    // 保存用户上传图片feilID的数组
  },
  selectImg(){
    //功能  选中图片并且预览图片
    // console.log(111)
    //1.在data 中添加属性  images:[]  此数组保存选中后监视的图片
    //2.选中多张图片  
      //数量 
      //图片类型   
      //来源   
      // 选中成功  将临时图片保存 images
      wx.chooseImage({ 
        count:9,  //数量
                // 原图      压缩图
        sizeType:["original","compressed"],
                  //相册     相机
        sourceType:["album","camera"],
        //选中成功回调
        success:(res)=>{
          //获取零时图片并且保存
          var list = res.tempFilePaths;
          // console.log(list)
          this.setData({images:list})
        },
      })
    //3. 在模板创建玄幻预览图片
  },
  submit(){
    // 功能：上传图片并且添加数据到云数据库中
    // console.log(2)
    // 功能一：上传图片至云存储
    // 1.显示数据库加载提示框
    wx.showLoading({
      title: '评论中···',
    })
    // 2.在data中添加属性fileIDS:[],保存id
    // 3.创建数据保存Promise对象 rows
    var rows = [];
    if(this.data.images.length == 0){
      wx.showToast({
        title: '请选择图片',
      })
      return;
    }
    // 4.创建循环遍历选中数组 images
    for(var i=0;i<this.data.images.length;i++){
      // console.log(1)
    // 5.创建promise完成上传一张图片
     rows.push( new Promise((resolve,reject)=>{
    //   // 5.1：获取当前上传图片名称
      var item = this.data.images[i]
       // 5.2：创建新文件名
        // 创建正则表达式拆分文件后缀
      var suffix = /\.\w+$/.exec(item)[0];
      // console.log(suffix)
        // 创建时间+随机数
      var newFile = new Date().getTime();
      newFile += Math.floor(Math.random()*9999);
        // 拼接新文件名
      newFile += suffix;
      // console.log(newFile);
      // 5.3：将文件上传云存储
        wx.cloud.uploadFile({
        // 新文件
          cloudPath:newFile,   //新文件名
        // 原文件
          filePath:item,   //原文件名[临时号文件]
        // res.fileID 上传成功图片路径
          success:(res)=>{   //上传成功
          // 将fileID保存data fileIDS
           this.data.fileIDs.push(res.fileID);
          //proimse  执行成功
            resolve();
            // console.log(6)
            // console.log(this.data.fileIDs)
          }
        })
        // resolve() 上传成功
      })) //push end
    }  // for end
    // 功能二：将图片id；评分、评论添加到云数据库
    // 6.1 在云开发控制面板中创建几个web1908movie
    // 6.2 等待所有rows 数组中 所有proimse  对象执行完毕
    Promise.all(rows).then(res=>{
        console.log(7)
      // 6.3 添加钩子函数,所有proimse 执行结束
      // 6.4 获取评分
      var v3 = this.data.val3;
      // 6.5 获取评论的留言内容
      var v2 = this.data.val2;
      // 6.6 获取图片的id
      var mid = this.data.fileIDs;
      console.log("评分:"+v3)
      console.log("评论:"+v2)
      console.log(mid)
      // 6.7 判断如果留言的内容为空,"什么都没留下.."
      if(!v2){v2 = "什么都没写..."}
      // 6.8 在文件开头comment.js  创建对象 db数据库对象
      // 6.9 添加条记录 [评分;评论;图片id]
        // 集合民称 web1908movie
        db.collection("web1908movie")
        .add({
          data:{
            content:v2,   //评分内容
            score:v3,    //评分
            fids:mid,   //文件id
            mid:this.data.movieid,   //mid 评论电影id
          }
        })
        .then(res=>{
          wx.hideLoading();
          wx.showToast({
            title: '评论发表成功..',
          })
        })
      // 6.10 添加成功
      // 6.11 影藏加载提示框;显示发表成功提示框
    })  //all   end
  },
  onChangeVal3(e){
    //功能  获取用户评分 并且保存
    //1.通过event 
    var  score = e.detail;
    //2.通过 event获取评分
    this.setData({ val3 : score});
    //3,保存评分e
    // console.log(this.data.val3)
  },
  onChangeVal2(e){
    // 功能  用户输入留言获取流言内容  并且保存val2
    //1.添加参数event
    //2.获取event 中用户输入留言
    var data =e.detail;
    //3.保存val2
    this.setData({val2:data})
    // console.log(this.data.val2)
  },
  loadMore() {
    // 功能：调用云函数
    // 1.调用云函数 web1908detail
    wx.cloud.callFunction({
      name: "web1908detail", //云函数名称
      data: { id: this.data.movieid },  //云函数参数
      success: (res) => {
        // console.log(res); //调用成功发返回结果
        // 1.2：将返回字符串结果转为js
        var obj = JSON.parse(res.result);
        // console.log(obj)
        // 1.3：在data中添加属性info 保存云函数结果
        // 1.4：保存
        this.setData({ info: obj });
        // console.log(this.data.info)
      }
    })
    // 2.在onload调用loadMore
    // 3.将云函数返回结果保存
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //2.接收exam01参数id
    // console.log(options)
    var id = options.id;
    //2.1:将接收id保存data属性中
    this.setData({ movieid: id })
    // console.log(id)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})