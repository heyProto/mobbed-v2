setTimeout(function(){
  $('.animate-number').each(function () {
    $(this).prop('Counter',0).animate({
      Counter: $(this).text()
    },{
      duration: 2000,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });
  }); 
},1000)

function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status == 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };
  xhr.send();
};

let dimension = getScreenSize(), mode;
if (dimension.width <= 400){
  mode = 'mobile';
} else {
  mode = 'laptop';
} 
// Configure/customize these variables.
var showChar = 520;  // How many characters are shown by default
var ellipsestext = "...";
var moretext = "keep reading";
var lesstext = "Show less";  

$('.project-description').each(function() {
  var content = $(this).html();

  if(content.length > showChar) {
    var c = content.substr(0, showChar);
    var h = content.substr(showChar, content.length - showChar);

    var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span><a href="" class="morelink">' + moretext + '</a></span>';

    $(this).html(html);
  }
});

$(".morelink").click(function(){
  if($(this).hasClass("less")) {
    $(this).removeClass("less");
    $(this).html(moretext);
  } else {
    $(this).addClass("less");
    $(this).html(lesstext);
  }
  $(this).parent().prev().toggle();
  $(this).prev().toggle();
  return false;
});
if (mode === 'laptop'){
  $('.briefs-column').sticky({topSpacing:20});
  $('.filter-column').sticky({topSpacing:20});
} else {
  $('.mobile-tab-area').sticky({topSpacing:0});
}

//counter
getJSON('http://protograph.indianexpress.com/49a045aea2b71456f5d04f4a/index.json', function (err, data){
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {
    let start_date_split = (new Date (data[data.length - 1].date)).toDateString().split(" "),
      end_date_split = (new Date (data[0].date)).toDateString().split(" "),
      start_date = start_date_split[2] + " " + start_date_split[1] + " '" + start_date_split[3].slice(-2),
      end_date = end_date_split[2] + " " + end_date_split[1] + " '" + end_date_split[3].slice(-2);

    let number_of_digits = data.length.toString().length;
    if (number_of_digits !== 3) {
      document.getElementById('first-number').innerHTML = 0
    } else {
      let element = document.getElementById("first-number");
      element.parentNode.removeChild(element);
    }
    if (number_of_digits === 1) {
      document.getElementById('second-number').innerHTML = 0
    } else {
      let element = document.getElementById("second-number");
      element.parentNode.removeChild(element);
    }       
    document.getElementById('animate-number').innerHTML = data.length;
    document.getElementById('start-date').innerHTML = start_date;
    document.getElementById('end-date').innerHTML = end_date;
  }
})

//cards column 
getJSON('http://protograph.indianexpress.com/be0b3c8854f0b1e774b96580/index.json', function (err, data){
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {      
    let mob_cards = '';
    data.map((d,i) => {
      // let img = "http://images.indianexpress.com/2017/07/suicide-759111.jpg",
      let img = d.screen_shot_url,
        new_date = d.date.split("-"),
        month = new Date(d.date).toLocaleDateString('en-US', {month: 'short'});
      mob_cards += '<div id="ProtoCard-'+ i +'" class="mob-justice-incidents">' +
        '<img class="card-image" src="'+img+ '" width="100%;"/>'+
        '<div class="protograph-gradient">'+
          '<div class="data-card-content">'+
            '<div class="data-card-title">' + d.title + '</div>'+
            '<div class="data-card-date">' + month + " "+ new_date[2] + ", "+ new_date[0]+'</div>' +
            '</div>'+
          '</div>'+
        '</div>'
      document.getElementById('display-cards').innerHTML = mob_cards
    })
    let dimension = getScreenSize(), mode;
    if (dimension.width <= 400){
      mode = 'mobile';
    } else {
      mode = 'laptop';
    } 
    for (let i=0; i<data.length; i++) {
      let createDiv = document.createElement('div');
        createDiv.id = 'ProtoCard-'+i
        document.getElementById('ProtoCard-'+i).setAttribute("data-toggle", "modal")
        document.getElementById('ProtoCard-'+i).setAttribute("data-target", "#proto-modal")
      document.getElementById('ProtoCard-'+i).addEventListener('click', function (d) {
        $('#proto-modal').modal('show');
        $('#proto-modal').on('hidden.bs.modal', function(){
          let element = document.querySelector("#proto-embed-card iframe");
          element.parentNode.removeChild(element);
        })
        if (mode === 'laptop') {
          let pro = new ProtoEmbed.initFrame(document.getElementById("proto-embed-card"), data[i].iframe_url, 'laptop')
        } else {
          let pro = new ProtoEmbed.initFrame(document.getElementById("proto-embed-card"), data[i].iframe_url, 'mobile', true)
        } 
      });
      $('.modal-close').click(function(){
        $("#proto-modal").modal('hide');
      });
    }
  }
})

//articles section
getJSON('http://protograph.indianexpress.com/948123634d965de58d04623d/index.json', function (err, data){
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      data.map((d,i) => {
        let createDiv = document.createElement('div');
        createDiv.id = 'ProtoCard-article'+i
        createDiv.className= 'ProtoCard-article'
        document.getElementById('display-stories').appendChild(createDiv)
        new ProtoEmbed.initFrame(document.getElementById("ProtoCard-article"+i), data[i].iframe_url, 'laptop')
      })
    }
})

//twitter chatter
getJSON('http://protograph.indianexpress.com/toReportViolence/twitter.json', function (err, data){
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      let tweets = '';
      data.map((d,i) => { 
        let new_date = d.date.split(" "),
          month = new_date[0].slice(0,3),
          day = new_date[1],
          year = new_date[2];      
        tweets += '<a href="'+d.canonical+'" target="_blank" class="protograph-url"><div class="proto-card tolink-card">'+
          '<div class="briefs-layout">'+
            '<div class="card-text">' + d.description + '</div>'+
            '<div class="by-time-line">'+
              '<div class="by-line">' + d.author + '</div>'+
            '</div>'+
            '<div class="hint-text">'+ month +" "+day+ " "+ year+'</div>'+
          '</div>'+
        '</div></a>';
      document.getElementById('display-tweets').innerHTML = tweets;   
      })
    }
  })

let interval = setInterval(function(){   
  getJSON('http://protograph.indianexpress.com/toReportViolence/twitter.json', function (err, data){
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      let tweets = '';
      data.map((d,i) => { 
        let new_date = d.date.split(" "),
          month = new_date[0].slice(0,3),
          day = new_date[1],
          year = new_date[2];      
        tweets += '<a href="'+d.canonical+'" target="_blank" class="protograph-url"><div class="proto-card tolink-card">'+
          '<div class="briefs-layout">'+
            '<div class="card-text">' + d.description + '</div>'+
            '<div class="by-time-line">'+
              '<div class="by-line">' + d.author + '</div>'+
            '</div>'+
            '<div class="hint-text">'+  month +" "+day+ " "+ year+'</div>'+
          '</div>'+
        '</div></a>';
      document.getElementById('display-tweets').innerHTML = tweets;   
      })
    }
  })
}, 60000) 

if (mode === 'mobile') {
  $("#articles-tab").on("click", function() {
    $(this).addClass("tabs-active-class");
    $("#cards-tab").removeClass("tabs-active-class");
    $("#chatter-tab").removeClass("tabs-active-class");
    $(".cards-section").css("display", "none")
    $(".chatter-section").css("display", "none")
    $(".stories-section").css("display", "block")
  })
  $("#cards-tab").on("click", function() {
    $(this).addClass("tabs-active-class");
    $("#articles-tab").removeClass("tabs-active-class");
    $("#chatter-tab").removeClass("tabs-active-class");
    $(".stories-section").css("display", "none")
    $(".chatter-section").css("display", "none")
    $(".cards-section").css("display", "block")
  })
  $("#chatter-tab").on("click", function() {
    $(this).addClass("tabs-active-class");
    $("#cards-tab").removeClass("tabs-active-class");
    $("#articles-tab").removeClass("tabs-active-class");
    $(".stories-section").css("display", "none")
    $(".cards-section").css("display", "none")
    $(".chatter-section").css("display", "block")
    $("#sticky-wrapper").css("display", "block")
  })
}

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
