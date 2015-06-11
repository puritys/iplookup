var iplookup = require('../index.js');

iplookup.getInfo('173.194.72.94', function (ret) {
    console.log(ret);
});
