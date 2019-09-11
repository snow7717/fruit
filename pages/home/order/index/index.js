Page({
	data: {
		active: 0,
		cuser: {},
		order0: {
			data: [],
			isLoadAll: false,
			page: 1
		},
		order1: {
			data: [],
			isLoadAll: false,
			page: 1
		},
		order2: {
			data: [],
			isLoadAll: false,
			page: 1
		},
		windowH: 0
	},
	onLoad(option) {
		this.initSystem()
		this.initCuser()
	},
	/*-- 获取设备信息（屏幕高度等） --*/
	initSystem(e) {
		let _this = this
		wx.getSystemInfo({
			success (res) {
				_this.setData({
					windowH: res.windowHeight
				})
			}
		})
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
				_this.index0()
			}
		})
	},
	/*-- 获取及时达订单列表 --*/
	index0(e) {
		let _this = this
		wx.request({
			url: 'http://192.168.1.103:8080/api/order/list',
			data: {
				userId: this.data.cuser.userId,
				pageNum: this.data.order0.page,
				pageSize: 10
			},
			success(res) {
				for(let item of res.data.data) {
					switch(item.status) {
						case '1':
							item.status = '待支付'
							break
						case '2':
							item.status = '待配送'
							break
						case '3':
							item.status = '待自提'
							break
						case '4':
							item.status = '配送中'
							break
						case '5':
							item.status = '已取消'
							break
						case '6':
							item.status = '已完成'
							break
						case '7':
							item.status = '退款中'
							break
						case '8':
							item.status = '已退款'
							break
					}
				}
				_this.setData({
					'order0.data': _this.data.order0.data.concat(res.data.data)
				})
				console.log(res.data.data)
			}
		})
	},
	/*-- 上拉刷新 --*/
	refresh(e) {
		console.log('上拉了')
		/*this.setData({
			goods: [],
			page: 1
		})
		this.index()*/
	},
	
	/*-- 下拉加载更多商品 --*/
	loadMore(e) {
		let id = e.currentTarget.dataset.id
		if(this.data[`order${id}`].isLoadAll){
		}else{
			switch(id) {
				case '0':
					this.setData({
					  'order0.page': this.data[`order${id}`].page + 1
				  })
					break
				case '1':
					this.setData({
					  'order0.page': this.data[`order${id}`].page + 1
				  })
					break
				case '2':
					this.setData({
					  'order0.page': this.data[`order${id}`].page + 1
				  })
					break	
			}
			this[`index${id}`]()
		}
	},
	onChange(e) {
		this.setData({
			active: e.detail.index
		})
  }
})