console.log('Current time: ', Date.now())

// function geoip(json){
//   console.log('geoip', json)
// }

/** start locale handling */
const userLang = navigator.language || navigator.userLanguage
console.log('userLang', userLang)

const LANGUAGE_ALLOWLIST = ['ar-ae','ar-eg']

if (LANGUAGE_ALLOWLIST.includes(userLang.toLowerCase())) {
  console.log('language redirect')
  // window.location.replace(`/${userLang}`)
} else {
  console.log('do not redirect')
}

/** end locale handling */

/** start currency handling */
window.onload = () => {
  const geoip = (json) => {
    console.log('geoip', json)
  }
}
