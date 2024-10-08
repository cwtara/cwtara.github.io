let geoIPData
function geoip(json){
  geoIPData = json
}

/** start locale handling */
const userLangRegion = navigator.language || navigator.userLanguage
const userLang = userLangRegion.split('-')[0]
console.log('userLang', userLang)

const LANGUAGE_REDIRECT_ALLOWLIST = ['ar']
const CURRENCY_ALLOWLIST = ['AE', 'SA', 'QA', 'KW', 'LA']
const KUWAIT_URL = 'https://amakin.com.kw'

if (LANGUAGE_REDIRECT_ALLOWLIST.includes(userLang.toLowerCase())) {
  console.log('language redirect: ', userLang)
  // window.location.replace(`/${userLang}`)
}
/** end locale handling */

/** start currency handling */
window.onload = () => {
  // user country
  const shopyflowSelectedCurrency = typeof Shopyflow !== 'undefined' && Shopyflow.getCurrency().toUpperCase() || ''
  const userCountry = geoIPData?.country_code?.toUpperCase()
  const isUserCountryMatching = (shopyflowSelectedCurrency == userCountry)

  const queryParams = new URLSearchParams(window.location.search)
  const countryURLParam = queryParams.get('selectCountry')
  const isFromKW = queryParams.get('isFromKW')
  const isParamCountryMatching = (shopyflowSelectedCurrency == countryURLParam)

  const setCountry = countryURLParam && !isParamCountryMatching ? countryURLParam : userCountry
  const localStorageIsSet = localStorage.getItem('amakinCurrencyAutoSet')

  // should auto set currency if localStorage is not set and isFromKW query string is present
  const autoSetCurrency = !localStorageIsSet || isFromKW

  if (isUserCountryMatching && !countryURLParam) { // should check for UAE to avoid load flash
    // hide currency select modal (or do nothing if we are auto-setting)
    console.log('Already set, no update needed!')
  } else if (typeof Shopyflow !== 'undefined') {
    // automatically set currency in Shopyflow
    setCurrencyHandler(setCountry, autoSetCurrency)
  }
}

/** Checks localStorage to see if currency has already been automatically set */
const setCurrencyHandler = (setCountry, autoSetCurrency) => {
  console.log('setCurrencyHandler args', setCountry, autoSetCurrency)
  if (validateCurrency(setCountry) && autoSetCurrency) {
    localStorage.setItem('amakinCurrencyAutoSet', true)

    if (setCountry === 'LA' && window.location.href !== KUWAIT_URL) {
      console.log('--> REDIRECT TO KW -->')
      // window.location.assign(KUWAIT_URL)
    } else {
      history.pushState(null, '', location.href.split('&isFromKW')[0])
      console.log('setCurrency()', setCountry)
      return Shopyflow.setCurrency(setCountry)
    }
  } else {
    return
  }
}
/** end currency handling */

const validateCurrency = (country) => {
  return CURRENCY_ALLOWLIST.includes(country)
}
