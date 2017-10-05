let dimension = getScreenSize();
$('.explainers-sticky-segment').sticky({topSpacing:62});
$('.filter-column').sticky({topSpacing:62});
$(document).ready(function () {
  $('#myNavbar li p').remove();
  if (window.innerWidth >= 450) {
    $('body').scrollspy({
      target: '#myNavbar',
      offset: 160
    });
  }
  $(window).on("activate.bs.scrollspy", function(e){
    $('.answer').addClass('dull-out');
    var current = $('#myNavbar li a.active'),
      target_element,
      target_element_parent;

    switch(current.length) {
      case 0:
        return;
      case 2:
        target_element = current.get(1).hash;
        break;
      case 1:
        target_element = current.get(0).hash;
        break;
    }

    if(target_element) {
      target_element_parent = target_element.split('_');
      if (!(target_element_parent.length > 1)) {
        $(target_element).find('.answer').removeClass('dull-out');
      } else {
        $(target_element_parent[0]).removeClass('dull-out');
      }
      $(target_element).removeClass('dull-out');
    }
  });
});
if (window.innerWidth >= 450) {
  $(window).scroll(function () {
    var active_ancors = $('#myNavbar li a.active'),
      active_ancors_length = active_ancors.length;
    if (!active_ancors_length) {
      $('#myNavbar li a:first').addClass('active');
    }
  });
}

$('.question').hover(function(){
  $(this).addClass('qa-highlight-color');
  $( $(this).children('div').children('a')[0].hash ).addClass('qa-highlight-color');
},function(){
  $(this).removeClass('qa-highlight-color');
  $( $(this).children('div').children('a')[0].hash ).removeClass('qa-highlight-color');
});
// $('.answer').hover(function(){
//   $(this).addClass('qa-highlight-color');
// },function(){
//   $(this).removeClass('qa-highlight-color');
// })

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