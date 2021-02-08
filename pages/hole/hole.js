// pages/hole/hole.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNumber: 0,
    stories: [
    ],
  },

  bindViewCreateHole() {
    wx.navigateTo({
      url: './create-hole/create'
    })
  },
  bindBackToIndex() {
    wx.redirectTo({
      url: '../index/index'
    })
  },

  loadStories() {
    const self= this
    const db = wx.cloud.database()
    db.collection('story').orderBy('createTime', 'desc').skip(self.data.pageNumber * 20).limit(20).get({
    success: res => {
      res.data.forEach((e)=>{
        self.data.stories.push(e)
      })
      self.setData({
        stories: self.data.stories,
      })
    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
    }
  }) 
  console.log(self.pageNumber) 
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
    this.loadStories()
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
    this.setData({
      pageNumber: 0,
    })
    this.loadStories()
    console.log("test")

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNumber: this.data.pageNumber+1,
    })
    this.loadStories()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:'我发现一条有趣的树洞',
    }

  }
})