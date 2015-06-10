var Promise = require('promise');
var util = require('./util.js');
var ip, inputNum;
var fs = require('fs');
ip = process.argv[2];


inputNum = process.argv.length;
for (var i = 2 ; i < inputNum; i++) {
    ip = process.argv[i];
    getInfo(ip);
}

function getInfo(ip) {
    var info;
    util.fetchTwSeoInfo(ip)
        .then(function(ret) {
            info = ret;
            if (inputNum === 3) {
                var country = ret['country'].replace(/[^a-z]+/ig, ''), flag;
                try {
                    if (ret['shortName']) {
                        flag = __dirname + "/flags/flags_iso/48/" + ret['shortName'] + ".png";
                        if (fs.existsSync(flag)) {
                            return util.printImg(flag);
                        }
                    }
                } catch (e) {
                    return new Promise(function (fulfill, reject) {fulfill(ret);});
                }
                return new Promise(function (fulfill, reject) {fulfill(ret);});
            } else {
                return new Promise(function (fulfill, reject) {fulfill(ret);});
            }
        })
        .then(function (ret) {
            return new Promise(function (fulfill, reject) {
                console.log("\n");
                util.printIpInfo(info);
                fulfill(info);
            });
    //        util.fetchFlag(flag, './map.gif');
            //return util.fetchMap(ret.latitude, ret.longitude, './map.png');
        })
        .then(function(ret) {
            return new Promise(function (fulfill, reject) {
                console.log("\n");
            });
        });


}
