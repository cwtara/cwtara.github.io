console.log('Current time: ', Date.now())

function geoip(json){
  console.log('geoip', json)
}

const userLang = navigator.language || navigator.userLanguage
console.log('userLang', userLang)

const LANGUAGE_ALLOWLIST = ['ar-ae','ar-eg']

if (LANGUAGE_ALLOWLIST.includes(userLang.toLowerCase())) {
  console.log('yup')
  window.location.replace(`/${userLang}`)
} else {
  console.log('nah')
}