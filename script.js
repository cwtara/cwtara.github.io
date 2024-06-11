console.log('Current time: ', Date.now())

function geoip(json){
  console.log('geoip', json)
}

const userLang = navigator.language || navigator.userLanguage
console.log('userLang', userLang)