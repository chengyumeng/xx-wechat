// pages/hole/create-hole/create.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    story: {
      message: "",
    }

  },
  bindinput(e) {
    this.setData({story: {
      message: e.detail.value
    }})
  },

  bindBackToHole: function() {
    wx.redirectTo({
      url: '../hole'
    })
  },
  bindCreateHole: function() {
    if (this.data.story.message.length == 0 || this.data.story.message.length > 140) {
      wx.showToast({
        icon: 'none',
        title: '树洞内容不合适',
      })
      return
    }
    const db = wx.cloud.database()
    const self = this
    db.collection('story').add({
      data: {
        story: self.data.story,
        userinfo: app.globalData.userInfo,
        createTime: new Date(),
      },
      success: res => {
        wx.showToast({
          title: '发表树洞成功',
        })
        self.bindBackToHole()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '发表树洞失败'
        })
      }
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
})