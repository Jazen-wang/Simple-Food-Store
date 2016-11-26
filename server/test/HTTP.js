let http = require('http');
let querystring = require('querystring');

let Port = 8000;

let baseUrl = "http://localhost:" + Port.toString();

exports.post = function (url, data) {
  let postData = querystring.stringify(data);
  let options = {
    port: Port,
    path: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }
  return new Promise(function (resolve, reject){
    let req = http.request(options, (res) => {
      res.setEncoding('utf8');
      let datas = "";
      res.on('data', (chunk) => {
        datas += chunk;
      });
      res.on('end', () => {
        resolve(datas);
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);

    req.end();
  });
}

function paramString(data) {
  let result = "";
  for (let key in data) {
    if (result != "")
      result += '&' + key + '=' + data[key];
    else result += '?' + key + '=' + data[key];
  }
  return result;
}

exports.get = function (url, data) {
  data = paramString(data);
  return new Promise(function (resolve, reject){
    let req = http.get(baseUrl + url + data, (res)=>{
      res.setEncoding('utf8');
      let datas = "";
      res.on('data', (chunk) => {
        datas += chunk;
      });
      res.on('end', () => {
        resolve(datas);
      });
    });

    req.on('error', (e) => {
      reject(e);
    });
  })
}



