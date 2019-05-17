//index.js
//获取应用实例
const app = getApp();
//引入工具类
const utils = require("../../utils/util.js");

Page({
  data: {
    // 导航栏组件所需的参数
    navbarData: {
      //标题
      title: '快读·资讯',
      //是否首页
      isIndex: true,
      //组件的高度，给页面第一个元素定义margin用
      height: app.globalData.height * 2 + 20,
    },
    
    //资讯类别
    category : [
      { name: "国内", code: "gn" },
      { name: "国际", code: "gj" },
      { name: "财经", code: "cj" },
      { name: "娱乐", code: "yl" },
      { name: "军事", code: "js" },
      { name: "体育", code: "ty" },
      { name: "其他", code: "other" }
    ],
    selectedCategory : 'gn',
    hotList : [],
    newsList: []
  },
  /**
   * 下拉刷新事件监听
   */
  onPullDownRefresh() {
    this.getNewsList(this.data.selectedCategory, () => {
      console.log("已刷新!")
      //调用完成后停止下拉刷新事件
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 加载页面
   */
  onLoad: function () {
    //设置状态栏颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#2795d4'
    });
    console.log(this.data.height);
    this.getNewsList(this.data.selectedCategory);
    //this.getWholeSiteImages();
  },
  /**
   * 获取新闻列表
   */
  getNewsList: function (type, callback){
    //调用新闻列表API
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', // 接口地址
      data: {
        type: type
      },
      success: res => {
        let result = res.data.result;
        console.log(result);
        //热门新闻
        var hotList = []; 
        //新闻列表
        var newsList = [];
        //循环取出，放进两个列表
        for (var i = 0; i < result.length; i++ ){
          var item = result[i];
          //处理时间 2019-03-15T04:09:11.000Z
          item.date = utils.getTimeStr(item.date);
          //没有图片的情况
          if (!item.firstImage){
            item.firstImage = '../../images/no-photo.png';
          }
          if(i==0){
            hotList.push(item);
          } else {
            newsList.push(item);
          }
        }
        //console.log("hotList.length=" + hotList.length + ", newsList.length=" + newsList.length);
        this.setData({
          hotList: hotList,
          newsList: newsList
        });
      },
      complete: () => {
        //调用回调函数
        callback && callback();
      }
    });
  },
  /**
   * 点击类别
   */
  onTapNewsCategory: function (e) {
    var type = e.currentTarget.id;
    console.log(type);
    this.setData({
      selectedCategory: type
    });
    this.getNewsList(type);
  },
  /**
   * 点击一个文章
   */
  onTapNewsArticle: function(e){
    var articleId = e.currentTarget.id;
    console.log(articleId);
    wx.navigateTo({
      url: '../article/article?id=' + articleId
    });
  },

  /**
   * 临时用
   * 作业要求里有一句话：详情界面... 如图片有图名及来源，则显示在图片下方
   * 我要先找出是哪个图片有图名及来源，否则连取值的key是什么都不清楚
   * 执行后的结论是：所有新闻的详情没有一张图片是有图名及来源的
   */
  /**
  getWholeSiteImages: function(){
    //先遍历类别
    var types = this.data.category;
    for(var h=0; h<types.length; h++){
      var _type = types[h].code;
      //调用新闻列表API
      wx.request({
        url: 'https://test-miniprogram.com/api/news/list', // 接口地址
        data: {
          type: _type
        },
        success: res => {
          let newsList = res.data.result;
          //循环取出
          for (var i = 0; i < newsList.length; i++) {
            var _id = newsList[i].id;
            //调用新闻详情API
            wx.request({
              url: 'https://test-miniprogram.com/api/news/detail', // 接口地址
              data: {
                id: _id
              },
              success: res => {
                let result = res.data.result;
                //再去遍历content数组
                var contents = result.content;
                for (var j = 0; j < contents.length; j++){
                  var cont = contents[j];
                  if(cont.type=='image'){
                    //把所有图片的对象转成字符串打印出来
                    console.log(JSON.stringify(cont));
                  }
                }
              }
            });
          }
        }
      });
    }
  } **/
})
