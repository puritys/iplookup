iplookup
========

### Get the information of IP including the country, city, geo position, hostname

## Install:

sudo npm install -g iplookup


## Command Example:

Get single IP information

```
iplookup 74.125.203.94
```

Get multi-ip informations

```
iplookup 74.125.203.94 122.116.130.211 74.25.203.94
```

## Single-Result (Display the flag of nation):

<img src="https://raw.githubusercontent.com/puritys/MyProgram/master/images/iplookup.png" />

## Multi-Result:

```
        ip: 122.116.130.211
      flag: http://dir.twseo.org/images/flags/tw.gif
   country: 台灣 (Taiwan)
 shortName: tw
      city: Taipei
  latitude: 25.0392
 longitude: 121.525
  hostname: th-in-f147.1e100.net

        ip: 74.125.203.94
      flag: http://dir.twseo.org/images/flags/us.gif
   country: 美國 (United states)
 shortName: us
      city: Mountain View
  latitude: 37.4192
 longitude: -122.0574


        ip: 74.25.203.94
      flag: http://dir.twseo.org/images/flags/us.gif
   country: 美國 (United states)
 shortName: us
```

## iplookup Library Example:

```
var iplookup = require('iplookup');

iplookup.getInfo('173.194.72.94', function (ret) {
    console.log(ret);
});
/*
// Return value will be a JSON data:
{ ip: '173.194.72.94',
  flag: 'http://dir.twseo.org/images/flags/us.gif',
  country: '美國 (United States)',
  shortName: 'us',
  city: 'Mountain View',
  latitude: '37.4192',
  longitude: '-122.0574' }
*/
```


