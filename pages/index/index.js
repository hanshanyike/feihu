function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var e = a(require("../../utils/util.js")), t = a(require("../../utils/md5")), n = a(require("../../utils/config.js")), i = null, o = null, u = (getApp(), 
1);

Page({
    data: {
        bannerImage: null,
        inputValue: "",
        focus: !1,
        adNums: null,
        adTop: null,
        adCenter: null,
        adChaping: null,
        adVideo: null,
        fuzhilianjie: "",
        shanghai: "",
        answer_id: 0,
        inputValueArr: ""
    },
    onLoad: function(a) {
        wx.showLoading({
            title: ""
        }), this.getSoulmates(1, 1);
    },
    onPullDownRefresh: function() {
        u = 1, this.getSoulmates(1, u);
    },
    onReachBottom: function() {
        u++, this.getSoulmates(2, u);
    },
    /*
    显示页面
    */
    getSoulmates: function(a, e) {
        var i = this, o = Date.parse(new Date());
        o /= 1e3;
        var u = {};
        u.sign = (0, t.default)(o + n.default.AppSignKey), u.timestamp = o, u.page = e, 
        u.keyword = this.data.inputValue, u.version = n.default.AppVersion, console.log(u), 
        1 == a && wx.showLoading({
            title: ""
        }), wx.request({
            url: n.default.BaseUrlMini + "index",
            data: u,
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var t = e.data.data;
                if (i.setData({
                    shanghai: e.data.shanghai,
                    fuzhilianjie: e.data.fuzhilianjie
                }), wx.setNavigationBarTitle({
                    title:"知乎者也"
                }), 1 == a) {
                    if (wx.pageScrollTo({
                        scrollTop: 0
                    }), t && t.length) {
                        var n = i.data.inputValue.trim().split(" ");
                        i.setData({
                            inputValueArr: n
                        }), t = i.getvenueNameArr(t), i.setData({
                            soulmates: t,
                            adNums: e.data.adNums ? e.data.adNums : 0,
                            adTop: e.data.adTop,
                            adCenter: e.data.adCenter,
                            adChaping: e.data.adChaping,
                            adVideo: e.data.adVideo,
                            bannerImage: e.data.bannerImage
                        });
                    }
                    setTimeout(function() {
                        wx.hideLoading();
                    }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                } else {
                    if (!t || !t.length) return wx.hideLoading(), wx.showToast({
                        title: "没有更多了",
                        icon: "none"
                    }), !1;
                    t = i.getvenueNameArr(t);
                    var o = i.data.soulmates;
                    o = o.concat(t), i.setData({
                        adChaping: e.data.adChaping,
                        adVideo: e.data.adVideo,
                        soulmates: o
                    });
                }
            }
        });
    },
    searchFocus: function(a) {
        this.setData({
            focus: !0
        });
    },
    searchInput: function(a) {
        this.setData({
            inputValue: a.detail.value
        });
    },
    searchKeyword: function(a) {
        u = 1, wx.showNavigationBarLoading(), this.getSoulmates(1, u);
    },
    searchCancel: function(a) {
        this.setData({
            focus: !1,
            inputValue: ""
        }), u = 1, wx.showNavigationBarLoading(), this.getSoulmates(1, u);
    },
    goAnswer: function(a) {
        var e = a.currentTarget.dataset.index, t = this, n = t.data.soulmates[e];
        t.setData({
            answer_id: n.answer_id
        }), "目的地" == this.data.shanghai ? wx.navigateTo({
            url: "/pages/detail/index?keyId=" + n.id + "&inputValue=" + this.data.inputValue
        }) : 1 == n.type && 0 == this.data.fuzhilianjie.length ? 1 == this.data.adChaping ? o ? o.show().catch(function(a) {
            t.getZhihu(n.answer_id), console.error(a);
        }) : t.getZhihu(n.answer_id) : 1 == this.data.adVideo && i ? i.show().catch(function() {
            t.getZhihu(n.answer_id);
        }) : t.getZhihu(n.answer_id) : wx.navigateTo({
            url: "/pages/detail/index?keyId=" + n.id + "&inputValue=" + this.data.inputValue
        });
    },
    goCopy: function(a) {
        var e = a.currentTarget.dataset.url;
        wx.setClipboardData({
            data: e,
            success: function(a) {
                wx.showToast({
                    icon: "none",
                    title: "链接已复制"
                });
            }
        });
    },
    onSwiperTap: function(a) {
        var e = a.target.dataset.index, t = this.data.bannerImage[e];
        wx.navigateTo({
            url: "/pages/detail/index?url=" + t.url
        });
    },
    getInf: function(a, e) {
        return a.toString().replace(new RegExp("" + e, "g"), "%%" + e + "%%").split("%%");
    },
    getZhihu: function(a) {
        wx.navigateToMiniProgram({
            appId: "wxeb39b10e39bf6b54",
            path: "zhihu/answer?id=" + a,
            success: function(a) {
                console.log(a);
            }
        });
    },
    getvenueNameArr: function(a) {
        var t = this, n = t.data.inputValueArr;
        return a.map(function(a) {
            if (t.data.inputValue.trim().length) {
                if (n.length < 2) a.venueName = t.getInf(a.excerpt, t.data.inputValue.trim()); else for (var i = 0; i < n.length; i++) if (0 == i) a.venueName = t.getInf(a.excerpt, n[i]); else {
                    for (var o = [], u = 0; u < a.venueName.length; u++) o = o.concat(t.getInf(a.venueName[u], n[i]));
                    a.venueName = o;
                }
                for (var d = a.venueName, s = [], r = 0; r < d.length; r++) {
                    for (var l = 0, h = 0; h < n.length; h++) if (d[r] == n[h]) {
                        l = 1;
                        break;
                    }
                    s[r] = 1 == l ? {
                        text: d[r],
                        type: 1
                    } : {
                        text: d[r],
                        type: 0
                    };
                }
                a.venueName = s;
            }
            a.updatedAtStr = e.default.timeAgo(a.updated_time);
        }), a;
    }
});