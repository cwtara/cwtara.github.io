const SHOPIFY_PRODUCT_ID = 'shopify-8044971000130'
const OKENDO_SUBSCRIBER_ID = 'ac615854-e743-4537-85c5-b3cbfcb7dcd7'

window.onload = () => {
  const widgetElement = document.querySelector('[data-oke-widget]')
  if (window.okeWidgetApi) window.okeWidgetApi.setProduct(widgetElement, SHOPIFY_PRODUCT_ID)

  fetch(`https://api.okendo.io/v1/stores/${OKENDO_SUBSCRIBER_ID}/products/${SHOPIFY_PRODUCT_ID}/review_aggregate`)
    .then(response => response.json())
    .then(data => {
      const SUBTRACT_OFFSET = 0
      const reviewAggregateData = data?.reviewAggregate
      const ratingPercentage = Math.floor(reviewAggregateData.ratingAndReviewValuesTotal / reviewAggregateData.reviewCount / 5 * 100)
      const starsWidth = ratingPercentage - SUBTRACT_OFFSET
      $('#oke-stars-lander').attr('style', `width: ${starsWidth}%`)
    });
}