import { moment } from '../../../../utils/cndealtime'
const app = getApp()
Page({
    data : {
        maxDate: new Date().getTime(),
        minDate: new Date('1900-01-01').getTime(),
        select: false,
        current: '',
        valuecurrent: new Date().getTime(),
        avatar : '',
        Nickname : '',
        mobile : '' ,
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            } else if (type === 'day') {
                return `${value}日`;
            }
            return value;
        },
        level : ''
    },
    gotoHistory(){
        wx.navigateTo({
            url: "../history/index"

        })
    },
    chooseDate(){
        this.setData({
            select : true
        })
    },
    close(){
        this.setData({
            select: false
        })
    },
    confirm(e) {
        this.setData({
            select: false,
            current: moment(e.detail).format("YYYY-MM-DD"),
            valuecurrent: e.detail
        })
    },
    onShow(){
        this.getUserIndfo()
        this.setData({
            avatar: app.globalData.avatarUrl,
            Nickname: app.globalData.Nickname,
            mobile: app.globalData.mobile
        })
    },
    save(){
        wx.request({
            url: `${app.globalData.url}/api/member/updateBirthday?loginUid=${app.globalData.loginUid}&userId=${JSON.stringify(app.globalData.userId)}&birthday=${this.data.current}`,
            method : 'POST',
            // data: {
            //     loginUid: app.globalData.loginUid,
            //     userId: JSON.stringify(app.globalData.userId),
            //     birthday: this.data.current
            // },
            success(res) {
                wx.showToast({
                    title: res.data.message,
                    icon : 'success',
                    duration : 2000
                })
            }
        })
    },
    getUserIndfo(){
        var that = this;
        wx.request({
            url: `${app.globalData.url}/api/member/getUserInfo`,
            data: {
                loginUid: app.globalData.loginUid,
                userId: app.globalData.userId
            },
            success(res) {
                that.setData({
                    level: res.data.data.levelName,
                    current : res.data.data.birthday,
                    valuecurrent: new Date(res.data.data.birthday).getTime()
                })
            }
        })
    }
})