function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("util.js"));

var t = e(require("md5")), a = {
    apiURL: "https://www.lovezhihu.com/mini/zs/"
}, r = {
    Soulmates: "soulmates",
    SearchSoulmates: "/search/soulmates",
    Includes: "includes"
}, s = {
    request: function(e, t) {
        wx.request({
            url: this.requestUrl(e),
            header: t.header || {},
            method: t.method || "GET",
            data: this.authURLParams(t.data || {}),
            dataType: "json",
            success: function(e) {
                e.data.hasOwnProperty("code") && "apiAuth:fail" == e.data.code ? !t.fail || t.fail(e.data.errMsg) : e.data.hasOwnProperty("code") && "userAuth:fail" == e.data.code ? (wx.removeStorageSync("cgSid"), 
                wx.removeStorageSync("expireTime"), wx.removeStorageSync("userInfo"), !t.fail || t.fail(e.data.errMsg)) : e.data.hasOwnProperty("code") ? !t.success || t.success(e.data) : !t.fail || t.fail(e.data);
            },
            fail: function(e) {
                !t.fail || t.fail(e.errMsg);
            },
            complete: t.complete || null
        });
    },
    requestUrl: function(e) {
        if (r.hasOwnProperty(e)) return "" + a.apiURL + r[e];
    },
    requestUrlParam: function(e, t) {
        var s = "";
        return r.hasOwnProperty(e) && (s = "" + a.apiURL + r[e]), t && (s += "?" + Utils.urlDatatoString(this.authURLParams(t))), 
        s;
    },
    authURLParams: function(e) {
        return a.platform || (a.platform = wx.getStorageSync("platform")), a.cgSid || (a.cgSid = wx.getStorageSync("cgSid")), 
        delete e.sign, e.spId = a.spId, e.platform = a.platform || "phone:unknow", a.cgSid && (e.cgSid = a.cgSid), 
        e.sign = this._getSign(e), e;
    },
    _getSign: function(e) {
        e = Utils.sortObj(e);
        var r = Utils.urlDatatoString(e);
        return r += a.spKey, (0, t.default)(r);
    }
};

module.exports = s;