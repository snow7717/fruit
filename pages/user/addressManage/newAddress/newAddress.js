// page/user/addressManage/newAddress/newAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSel:true,
    icon:1
  },


  selSex:function(){
      if(this.data.isSel){
        this.setData({
         isSel:false
        })
      }else{
        this.setData({
          isSel: true
        })
      }
  },
  sel:function(e){
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;
    if (viewText == "公司"){
      this.setData({
        icon: 4
      })
    }
    else if (viewText == "父母家") {
      this.setData({
        icon: 3
      })
    }
    else if (viewText == "学校") {
      this.setData({
        icon: 2
      })
    }
    else if (viewText == "家") {
      this.setData({
        icon: 1
      })
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})