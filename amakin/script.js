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
  const allowUserCountry = validateCurrency(userCountry)
  console.log('isUserCountryMatching', isUserCountryMatching)

  const queryParams = new URLSearchParams(window.location.search)
  const countryURLParam = queryParams.get('selectCountry')

  const localStorageIsSet = localStorage.getItem(window.location.origin)  
  const setCountry = countryURLParam ? countryURLParam : localStorageIsSet ? userCountry : ''
  
  console.log('setCurrencyHandler', countryURLParam, localStorageIsSet, setCountry)

  if (isUserCountryMatching || !countryURLParam && allowUserCountry) {
    // hide currency select modal (or do nothing if we are auto-setting)
    console.log('Already set, no update needed!')
  } else if (typeof Shopyflow !== 'undefined') {
    // automatically set currency in Shopyflow
    console.log('call setCurrencyHandler()', userCountry, localStorageIsSet)
    setCurrencyHandler(setCountry, localStorageIsSet)
  }
}

/** Checks localStorage to see if currency has already been manually set */
const setCurrencyHandler = (setCountry, localStorageIsSet) => {
  // url params

  if (validateCurrency(setCountry)) {
    console.log('setCurrency()...', setCountry)

    if (!localStorageIsSet) localStorage.setItem(window.location.origin, true)
    // if (countryURLParam) queryParams.delete('selectCountry')

    return Shopyflow.setCurrency(setCountry)
  } else {
    return
  }
}
/** end currency handling */

const validateCurrency = (country) => {
  return CURRENCY_ALLOWLIST.includes(country)
}