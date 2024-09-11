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

  const shopyflowSelectedCurrency = typeof Shopyflow !== 'undefined' && Shopyflow.getCurrency().toUpperCase() || ''
  const userCountry = geoIPData?.country_code?.toUpperCase()
  const isSetCountryMatching = (shopyflowSelectedCurrency == userCountry || shopyflowSelectedCurrency == '')
  const allowUserCountry = CURRENCY_ALLOWLIST.includes(userCountry)
  console.log('shopyflowSelectedCurrency', shopyflowSelectedCurrency)
  console.log('userCountry', userCountry)
  console.log('isSetCountryMatching', isSetCountryMatching)

  if (isSetCountryMatching) {
    // hide currency select modal (or do nothing if we are auto-setting)
    console.log('already set, no update needed')
  } else if (typeof Shopyflow !== 'undefined' && !isSetCountryMatching && allowUserCountry) {
    // automatically set currency in Shopyflow
    console.log('setting currency to:', userCountry)
    Shopyflow.setCurrency(userCountry)
  } else if (!shopyflowSelectedCurrency) {
    // show currency select modal
    console.log('where are you? please select a currency')
  }

  const widgetElement = document.querySelector('[data-oke-widget]')
  if (window.okeWidgetApi) window.okeWidgetApi.setProduct(widgetElement, 'shopify-8044971000130')
}
/** end currency handling */