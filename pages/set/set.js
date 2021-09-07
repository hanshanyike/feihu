// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:null,
    mailaddress:null,
    address:null,
    hobby:null,
    read_reminder_show: !0
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

  },
  formSubmit: function(t) {
    var a = t.detail.value, o = a.phone, s = a.mailaddress, i = a.address, d = a.hobby;
    wx.request({
      url: 'https://mpdfxjtu.top/addinfo ', //仅为示例，并非真实的接口地址
      data: {
        'phone': o,
        'mailaddress': s,
        'address':i,
        'hobby':d
      },
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
      }
    })
    
    wx.switchTab({
      url: '../index2/index2',
    });
  }
})