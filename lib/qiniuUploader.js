!function() {
    function n(n) {
        u = {
            qiniuUploadURL: "",
            qiniuImageURLPrefix: "",
            qiniuUploadToken: "",
            qiniuUploadTokenURL: "",
            qiniuUploadTokenFunction: null
        }, o(n);
    }
    function o(n) {
        n.uploadURL ? u.qiniuUploadURL = n.uploadURL : console.error("qiniu uploader need uploadURL"), 
        n.uptoken ? u.qiniuUploadToken = n.uptoken : n.uptokenURL ? u.qiniuUploadTokenURL = n.uptokenURL : n.uptokenFunc && (u.qiniuUploadTokenFunction = n.uptokenFunc), 
        n.domain && (u.qiniuImageURLPrefix = n.domain);
    }
    function i(n, o, i, e) {
        var l = u.qiniuUploadURL, a = n.split("//")[1];
        e && e.key && (a = e.key);
        var p = {
            token: u.qiniuUploadToken,
            key: a
        };
        wx.uploadFile({
            url: l,
            filePath: n,
            name: "file",
            formData: p,
            success: function(n) {
                var i = n.data, e = JSON.parse(i), l = u.qiniuImageURLPrefix + e.key;
                e.imageURL = l, console.log(e), o(e);
            },
            fail: function(n) {
                console.log(n), i(n);
            }
        });
    }
    function e(n) {
        wx.request({
            url: u.qiniuUploadTokenURL,
            success: function(o) {
                var i = o.data.uptoken;
                u.qiniuUploadToken = i, n && n();
            },
            fail: function(n) {
                console.log(n);
            }
        });
    }
    var u = {
        qiniuUploadURL: "",
        qiniuImageURLPrefix: "",
        qiniuUploadToken: "",
        qiniuUploadTokenURL: "",
        qiniuUploadTokenFunction: null
    };
    module.exports = {
        init: n,
        upload: function(o, l, a, p) {
            if (null != o) if (p && n(p), u.qiniuUploadToken) i(o, l, a, p); else if (u.qiniuUploadTokenURL) e(function() {
                i(o, l, a, p);
            }); else {
                if (!u.qiniuUploadTokenFunction) return void console.error("qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]");
                u.qiniuUploadToken = u.qiniuUploadTokenFunction();
            } else console.error("qiniu uploader need filePath to upload");
        }
    };
}();