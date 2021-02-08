// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    likeCount: 1024,
    ready: true,
  },
  // 事件处理函数
  bindViewHole() {
    wx.navigateTo({
      url: '../hole/hole'
    })
  },
    /**
   * 用户点击右上角分享
   */
   onShareAppMessage: function () {
    return {
      title:'我们已经在一起' + this.data.date.dayC + '天啦！',
    }
  },
  onLike: function () {
    const db = wx.cloud.database()
    const self = this
    db.collection('like').add({
      data: {
        count: 1,
        userinfo: app.globalData.userInfo,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          likeCount: self.data.likeCount + 1,
        })
        wx.showToast({
          title: '点赞成功',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '点赞失败'
        })
      }
    })
  },
  onLoad: function () {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

    this.loadLikeInfo()

    var together = new Date();
    together.setFullYear(2016, 11, 16);
    together.setHours(22);
    together.setMinutes(45);
    together.setSeconds(2);
    together.setMilliseconds(0);
    
    var self = this;
    self.timeElapse(together);
    setInterval(function() {
        self.timeElapse(together);
    },1000)
},
loadLikeInfo() {
  const db = wx.cloud.database()
  db.collection('like').count({
    success: res => {
      this.setData({
        likeCount: res.total,
      })
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '穷得开不起树洞了o(╥﹏╥)o'
      })
      this.setData({
        ready: false,
      })
    }
  });
},
timeElapse(c) {
    let e = Date();
    let secondC = (Date.parse(e) - Date.parse(c)) / 1000;
    let dayC = Math.floor(secondC / (3600 * 24));
    secondC = secondC % (3600 * 24);

    let hourC = Math.floor(secondC / 3600);
    secondC = secondC % 3600;
    let minuteC = Math.floor(secondC / 60);
    secondC = secondC % 60;

    let h = '' + hourC;
    if (hourC < 10) {
      h = ('0' + hourC).slice(-2)
    }

    let m = '' + minuteC;
    if (minuteC < 10) {
      m = ('0' + minuteC)
    }

    let s = '' + secondC;

    if (secondC < 10) {
      s = ('0' + secondC).slice(-2)
    }
    this.setData({'date': {
        'dayC': dayC,
        'h': h,
        'm': m,
        's': s,
    }});
  }
    
})
