const SHOPIFY_PRODUCT_ID = 'shopify-8044971000130'
const OKENDO_SUBSCRIBER_ID = 'ac615854-e743-4537-85c5-b3cbfcb7dcd7'
let TEST 

window.onload = () => {
  const widgetElement = document.querySelector('[data-oke-widget]')
  if (window.okeWidgetApi) {
    window.okeWidgetApi.setProduct(widgetElement, SHOPIFY_PRODUCT_ID)
      .finally(() => {
        const starElement = $('.oke-w-ratingAverageModule-rating-stars')[0]?.cloneNode(true)
        TEST = starElement
        console.log('starElement', starElement, TEST)
      })
  }

}