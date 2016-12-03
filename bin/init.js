var HTTP = require('../server/test/HTTP');
var fs = require('fs');


initFiles = [
  {
    filepath: './bin/user.json',
    api: '/api/user'
  },
  {
    filepath: './bin/food.json',
    api: '/api/food'
  }
]

initFiles.forEach(function (file) {
  fs.readFile(file.filepath, 'utf8', function (err, items) {
    if (err) {
      console.log("something error : " + err.message);
    } else {
      try {
        var items = JSON.parse(items);
      } catch (e) {
        console.log("something error : " + e.message);
        return;
      }
      items.forEach(function (item) {
        HTTP.post(file.api, item).catch((message)=>{
          console.error(message);
        });
      })
    }
  })
})

