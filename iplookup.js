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

    util.fetchTwSeoInfo(ip)
        .then(function (ret) {
            return new Promise(function (fullfill, reject) {
                var country = ret['country'].replace(/[^a-z]+/ig, ''), flag;
                console.log("\n");

                if (inputNum === 3) {
                    try {
                        if (ret['shortName']) {
                            flag = __dirname + "/flags/flags_iso/48/" + ret['shortName'] + ".png";
                            if (fs.existsSync(flag)) {
                                util.printImg(flag);
                            }
                        }
                    } catch (e) {

                    }
                }
                util.printIpInfo(ret);
                fullfill(ret);
            });
    //        util.fetchFlag(flag, './map.gif');
            //return util.fetchMap(ret.latitude, ret.longitude, './map.png');
        })
        .then(function(ret) {
            return new Promise(function (fullfill, reject) {
                console.log("\n");
            });
        });


}
