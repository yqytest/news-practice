//获取应用实例
const app = getApp();
//导航栏组件
Component({
  properties: {
    //由页面传递给组件
    navbarData: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    height: 0,
    navbarData: {
      isIndex: true
    }
  },
  attached: function () {
    // 定义导航栏的高度
    this.setData({
      height: app.globalData.height * 2 + 20
    })
  },
  methods: {
    // 返回上一页面
    backToPrev() {
      wx.navigateBack();
    }
  }

})