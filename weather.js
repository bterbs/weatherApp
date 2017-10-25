const http = require('http');

const city = process.argv.slice(2).join(' ');

var address = {
  host: 'api.openweathermap.org',
  path: '/data/2.5/weather?q='+ city +'&APPID=7ad0471af0fbed17a0aae9726d355be4',
};

callback = function(response) {
  var arr = [];

  response.on('data', function (chunk) {
    arr.push(JSON.parse(chunk));
  });

  response.on('end', function () {
    let tempKelvin = arr[0].main.temp;
    let tempFahrenheit =  (9/5 * (tempKelvin - 273) + 32);
    console.log(`Temperature in Fahrenheit: ${tempFahrenheit.toFixed(3)}`);
  });
}

http.request(address, callback).end();
