let dimension = getScreenSize();
$('.explainers-sticky-segment').sticky({topSpacing:20});
$('.social-share-icons').sticky({topSpacing: dimension.height - 100})
$('.filter-column').sticky({topSpacing:20});
$(window).scroll(function(event){
  $('.qa-highlight-color').removeClass('qa-highlight-color');

  if($('.ui.sticky').hasClass('fixed')){
    scrollspy = true;
  }else{
    scrollspy = false;
  }
  var cutoff = $(window).scrollTop();
  $('.answer').removeClass('qa-highlight-color').each(function() {
    if ($(this).offset().top >= cutoff) {
      $('#q'+$(this).attr('id')).addClass('qa-highlight-color');
      return false; // stops the iteration after the first one on screen
    }
  });
});

$('.question').hover(function(){
  $(this).addClass('qa-highlight-color');
  $( $(this).children('div').children('a')[0].hash ).addClass('qa-highlight-color');
},function(){
  $(this).removeClass('qa-highlight-color');
  $( $(this).children('div').children('a')[0].hash ).removeClass('qa-highlight-color');
});
$('.answer').hover(function(){
  $(this).addClass('qa-highlight-color');
},function(){
  $(this).removeClass('qa-highlight-color');
})

function getScreenSize() {
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight|| e.clientHeight|| g.clientHeight;

  return {
    width: width,
    height: height
  };
}