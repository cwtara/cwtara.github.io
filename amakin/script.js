let geoIPData
function geoip(json){
  geoIPData = json
}

/** start locale handling */
const userLangRegion = navigator.language || navigator.userLanguage
const userLang = userLangRegion.split('-')[0]
console.log('userLang', userLang)

const LANGUAGE_REDIRECT_ALLOWLIST = ['ar', 'es']
const CURRENCY_ALLOWLIST = ['ae', 'sa', 'qa']

if (LANGUAGE_REDIRECT_ALLOWLIST.includes(userLang.toLowerCase())) {
  console.log('language redirect: ', userLang)
  // window.location.replace(`/${userLang}`)
}
/** end locale handling */

/** start currency handling */
window.onload = () => {
  console.log('geoIPData', geoIPData)

  const selectedCurrency = typeof Shopyflow !== 'undefined' && Shopyflow.getCurrency().toLowerCase() || ''
  const userCountry = 'sa'//geoIPData?.country_code?.toLowerCase()
  const isCurrencyMatchUserCountryCode = selectedCurrency == userCountry
  const autoSelectCurrency = CURRENCY_ALLOWLIST.includes(userCountry)
  console.log('selectedCurrency', selectedCurrency)
  console.log('userCountry', userCountry)
  console.log('isCurrencyMatchUserCountryCode', isCurrencyMatchUserCountryCode)

  if (isCurrencyMatchUserCountryCode) {
    // hide currency select modal (or do nothing if we are auto-setting)
  } else if (typeof Shopyflow !== 'undefined' && !isCurrencyMatchUserCountryCode && autoSelectCurrency) {
    // automatically set currency in Shopyflow
    console.log('setting currency to:', userCountry)
    setTimeout(() => Shopyflow.setCurrency(userCountry), 5000)
  } else {
    // show currency select modal
    console.log('where are you? please select a currency')
  }

  const widgetElement = document.querySelector('[data-oke-widget]')
  if (window.okeWidgetApi) window.okeWidgetApi.setProduct(widgetElement, 'shopify-8044971000130')
}
/** end currency handling */