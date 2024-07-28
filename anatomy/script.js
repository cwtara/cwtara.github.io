const SHOPIFY_PRODUCT_ID = 'shopify-8044971000130'
const OKENDO_SUBSCRIBER_ID = 'ac615854-e743-4537-85c5-b3cbfcb7dcd7'

const starsConstructor = (ratingPercentage) => {
  return `
    <div class="oke-stars" style="text-align:left;">
      <div class="oke-stars-background">
        <svg height="14" viewBox="0 0 79.22222222222221 14" aria-hidden="true">
          <use x="0" href="#oke-star-empty"></use>
          <use x="16.155555555555555" href="#oke-star-empty"></use>
          <use x="32.31111111111111" href="#oke-star-empty"></use>
          <use x="48.46666666666667" href="#oke-star-empty"></use>
          <use x="64.62222222222222" href="#oke-star-empty"></use>
        </svg>
      </div>
      <div class="oke-stars-foreground" style="width: ${ratingPercentage}%">
        <svg height="14" viewBox="0 0 79.22222222222221 14" aria-hidden="true">
          <use x="0" href="#oke-star-filled"></use>
          <use x="16.155555555555555" href="#oke-star-filled"></use>
          <use x="32.31111111111111" href="#oke-star-filled"></use>
          <use x="48.46666666666667" href="#oke-star-filled"></use>
          <use x="64.62222222222222" href="#oke-star-filled"></use>
        </svg>
      </div>
    </div>
  `
}

window.onload = () => {
  const widgetElement = document.querySelector('[data-oke-widget]')
  let disableScrollJack = false && $(window).scrollTop() === 0
  
  if (window.okeWidgetApi) window.okeWidgetApi.setProduct(widgetElement, SHOPIFY_PRODUCT_ID)

  fetch(`https://api.okendo.io/v1/stores/${OKENDO_SUBSCRIBER_ID}/products/${SHOPIFY_PRODUCT_ID}/review_aggregate`)
    .then(response => response.json())
    .then(data => {
      const reviewAggregateData = data?.reviewAggregate
      const ratingPercentage = Math.floor(reviewAggregateData.ratingAndReviewValuesTotal / reviewAggregateData.reviewCount / 5 * 100)
      const starRatingSvg = starsConstructor(ratingPercentage)

      $('#oke-stars-lander, #oke-stars-pdp, #oke-stars-mobile').append(starRatingSvg)
      setTimeout(() => $('.okendo-star-wrapper').css('display', 'block'), 250) 
    })

  // $(window).on('scroll', () => {
  //   console.log('scrolling', disableScrollJack)
  //   if (!disableScrollJack) {
  //     $('html').animate({
  //       scrollTop: $('.d-image-scroll').offset().top
  //     }, 400)
  //   }
  //   disableScrollJack = true
  // })
}

window.addEventListener('ShopyflowReady', (event) => {
  Shopyflow.on('addToCart', (obj) => {
    console.log(obj)
  })
});