import Toast from "../../../../miniprogram_npm/vant-weapp/toast/toast"

const app = getApp()

Page({
	data: {
		position: null,
		shop: {},
		cuser: {},
		good: {
			page: 1,
			query: '',
			data: [],
			isLoadAll: false
		}
	},
	onLoad(option) {
		wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      this.setData({
				position: app.globalData.position,
				shop: app.globalData.shop,
		  })
			this.initCuser()
			this.index()
      wx.hideLoading()
    }, 1000)
	},
	onShow() {
		
	},
	/*-- 初始化用户 --*/
	initCuser(e) {
		let _this = this
		wx.getStorage({
			key: 'cuser',
			success (res) {
				_this.setData({
					cuser: res.data
				})
			}
		})
	},
	onSearChange(e) {
		this.setData({
			'good.query': e.detail
		})
	},
	/*-- 页面跳转 --*/
	go(e) {
		wx.navigateTo({
			url: e.currentTarget.dataset.url
		})
	},
	
	index(e) {
		let _this = this
		wx.request({
			url: `http://192.168.1.70:8080/api/groupNow`,
			data: {
				goodName: this.data.good.query,
				page: this.data.good.page,
				pageNum: 10,
				storeId: this.data.shop.id
			},
			success(res) {
				if(res.data.data.length == 0) {
					_this.setData({
						'good.isLoadAll': true
					})
				}else{
					for(let item of res.data.data) {
						item.leftCount = Math.ceil((new Date(item.gendTime) - new Date()) / 86400000)
					}
					_this.setData({
						'good.data': _this.data.good.data.concat(res.data.data)
					})
				}
			}
		})
	},
	
	onSearch(e) {
		this.setData({
			'good.data': [],
			'good.page': 1
		})
		this.index()
	},
	
	/*-- 上拉刷新 --*/
	refresh(e) {
		this.setData({
			'good.data': [],
			'good.page': 1
		})
		this.index()
	},
	
	/*-- 下拉加载更多商品 --*/
	loadMore(e) {
		if(this.data.isLoadAll) {
		}else{
			this.setData({
				'good.page': this.data.good.page + 1
			})
			this.index()
		}
	},
})