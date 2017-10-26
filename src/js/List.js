import React from 'react';
import Modal from '../js/Modal';
import Utils from '../js/Utils';

class ListCards extends React.Component {
  constructor () {
    super();  
    this.state = {
      no_of_cards: 18
    } 
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.districtMapping = {"Agra":"आगरा","Aligarh":"अलीगढ़","Allahabad":"इलाहाबाद","Ambedkar Nagar":"अंबेडकर नगर","Amethi":"अमेठी","Amroha":"अमरोहा","Auraiya":"औरैया","Azamgarh":"आजमगढ़","Baghpat":"बागपत","Bahraich":"बहराइच","Ballia":"बलिया","Balrampur":"बलरामपुर","Banda":"बांदा","Barabanki":"बाराबंकी","Bareilly":"बरेली","Basti":"बस्ती","Bhadohi":"भदोही","Bijnor":"बिजनौर","Budaun":"शाहजहांपुर","Bulandshahar":"बुलंदशहर","Chandauli":"चंदौली","Chitrakoot":"चित्रकूट","Deoria":"देवरिया","Etah":"एटा","Etawah":"इटावा","Faizabad":"फैजाबाद","Farrukhabad":"फर्रुखाबाद","Fatehpur":"फतेहपुर","Firozabad":"फिरोजाबाद","Gautam Buddha Nagar":"गौतम बुद्ध नगर","Ghaziabad":"गाज़ियाबाद","Ghazipur":"गाजीपुर","Gonda":"गोंडा","Gorakhpur":"गोरखपुर","Hamirpur":"हमीरपुर","Hapur":"हापुड़","Hardoi":"हरदोई","Hathras":"हाथरस","Jalaun":"जालौन","Jaunpur":"जौनपुर","Jhansi":"झांसी","Kannauj":"कन्नौज","Kanpur Dehat":"कानपुर देहात","Kanpur Nagar":"कानपुर नगर","Kasganj":"कासगंज","Kaushambi":"कौशाम्बी","Kushinagar":"कुशीनगर","Lakhimpur Kheri":"लखीमपुर खेरी","Lalitpur":"ललितपुर","Lucknow":"लखनऊ","Maharajganj":"महाराजगंज","Mahoba":"महोबा","Mainpuri":"मैनपुरी","Mathura":"मथुरा","Mau":"मऊ","Meerut":"मेरठ","Mirzapur":"मिर्जापुर","Moradabad":"मुरादाबाद","Muzaffarnagar":"मुजफ्फरनगर","Pilibhit":"पीलीभीत","Pratapgarh":"प्रतापगढ़","Raebareli":"रायबरेली","Rampur":"रामपुर","Saharanpur":"सहारनपुर","Sambhal":"संभल","Sant Kabir Nagar":"संत कबीर नगर","Shahjahanpur":"शाहजहांपुर","Shamli":"शामली","Shravasti":"श्रावस्ती","Siddharth Nagar":"सिद्धार्थ नगर","Sitapur":"सीतापुर","Sonbhadra":"सोनभद्र","Sultanpur":"सुल्तानपुर","Unnao":"उन्नाव","Varanasi":"वाराणसी"};
  }

  componentDidMount(prevProps, prevState) {
    let cards = $("#cards-list .protograph-card").slice(0, this.state.no_of_cards)
    for (let i=0; i<cards.length; i++) {
      cards[i].style.display = "inline-block" 
    }   
  }

  componentDidUpdate(prevProps, prevState) {
    let cards = $("#cards-list .protograph-card").slice(0, this.state.no_of_cards)
    for (let i=0; i<cards.length; i++) {
      cards[i].style.display = "inline-block" 
    } 
  }

  handleOpenModal(e, card){
    let props = this.props; 
    $('#proto-modal').modal('show');
    $('#proto-modal').on('hidden.bs.modal', function(){
      let element = document.querySelector("#proto-embed-card iframe");
      element.parentNode.removeChild(element);
    })
    if (this.props.mode === 'laptop') {
      let pro = new ProtoEmbed.initFrame(document.getElementById("proto-embed-card"), card.iframe_url, 'laptop')
    } else {
      let pro = new ProtoEmbed.initFrame(document.getElementById("proto-embed-card"), card.iframe_url, 'mobile')
    } 
    $('.modal-close').click(function(){
      $("#proto-modal").modal('hide');
    });
  }

  loadMoreCard() {
    let size = this.props.dataJSON.length;
    // let size = $("#cards-list .protograph-card").length;
    let x = (this.state.no_of_cards + this.state.no_of_cards <= size) ? this.state.no_of_cards + this.state.no_of_cards : size;
    for(let i=0; i<x; i++) {
      $("#cards-list .protograph-card")[i].style.display = "inline-block" 
    } 
    this.setState({
      no_of_cards : x
    })
  }

  render() {
    if (this.props.dataJSON.length === 0) {
      return(<h2>No cards to show</h2>)
    } else {
      let cards = this.props.dataJSON.map((card, i) => {
        return(
          <div key={i} className="protograph-card" onClick={(e) => this.handleOpenModal(e, card)}>
            {card.image ? <img className="card-image" src={card.image} width='100%'/> : <img className="card-image" src={card.screen_shot_url} width='100%'/>}
            <div className="protograph-gradient">
              <div className="data-card-content">
                <div className="data-card-title">{this.districtMapping[card.district]}</div>
              </div>
            </div>
          </div>
        )
      })
      return (
        <div>
          <div id="cards-list" className="protograph-card-area">{cards}</div>
          <Modal handleCircleClicked={this.props.handleCircleClicked} mode={this.props.mode}/>
          {this.state.no_of_cards < this.props.dataJSON.length ? <button id="show-more-cards" onClick={(e) => this.loadMoreCard()}>Show more</button> : null}
        </div>
      )
    }
  }
}

export default ListCards;