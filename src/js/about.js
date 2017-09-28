let dimension = getScreenSize();
$('.explainers-sticky-segment').sticky({topSpacing:20});
$('.social-share-icons').sticky({topSpacing: dimension.height - 100})
$('.filter-column').sticky({topSpacing:20});
$(document).ready(function () {
  $(window).on("activate.bs.scrollspy", function(e){
    $('.answer').addClass('dull-out');
    var current = $('#myNavbar li a.active');
    if(current.length) {
      var target_element = current.get(0).hash.split('_')[0];
      $(target_element).removeClass('dull-out');
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