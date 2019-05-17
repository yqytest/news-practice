// pages/article/article.js
//获取应用实例
const app = getApp();
//引入工具类
const utils = require("../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏组件所需的参数
    navbarData: {
      //标题
      title: '快读·资讯',
      //是否首页
      isIndex: false,
      //组件的高度，给页面第一个元素定义margin用
      height: app.globalData.height * 2 + 20
    },

    //文章详情信息
    id: 0,
    title: '',
    date: '',
    firstImage: '',
    readCount: 0,
    source: '',
    content: []
  },
  /**
   * 下拉刷新事件监听
   */
  onPullDownRefresh() {
    this.getDetail(this.data.id, () => {
      console.log("已刷新!")
      //调用完成后停止下拉刷新事件
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置状态栏颜色 (不在这里弄，使用自定义状态栏)
    // wx.setNavigationBarColor({
    //   frontColor: '#000000',
    //   backgroundColor: '#ffffff'
    // });
    
    //id从上一个页面传参
    this.setData({
      id: options.id
    });
    this.getDetail(options.id);
  },
  /**
   * 获取文章内容
   */
  getDetail(id, callback){
    //调用新闻详情API
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail', // 接口地址
      data: {
        id: id
      },
      success: res => {
        let result = res.data.result;
        console.log(result);
        //处理时间
        var time = utils.getTimeStr(result.date);
        this.setData({
          id: result.id,
          title: result.title,
          date: time,
          firstImage: result.firstImage,
          readCount: '阅读：' + result.readCount,
          source: result.source,
          content: result.content
        });
      },
      complete: () => {
        //调用回调函数
        callback && callback();
      }
    });
  }
})