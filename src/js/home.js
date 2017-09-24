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

$('.briefs-column').sticky({topSpacing:20});

//Middle column
getJSON('https://cdn.protograph.pykih.com/be0b3c8854f0b1e774b96580/index.json', function (err, data){
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {      
    let mob_cards = '';
    data.map((d,i) => {
      let img = d.screen_shot_url,
        new_date = d.date.split("-"),
        month = new Date(d.date).toLocaleDateString('en-US', {month: 'short'});
      mob_cards += '<div id="ProtoCard-'+ i +'" class="mob-justice-incidents" style="height:220px;overflow:hidden;">' +
        '<img src="'+img+ '" width="100%"/>'+
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

//twitter chatter
getJSON('https://protograph.newslaundry.com/toReportJournalistKilling/twitter.json', function (err, data){
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
  getJSON('https://protograph.newslaundry.com/toReportJournalistKilling/twitter.json', function (err, data){
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
