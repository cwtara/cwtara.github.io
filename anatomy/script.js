window.onload = () => {
  const widgetElement = document.querySelector('[data-oke-widget]')
  if (window.okeWidgetApi) window.okeWidgetApi.setProduct(widgetElement, 'shopify-8044971000130')

  document.addEventListener('oke-analytics-event', e => {
    console.log('event', e)
  })
}