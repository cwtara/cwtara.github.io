let geoIPData
function geoip(json){
  geoIPData = json
}

/** start locale handling */
const userLangRegion = navigator.language || navigator.userLanguage
const userLang = userLangRegion.split('-')[0]
console.log('userLang', userLang)

const LANGUAGE_REDIRECT_ALLOWLIST = ['ar', 'es']

if (LANGUAGE_REDIRECT_ALLOWLIST.includes(userLang.toLowerCase())) {
  console.log('language redirect: ', userLang)
  // window.location.replace(`/${userLang}`)
}
/** end locale handling */

/** start currency handling */
window.onload = () => {
  console.log('geoIPData', geoIPData)

  const selectedCurrency = typeof Shopyflow !== 'undefined' && Shopyflow.getCurrency().toLowerCase() || ''
  const userCountry = geoIPData.country_code.toLowerCase()
  const isCurrencyMatchUserCountryCode = selectedCurrency == userCountry
  console.log('selectedCurrency', selectedCurrency)
  console.log('userCountry', userCountry)
  console.log('isCurrencyMatchUserCountryCode', isCurrencyMatchUserCountryCode)

  if (isCurrencyMatchUserCountryCode) {
    // hide currency select modal (or do nothing if we are auto-setting)
  } else if (typeof Shopyflow !== 'undefined') {
    // automatically set currency in Shopyflow
    Shopyflow.setCurrency({ countryCode: userCountry })
  } else {
    // show currency select modal
  }

  const widgetElement = document.querySelector('[data-oke-widget]')
  if (window.okeWidgetApi) window.okeWidgetApi.setProduct(widgetElement, 'shopify-8044971000130')
}
/** end currency handling */