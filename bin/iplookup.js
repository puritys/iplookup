var util = require('./../util.js');
var ip;

ip = process.argv[2];

util.fetchTwSeoInfo(ip)
    .then(function (ret) {
        util.printIpInfo(ret);
        return util.fetchMap(ret.latitude, ret.longitude, './map.png');
    })
    .then(function (x) {
        util.printImg('./map.png');
    });

