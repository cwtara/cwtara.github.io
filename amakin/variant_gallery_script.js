let gImgDone = false;
function gImgInit() {
     if($('[sf-listened-value]').length === 0 && gImgDone === false){
      $('[sf-option-value].sf-active').trigger('click')     
   }else{
         gImgDone = true;
   }
     requestAnimationFrame(gImgInit);
}
gImgInit()

let imgGroupBaseClass = 'gallery-image'
let styleStr = '<style>.'+imgGroupBaseClass+'{display: none;}';

$('[sf-option-value]').each(function(i){
    let cssOptionValue = $(this).attr('sf-option-value');
    styleStr += '[sf-product][sf-listened-value="'+cssOptionValue+'"] .'+imgGroupBaseClass+'[sf-image-group="'+cssOptionValue+'"]{display: block;}';
    if($('[sf-option-value]').length -1 === i){
        styleStr +='</style>';
    }
})
$('body').append(styleStr);
$('[sf-option-value]').on('click', function(){
    let cssSelectedOptionValue = $(this).attr('sf-option-value');
    $(this).parents('[sf-product]:not([sf-sub-product])').attr('sf-listened-value', cssSelectedOptionValue);
})