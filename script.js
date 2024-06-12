console.log('Current time: ', Date.now())

let geoIPData
function geoip(json){
  geoIPData = json
}

/** start locale handling */
const userLangRegion = navigator.language || navigator.userLanguage
const userLang = userLangRegion.split('-')[0].toLowerCase()
console.log('userLang', userLang)

const LANGUAGE_ALLOWLIST = ['ar', 'es']

if (LANGUAGE_ALLOWLIST.includes(userLang.toLowerCase())) {
  console.log('language redirect')
  // window.location.replace(`/${userLang}`)
} else {
  console.log('do not redirect')
}

/** end locale handling */

/** start currency handling */
window.onload = () => {
  console.log('geoIPData', geoIPData)

  const selectedCurrency = typeof shopyflow !== 'undefined' && shopyflow.config?.storefrontConfig?.storeCurrency.toLowerCase() || ''
  const isCurrencyMatchUserCountryCode = selectedCurrency == geoIPData.country_code.toLowerCase()
  console.log('selectedCurrency', selectedCurrency)
  console.log('isCurrencyMatchUserCountryCode', isCurrencyMatchUserCountryCode)
}
