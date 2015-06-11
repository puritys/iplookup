var tester = require('./../index.js');
var assert = require("assert");

describe("Parse Web Page Response", function () {
    /*
     * Verify Country, City, Geo location, draw map, Language
     */
    it("TwSeo", function () {
        var datas = [
            [{ip: "192.99.196.211", country: "加拿大 (Canada)", city: "Montral", latitude: "45.5078", longitude: "-73.5804"}, '查詢IP: <font color=#ff6600>192.99.196.211</font><br>IP國別: <img src="images/flags/ca.gif" height="12" width="18"> <font color=#ff6600>加拿大 (Canada)</font><br>IP地理: 城市:<font color=#ff6600>Montral</font> &nbsp;緯度:<font color=#ff6600>45.5078</font> &nbsp;經度:<font color=#ff6600>-73.5804</font><br></div>']
        ];

        datas.forEach(function (data) {
            var expect, html;
            expect = data[0];
            html = data[1];
            var res = tester.parseTwSeoResponse(html);
            //console.log(res);
            for (var key in expect) {
                assert.equal(expect[key], res[key]);
            }
        });

    });

});

describe("Get Ip informatino", function () {
    it("Method getInfo", function () {
        var datas = [
            ["ca", "192.99.196.211"]
        ];

        datas.forEach(function (data) {
            var expect, ip;
            expect = data[0];
            ip = data[1];
            tester.getInfo(ip, function (info) {
                //console.log(info);
                assert.equal(expect, info['shortName'])
            });
        });

    });

});
