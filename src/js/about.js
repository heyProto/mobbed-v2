$('.ui.sticky').sticky({topSpacing:62});
  $(window).scroll(function(event){
    $('.qa-highlight-color').removeClass('qa-highlight-color');

    if($('.ui.sticky').hasClass('fixed')){
      scrollspy = true;
    }else{
      scrollspy = false;
    }
    var cutoff = $(window).scrollTop();
    $('.answer').removeClass('qa-highlight-color').each(function() {
      console.log($(this).offset().top -62, "$(this).offset().top")
      if ($(this).offset().top + 62 >= cutoff) {
        $('#q'+$(this).attr('id')).addClass('qa-highlight-color');
        return false; // stops the iteration after the first one on screen
      }
    });

  });

  $('.question').hover(function(){
    $(this).addClass('qa-highlight-color');
    $( $(this).children('p').children('a')[0].hash ).addClass('qa-highlight-color');
  },function(){
    $(this).removeClass('qa-highlight-color');
    $( $(this).children('p').children('a')[0].hash ).removeClass('qa-highlight-color');
  });
  $('.answer').hover(function(){
    $(this).addClass('qa-highlight-color');
  },function(){
    $(this).removeClass('qa-highlight-color');
  })