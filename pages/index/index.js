// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgDraw: {}, //绘制图片的大对象
    sharePath: '', //生成的分享图
    visible: false,
    motto: '他从你们的同类中为你们创造配偶，以便你们依恋她们，并且使你们互相爱悦，互相怜恤。对于能思维的民众，此中确有许多迹象。'
  },
    /**
   * 用户点击右上角分享
   */
   onShareAppMessage: function () {
    return {
      title:'我们已经在一起' + this.data.date.dayC + '天啦！',
    }
  },
  onShare: function () {
    this.drawPic();
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
  },
    handlePhotoSaved: function() {
      console.log(this.data.sharePath)
      this.savePhoto(this.data.sharePath)
    },
    handleClose: function() {
      this.setData({
        visible: false
      })
    },
    drawPic: function() {
      if (this.data.sharePath) { //如果已经绘制过了本地保存有图片不需要重新绘制
        this.setData({
          visible: true
        })
        this.triggerEvent('initData') 
        return
      }
      wx.showLoading({
        title: '生成中'
      })
      this.setData({
        imgDraw: {
          width: '750rpx',
          height: '1334rpx',
          background: 'https://686f-home-3g3doj805bee60c5-1304965424.tcb.qcloud.la/hung-pham-QNUpOnZRhLg-unsplash.jpg?sign=050e11ef6ce91581fb4eaec82511602d&t=1613833429',
          views: [
            {
              type: 'text',
              text: this.data.motto,
              css: {
                top: '62rpx',
                left: '32rpx',
                width: '688rpx',
                height: '420rpx',
                color: '#BE90D4',
                lineHeight:'30px',
                fontSize: '36rpx',
              },
            },
            {
              type: 'text',
              text: '胡杨与彩虹',
              css: {
                top: '332rpx',
                fontSize: '30rpx',
                left: '375rpx',
                align: 'center',
                color: '#BE90D4'
              }
            },
            {
              type: 'text',
              text: `相识于 2014-10-12，相爱于 2016-12-16，至今`,
              css: {
                top: '406rpx',
                left: '375rpx',
                align: 'center',
                fontSize: '28rpx',
                color: '#BE90D4',
              }
            },
            {
              type: 'text',
              text: this.data.date.dayC + '天',
              css: {
                top: '494rpx',
                left: '375rpx',
                align: 'center',
                fontWeight: 'bold',
                fontSize: '180rpx',
                color: '#FFF'
              }
            },
            {
              type: 'text',
              text: this.data.date.h + ' 小时 ' + this.data.date.m+ ' 分钟 ' + this.data.date.s + ' 秒 ',
              css: {
                top: '694rpx',
                left: '375rpx',
                align: 'center',
                fontWeight: 'bold',
                fontSize: '56rpx',
                color: '#FFF'
              }
            },

            {
              type: 'image',
              url: 'https://686f-home-3g3doj805bee60c5-1304965424.tcb.qcloud.la/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.jpg?sign=889372c89c0428133355fe08ba3d619b&t=1613833822',
              css: {
                top: '1044rpx',
                align: 'center',
                left: '374rpx',
                height: '278rpx'
              }
            }
          ]
        }
      })
    },
    onImgErr(e) {
      wx.hideLoading()
      wx.showToast({
        title: '生成分享图失败，请刷新页面重试'
      })
    },
    onImgOK(e) {
      wx.hideLoading()
      this.setData({
        sharePath: e.detail.path,
        visible: true,
      })
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent('initData') 
    },
    preventDefault: function() { },
    // 保存图片
    savePhoto: function(path) {
      wx.showLoading({
        title: '正在保存...',
        mask: true
      })
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success: (res) => {
          wx.showToast({
            title: '保存成功',
            icon: 'none'
          })
          setTimeout(() => {
            this.setData({
              visible: false
            })
          }, 300)
        },
        fail: (res) => {
          wx.getSetting({
            success: res => {
              let authSetting = res.authSetting
              if (!authSetting['scope.writePhotosAlbum']) {
                wx.showModal({
                title: '提示',
                content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',
                success(res) {
                  if (res.confirm) {
                    wx.openSetting()
                  }
                }
              })
              }
            }
          })
          setTimeout(() => {
            wx.hideLoading()
            this.setData({
              visible: false
            })
          }, 300)
        }
      })
    }
  },
    
)
