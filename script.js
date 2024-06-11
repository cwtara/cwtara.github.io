console.log('Test', Date.now())

function geoip(json){
  var userip      = document.getElementById("user_ip");
  var countrycode = document.getElementById("user_countrycode");
  userip.textContent      = json.ip;
  countrycode.textContent = json.country_code;
}