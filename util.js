//https://geoiptool.com/zh/
//http://freegeoip.net/json/xx.xx.xx.xx
//http://dir.twseo.org/ip-check.php
//http://dir.twseo.org/ip-query3.php post inputip: xx.xx.xx.xx
//https://developers.google.com/maps/documentation/staticmaps/
var Promise = require('promise');
var request = require('request');
var fs = require('fs');
var dns = require('dns');

function getInfo(ip, callback) {
    fetchTwSeoInfo(ip)
    .then(function (ret) {
        callback(ret);
    });
}

function fetchTwSeoInfo(ip) {
    var url = "http://dir.twseo.org/ip-query3.php";
    return new Promise(function (fulfill, reject) {
        request.post({url: url, formData: {inputip: ip}}, function (err, response, body) {
            if (err) reject(err, body);
            var ret = parseTwSeoResponse(body);
            fulfill(ret);
        });
    });
}

/**
 * Use ip to find the Country and city, also draw the map for it's position.
 */

function parseTwSeoResponse(data) {
    var reg, matches, ret = {};
    // IP
    reg = /查詢IP:[\s]+[^>]+>([0-9\.]+)/;
    if (matches = data.match(reg)) ret['ip'] = matches[1];
    // Country
    reg = /IP國別:[\s]*<img[\s]+src="([^\"]+)"[^>]+>[^>]+>([^<]+)/
    if (matches = data.match(reg)) {
        ret['flag'] = "http://dir.twseo.org/" + matches[1];
        ret['country'] = matches[2];
        //short name
        var m = matches[1].match(/([a-z]+)\.gif$/);
        if (m && m[1]) ret['shortName'] = m[1];
    }
    // Citry
    reg = /IP地理[^>]+>([^<]+)/
    if (matches = data.match(reg)) ret['city'] = matches[1];

    // latitude longitude
    reg = /緯度[^>]+>([^<]+)/
    if (matches = data.match(reg)) ret['latitude'] = matches[1];
    reg = /經度[^>]+>([^<]+)/
    if (matches = data.match(reg)) ret['longitude'] = matches[1];


    return ret;
}

function fetchFlag(url, outputPath) {
    return new Promise(function (fulfill, reject) {
       request(url).pipe(fs.createWriteStream(outputPath));
       fulfill();
    });
}


function fetchMap(latitude, longitude, outputPath) {
    var url = "https://maps.googleapis.com/maps/api/staticmap?center=" +latitude+","+longitude+"&zoom=1&size=700x400&maptype=roadmap";
    var url ="http://www.google.com";
    return new Promise(function (fulfill, reject) {
       request(url).pipe(fs.createWriteStream(outputPath));
       fulfill();
    });
}

function printIpInfo(info) {
    if (!info) console.log("Failed to get ip info, please execute it again.");
    var maxKeyLen = 10, space, spaceLen; 
    for (var key in info) {
        space = "";
        spaceLen = maxKeyLen - key.length;
        if (spaceLen > 0) for(var i = 0; i < spaceLen; i++) space += " ";
        console.log(space + key + ": " + info[key]);
    }
}

function printImg(file) {
    return new Promise(function (fulfill, reject) {
        var tube = require.resolve('picture-tube');
        tube = tube.replace(/[a-zA-Z\.0-9]+$/, '') + '../.bin/picture-tube'
        var exec = require('child_process').execSync;
        if (!exec) {
            exec = require('child_process').exec;
            exec(tube + ' ' + file, function (error, stdout, stderr) {
                console.log(stdout);
                fulfill(true);
            });
        } else {
            exec(tube + ' ' + file, {stdio: [0, 1, 2]});
            fulfill(true);
        }
    });
}

function fetchHostName(ip) {
    return new Promise(function (fulfill, reject) {
        dns.reverse(ip, function (err, hostname) {
            fulfill(hostname);
        });
    });
}

exports.getInfo = getInfo;
exports.fetchTwSeoInfo = fetchTwSeoInfo;
exports.parseTwSeoResponse = parseTwSeoResponse;
exports.fetchMap = fetchMap;
exports.printIpInfo = printIpInfo;
exports.printImg = printImg;
exports.fetchHostName = fetchHostName;
