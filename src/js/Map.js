import React from 'react';
import * as topojson from 'topojson-client';
import {geoPath, geoCentroid, geoMercator} from 'd3-geo';
// import Voronoi from '../js/Voronoi';

class MapsCard extends React.Component {
  constructor(props) {
    super(props)
    this.districtMapping = {"Agra":"आगरा","Aligarh":"अलीगढ़","Allahabad":"इलाहाबाद","Ambedkar Nagar":"अंबेडकर नगर","Amethi":"अमेठी","Amroha":"अमरोहा","Auraiya":"औरैया","Azamgarh":"आजमगढ़","Baghpat":"बागपत","Bahraich":"बहराइच","Ballia":"बलिया","Balrampur":"बलरामपुर","Banda":"बांदा","Barabanki":"बाराबंकी","Bareilly":"बरेली","Basti":"बस्ती","Bhadohi":"भदोही","Bijnor":"बिजनौर","Budaun":"शाहजहांपुर","Bulandshahar":"बुलंदशहर","Chandauli":"चंदौली","Chitrakoot":"चित्रकूट","Deoria":"देवरिया","Etah":"एटा","Etawah":"इटावा","Faizabad":"फैजाबाद","Farrukhabad":"फर्रुखाबाद","Fatehpur":"फतेहपुर","Firozabad":"फिरोजाबाद","Gautam Buddha Nagar":"गौतम बुद्ध नगर","Ghaziabad":"गाज़ियाबाद","Ghazipur":"गाजीपुर","Gonda":"गोंडा","Gorakhpur":"गोरखपुर","Hamirpur":"हमीरपुर","Hapur":"हापुड़","Hardoi":"हरदोई","Hathras":"हाथरस","Jalaun":"जालौन","Jaunpur":"जौनपुर","Jhansi":"झांसी","Kannauj":"कन्नौज","Kanpur Dehat":"कानपुर देहात","Kanpur Nagar":"कानपुर नगर","Kasganj":"कासगंज","Kaushambi":"कौशाम्बी","Kushinagar":"कुशीनगर","Lakhimpur Kheri":"लखीमपुर खेरी","Lalitpur":"ललितपुर","Lucknow":"लखनऊ","Maharajganj":"महाराजगंज","Mahoba":"महोबा","Mainpuri":"मैनपुरी","Mathura":"मथुरा","Mau":"मऊ","Meerut":"मेरठ","Mirzapur":"मिर्जापुर","Moradabad":"मुरादाबाद","Muzaffarnagar":"मुजफ्फरनगर","Pilibhit":"पीलीभीत","Pratapgarh":"प्रतापगढ़","Raebareli":"रायबरेली","Rampur":"रामपुर","Saharanpur":"सहारनपुर","Sambhal":"संभल","Sant Kabir Nagar":"संत कबीर नगर","Shahjahanpur":"शाहजहांपुर","Shamli":"शामली","Shravasti":"श्रावस्ती","Siddharth Nagar":"सिद्धार्थ नगर","Sitapur":"सीतापुर","Sonbhadra":"सोनभद्र","Sultanpur":"सुल्तानपुर","Unnao":"उन्नाव","Varanasi":"वाराणसी"};
    this.state = {
      projection: undefined,
      regions: [],
      outlines: [],
      country: undefined,
      path: undefined,
      offsetWidth: undefined,
      actualHeight: undefined,
      x:'100px',
      y:'100px',
      showTooltip:false,
      districts: ["Agra","Aligarh","Allahabad","Ambedkar Nagar","Amethi","Amroha","Auraiya","Azamgarh","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki","Bareilly","Basti","Bhadohi","Bijnor","Budaun","Bulandshahar","Chandauli","Chitrakoot","Deoria","Etah","Etawah","Faizabad","Farrukhabad","Fatehpur","Firozabad","Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat","Kanpur Nagar","Kasganj","Kaushambi","Kushinagar","Lakhimpur Kheri","Lalitpur","Lucknow","Maharajganj","Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad","Muzaffarnagar","Pilibhit","Pratapgarh","Raebareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar","Shahjahanpur","Shamli","Shravasti","Siddharth Nagar","Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"]
    }
  }
  handleOnClick(e, card) {
    let props = this.props;
    $('.ui.modal').modal({
      onShow: function() {
        $("#proto-modal").css("height", 0)
      },
      onHide: function(){
        if (props.mode === 'laptop') {
          $("#proto-modal").css("height", "100%")
        }
      },
      onHidden: function(e) {
        let element = document.querySelector("#proto-embed-card iframe");
        element.parentNode.removeChild(element);
      }
    }).modal('attach events', '.close').modal('show')
    if (this.props.mode === 'laptop'){
      let pro = new ProtoEmbed.initFrame('proto-embed-card', card.iframe_url, "laptop")
    } else {
      let pro = new ProtoEmbed.initFrame('proto-embed-card', card.iframe_url, "mobile")
    }
  }
  handleMouseEnter (e,d) {
    e.target.style.fill='#bf2a39';
    e.target.style.fillOpacity='unset';
    let rect = e.target.getBoundingClientRect();
    let mx=e.pageX;
    let my=e.pageY;
    // console.log(mx, my, "mx my")
    this.setState({
      showTooltip:true,
      x:mx-180,
      y:my-20,
      currState:d.properties.NAME_1
    });
  }
  handleMouseLeave(e,d){
    e.target.style.fillOpacity='0';
    this.setState({
      showTooltip:false
    })
  }
  handleMouseClick(e,d){
    if(!this.props.modal){
      let location = d.properties.NAME_1.toLowerCase().split(' ').join('-');
      window.location = './../districts/'+location+'.html';
    }else{
      let district = document.querySelector('#protograph_tooltip').innerHTML;
      this.handleOnClick(e,this.props.dataJSON[this.state.districts.indexOf(district)%this.props.dataJSON.length])
    }
  }
  componentWillMount() {
    let padding = this.props.mode === 'mobile' ? 20 : 0,
      offsetWidth = this.props.mode === 'mobile' ? 320 : 550 - padding ,
      actualHeight = this.props.mode === 'mobile' ? 500 : this.props.chartOptions.height

    let tx = this.props.mode === 'mobile' ? offsetWidth / 2 : offsetWidth / 2;

    let ch = this.props.topoJSON,
      country = topojson.feature(ch, ch.objects),
      center = geoCentroid(topojson.feature(ch, ch.objects)),
      scale = 700,
      projection = geoMercator().center(center)
        .scale(scale)
        .translate([tx, actualHeight/2]),
      path = geoPath()
        .projection(projection);

    let bounds  = path.bounds(country),
      hscale = scale*offsetWidth  / (bounds[1][0] - bounds[0][0]),
      vscale = scale*actualHeight / (bounds[1][1] - bounds[0][1]);
    scale = (hscale < vscale) ? hscale : vscale;
    let offset = [offsetWidth - (bounds[0][0] + bounds[1][0])/2, actualHeight - (bounds[0][1] + bounds[1][1])/2];

    projection = geoMercator().center(center)
      .scale(scale)
      .translate(offset);
    path = path.projection(projection);

    let regions = country.features.map((d,i) => {
      return(
        <g key={i} className="region">
          <path className="geo-region" d={path(d)}></path>
        </g>
      )
    })

    let outlines = country.features.map((d,i) => {
      return(
        <path style={{cursor:'pointer'}} key={i} className="geo region-outline" d={path(d)} onClick={(e)=> this.handleMouseClick(e,d)} onMouseLeave={(e) => this.handleMouseLeave(e, d)} onMouseEnter={(e) => this.handleMouseEnter(e, d)}></path>
      )
    })

    this.setState({
      projection: projection,
      regions: regions,
      outlines: outlines,
      country: country,
      path: path,
      offsetWidth: offsetWidth,
      actualHeight: actualHeight
    })
  }

  render(){
    let styles = {
      strokeWidth: 0.675
    }
    const {projection, regions, outlines, country, path, offsetWidth, actualHeight} = this.state
    return(
      <div style={{width:'100%',height:'100%',position:'relative'}}>
        <svg id='map_svg' viewBox={`0, 0, ${offsetWidth}, ${actualHeight}`} width={offsetWidth} height={actualHeight+60}>
          <g id="regions-grp" className="regions">{regions}</g>
          <path className='geo-borders' d={path(country)}></path>
          <g className="outlines" style={styles}>{outlines}</g>
        </svg>
        {this.state.showTooltip ? <div id="protograph_tooltip" style={{left:this.state.x,top:this.state.y}}>
          {this.districtMapping[this.state.currState]}
        </div> : ''}
      </div>
    )
  }
}

export default MapsCard;

// <Voronoi data={this.props.dataJSON} projection={projection} width={offsetWidth} height={actualHeight} mode={this.props.mode} circleClicked={this.props.circleClicked} handleCircleClicked={this.props.handleCircleClicked} circleHover={this.props.circleHover}/>
