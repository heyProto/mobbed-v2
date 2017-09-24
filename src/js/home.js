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

//twitter chatter
getJSON('https://protograph.newslaundry.com/toReportJournalistKilling/twitter.json', function (err, data){
    if (err != null) {
      alert('Something went wrong: ' + err);
    } else {
      let tweets = '';
      data.map((d,i) => {       
        tweets += '<a href="'+d.canonical+'" target="_blank" class="protograph-url"><div class="proto-card tolink-card">'+
          '<div class="briefs-layout">'+
            '<div class="card-text">' + d.description + '</div>'+
            '<div class="by-time-line">'+
              '<div class="by-line">' + d.author + '</div>'+
            '</div>'+
            '<div class="hint-text">'+ d.date +'</div>'+
          '</div>'+
        '</div></a>';
      document.getElementById('display-tweets').innerHTML = tweets;   
      })
    }
  })

// <div class="proto-card tolink-card">
//             <div class="briefs-layout">
//               <div class="card-text">As Islamic State targets Southeast Asia as its next theater of destruction, regional authorities are grappling with how to stem its underground cash flows. </div>
//               <div class="by-time-line">
//                 <div class="by-line">Alan Byod</div>
//               </div>
//               <div class="hint-text">10 news stories talking about this</div>
//             </div>
//           </div>

// let interval = setInterval(function(){   
//   getJSON('https://cdn.protograph.pykih.com/toReportViolence/twitter.json', function (err, data){
//     if (err != null) {
//       alert('Something went wrong: ' + err);
//     } else {
//       let tweets = '';
//       data.map((d,i) => {       
//         tweets += '<div style="margin-bottom:20px;padding:5px;"><a href="'+d.canonical+'" target="_blank" class="protograph-url">' +
//           '<div style="margin-bottom:10px">'+
//             '<img class="tolink-profile-image" src="'+d.author_image+'">'+
//             '<div class="profile-title-div">'+
//               '<div style="margin-bottom:0px">'+d.author+'</div>'+
//               '<div class="tolink-light-text">@' +d.twitter_handle+'</div>'+
//             '</div>'+
//           '</div>'+         
//           '<p>'+d.description+'</p>'+
//         '</a></div>' 
//       document.getElementById('display-tweets').innerHTML = tweets;   
//       })
//     }
//   })
// }, 60000)
