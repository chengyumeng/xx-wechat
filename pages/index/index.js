// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    visible: false,
    motto: '他从你们的同类中为你们创造配偶，以便你们依恋她们，并且使你们互相爱悦，互相怜恤。对于能思维的民众，此中确有许多迹象。'
  },
  onShareAppMessage: function () {
    return {
      title:'我们已经在一起' + this.data.date.dayC + '天啦！',
      path: '/pages/index',
    }
  },
  onShareTimeline: function () {
    return {
      title:'我们已经在一起' + this.data.date.dayC + '天啦！',
    }
  },
  onLoad: function () {
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
})
