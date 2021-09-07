function e(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

function t(e) {
    var t = "", r = 0;
    e = function(e) {
        var t, r, n, o;
        for (t = "", n = e.length, r = 0; r < n; r++) (o = e.charCodeAt(r)) >= 1 && o <= 127 ? t += e.charAt(r) : o > 2047 ? (t += String.fromCharCode(224 | o >> 12 & 15), 
        t += String.fromCharCode(128 | o >> 6 & 63), t += String.fromCharCode(128 | o >> 0 & 63)) : (t += String.fromCharCode(192 | o >> 6 & 31), 
        t += String.fromCharCode(128 | o >> 0 & 63));
        return t;
    }(e.toString());
    for (var n = /(^[a-zA-Z0-9-_.]*)/; r < e.length; ) {
        var o = n.exec(e.substr(r));
        if (null != o && o.length > 1 && "" != o[1]) t += o[1], r += o[1].length; else {
            if (" " == e[r]) t += "+"; else {
                var g = e.charCodeAt(r).toString(16);
                t += "%" + (g.length < 2 ? "0" : "") + g.toUpperCase();
            }
            r++;
        }
    }
    return t;
}

function formatDate (input) {
    input = '' + input
  
    let year = input.slice(0, 4)
    let month = input.slice(4, 6)
    let day = input.slice(6)
    let weekday = new Date(year, month - 1, day).getDay()
  
    let weekdays = ['日', '一', '二', '三', '四', '五', '六']
  
    return `${month}月${day}日 星期${weekdays[weekday]}`
}

module.exports = {
    formatDate,
    formatTime: function(t) {
        var r = t.getFullYear(), n = t.getMonth() + 1, o = t.getDate(), g = t.getHours(), a = t.getMinutes(), i = t.getSeconds();
        return [ r, n, o ].map(e).join("/") + " " + [ g, a, i ].map(e).join(":");
    },
    isEmptyObject: function(e) {
        for (var t in e) return !1;
        return !0;
    },
    urlDatatoString: function(e) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var r = "";
        for (var n in e) r += (r ? "&" : "") + t(n) + "=" + t(e[n]);
        return r;
    },
    sortObj: function(e) {
        for (var t = Object.keys(e).sort(), r = t.length, n = {}, o = 0; o < r; o++) n[t[o]] = e[t[o]];
        return n;
    },
    timeAgo: function(e) {
        e *= 1e3;
        var t = new Date().getTime() - e;
        if (!(t < 0)) {
            var r = "", n = t / 6e4, o = t / 36e5, g = t / 864e5, a = t / 6048e5, i = t / 2592e6;
            if (i >= 1 && i <= 3) r = " " + parseInt(i) + "月前"; else if (a >= 1 && a <= 3) r = " " + parseInt(a) + "周前"; else if (g >= 1 && g <= 6) r = " " + parseInt(g) + "天前"; else if (o >= 1 && o <= 23) r = " " + parseInt(o) + "小时前"; else if (n >= 1 && n <= 59) r = " " + parseInt(n) + "分钟前"; else if (t >= 0 && t <= 6e4) r = "刚刚"; else {
                var s = new Date();
                s.setTime(e);
                var u = s.getFullYear(), f = s.getMonth() + 1 < 10 ? "0" + (s.getMonth() + 1) : s.getMonth() + 1, l = s.getDate() < 10 ? "0" + s.getDate() : s.getDate();
                s.getHours(), s.getHours(), s.getMinutes(), s.getMinutes(), s.getSeconds(), s.getSeconds(), 
                r = u + "-" + f + "-" + l;
            }
            return r;
        }
    },
    timeForDate: function(e) {
        e *= 1e3;
        var t = new Date();
        t.setTime(e);
        var r = t.getFullYear(), n = t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1, o = t.getDate() < 10 ? "0" + t.getDate() : t.getDate();
        t.getHours(), t.getHours(), t.getMinutes(), t.getMinutes(), t.getSeconds(), t.getSeconds();
        return r + "-" + n + "-" + o;
    },
    strSpliteByNums: function(e, t) {
        if (e.length < t) (n = []).push(e); else {
            var r = new RegExp(".{" + t + "}", "g"), n = e.match(r);
            n.push(e.substring(n.join("").length));
        }
        return n;
    }
};