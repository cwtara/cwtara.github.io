let geoIPData
function geoip(json){
  geoIPData = json
}

/** start locale handling */
const userLangRegion = navigator.language || navigator.userLanguage
const userLang = userLangRegion.split('-')[0]
console.log('userLang', userLang)

const LANGUAGE_REDIRECT_ALLOWLIST = ['ar', 'es']
const CURRENCY_ALLOWLIST = ['AE', 'SA', 'QA']

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
  const isParamCountryMatching = (shopyflowSelectedCurrency == countryURLParam)

  const localStorageIsSet = localStorage.getItem(window.location.origin)  
  const setCountry = countryURLParam ? countryURLParam : userCountry

  console.log('setCountry', setCountry)
  
  if (isUserCountryMatching && !countryURLParam) {
    // hide currency select modal (or do nothing if we are auto-setting)
    console.log('Already set, no update needed!')
  } else if (typeof Shopyflow !== 'undefined') {
    // automatically set currency in Shopyflow
    setCurrencyHandler(setCountry, localStorageIsSet, isParamCountryMatching)
  }
}

/** Checks localStorage to see if currency has already been manually set */
const setCurrencyHandler = (setCountry, localStorageIsSet, isParamCountryMatching) => {
  if (validateCurrency(setCountry) && (!localStorageIsSet || !isParamCountryMatching)) {
    localStorage.setItem(window.location.origin, true)
    return Shopyflow.setCurrency(setCountry)
  } else {
    return
  }
}
/** end currency handling */

const validateCurrency = (country) => {
  return CURRENCY_ALLOWLIST.includes(country)
}