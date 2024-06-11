console.log('Current time: ', Date.now())

function geoip(json){
  console.log('geoip', json)
}

const userLang = navigator.language || navigator.userLanguage
console.log('userLang', userLang)

const LANGUAGE_ALLOWLIST = ['ar-ae','ar-eg']

if (LANGUAGE_ALLOWLIST.includes(userLang)) {
  console.log('yup')
} else {
  console.log('nah')
}