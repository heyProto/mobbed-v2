import React from 'react';
import axios from 'axios';
import Halogen from 'halogen';
import List from '../js/List';
import Map from '../js/Map';
import TimeBrush from '../js/TimeBrush';
import Utils from '../js/Utils';
import {timeFormat} from 'd3-time-format';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataJSON: undefined,
      filteredJSON: undefined,
      circleClicked: false,
      circleHover: false,
      height: 0,
      overflow: 'hidden',
      showTapArea: 'block',
      hideTapArea: 'none',
      topoJSON: {},
      category: null,
      year_value: {
        min: 'undefined',
        max: 'undefined'
      },
      start_domain: 'undefined',
      end_domain: 'undefined',
      parseMonth: timeFormat("%Y-%m")
    }
    this.handleCircleClicked = this.handleCircleClicked.bind(this);
    this.handleSelectDateRange = this.handleSelectDateRange.bind(this);
  }

  componentDidMount() {
    const {dataURL, topoURL} = this.props;
    axios.all([axios.get(dataURL), axios.get(topoURL)])
      .then(axios.spread((card, topo) => {
        this.setState({
          dataJSON: card.data,
          filteredJSON: card.data,
          topoJSON: topo.data,
          filters: this.props.filterNames
        });
        let filtDat=this.state.filters.map((dat)=> this.sortObject(Utils.groupBy(this.state.dataJSON,dat)));
        let filtDatObj={};
        let filtDatObjValues={};
        filtDat.forEach((dat,index)=>{
          filtDatObj[this.state.filters[index]] = dat;
          filtDatObjValues[this.state.filters[index]] = undefined;
        });
        let filterHeads={};
        this.props.filterHeaders.forEach((header,index)=>{
          filterHeads[this.props.filterNames[index]]=header;
        })
        this.setState({
          filtDat:filtDatObj,
          filtDatVals: filtDatObjValues,
          filterHeaders: filterHeads
        });
    }));
    this.showCounter();
    $('.briefs-column').sticky({topSpacing:20});
    $('.filter-column').sticky({topSpacing:20});    
  }

  sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        arr.push({
          'key': prop,
          'value': obj[prop].length
        });
      }
    }
    arr.sort(function (a, b) {
      let key1 = a.value,
        key2 = b.value;
      if (key1 > key2) {
        return -1;
      } else if (key1 == key2) {
        return 0;
      } else {
        return 1;
      }
    });
    return arr; // returns array
  }

  handleCircleClicked(bool) {
    this.setState({
      circleClicked: bool
    })
  }

  handleSelectDateRange(domain) {
    let min = this.state.parseMonth(domain.x[0]),
      max = this.state.parseMonth(domain.x[1])
    // console.log(min, max, "hey min and max")
    this.setState((prevState, props) => {
      prevState.year_value = {
        min: min,
        max: max
      };
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        year_value: {
          min: min,
          max: max
        }
      }
    })
  }

  handleOnChangeMenu(e, value) {
    this.setState((prevState, props) => {
      if (prevState.menu_value !== value || prevState.menu_value === 'undefined' ) {
        prevState.menu_value = value; 
        this.highlightItem(value, 'menu_inactive_item', 'menu_active_item', 'menu');
      } else {
        prevState.menu_value = 'undefined';
        this.highlightItem(value, 'menu_inactive_item', 'menu_inactive_item', 'menu');
      }
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        menu_value: prevState.menu_value
      }
    })
  }
  handleOnChange(e,value,key){
    this.setState((prevState, props) => {
      if (prevState.filtDatVals[key] !== value || prevState.filtDatVals[key] === undefined ) {
        prevState.filtDatVals[key] = value; 
        this.highlightItem(value, key+'_inactive_item', key+'_active_item active_item',key);
      } else {
        prevState.filtDatVals[key] = undefined; 
        this.highlightItem(value, key+'_inactive_item', key+'_inactive_item', key);
      }
      let filteredData = this.getFilteredData(prevState)
      return {
        filteredJSON: filteredData,
        filtDatVals: prevState.filtDatVals
      }
    })
  }


  handleReset(e) {
    this.setState({
      filteredJSON: this.state.dataJSON,
      category: null
    })
    Object.keys(this.state.filtDat).forEach((key,index)=>{
      document.getElementById(key+'-'+this.state.filtDatVals[key]).className=key+'_inactive_item';
    });
    // console.log(this.state.dataJSON, "this.state.dataJSON")
    let end_domain = new Date (this.state.dataJSON[0].date),
      start_domain = new Date (this.state.dataJSON[this.state.dataJSON.length - 1].date)
    this.setState({
      filtDatVals:{},
      year_value: {
        min: 'undefined',
        max: 'undefined'
      },
      start_domain: start_domain,
      end_domain: end_domain
    })
  }

  highlightItem(value, inactive, active, identifier) {
    let elm = document.getElementsByClassName(inactive),
      inactiveClass = inactive,
      activeClass = active;
    let i = 0;
    console.log(value,identifier,elm, inactiveClass, activeClass, "---------active-----")
    while (i < elm.length) {
      i++;
      elm[0].className = activeClass;
    }
    // console.log(document.getElementById(`${identifier}-${value}`), "id", activeClass)
    console.log(activeClass);
    let selectItem = document.getElementById(`${identifier}-${value}`);
    selectItem.className = activeClass;
  }
  checkYear (val, index, arr) {
    if(this.min === 'undefined' || this.max === 'undefined') {
      return true;
    }
    let date_ref = val.date,
      new_date = date_ref.slice(0, 7);
    return new_date >= this.min && new_date <= this.max;
  }
  check(val, index, arr){
    if(this.data[this.filter] === undefined) {
      return true;
    }
    return val[this.filter] === this.data[this.filter];
  }

  getFilteredData(state) {
    let filteredData = this.state.dataJSON;
    this.state.filters.forEach((filter)=>{
      filteredData = filteredData.filter(this.check, {filter:filter,data:state.filtDatVals});
    });
      // console.log(state.start_domain, "state.start_domain",filteredData[0], filteredData)
    filteredData=filteredData.filter(this.checkYear, state.year_value)
    if (filteredData[0] !== undefined){
      state.start_domain = new Date(filteredData[0].date),
      state.end_domain = new Date(filteredData[filteredData.length - 1].date)
    } else {
      state.start_domain = NaN;
      state.end_domain = NaN;
    }
    console.log(filteredData);
    return filteredData;
  }

  showFilters() {
    this.setState({
      height:(Object.keys(this.state.filterHeaders).length / 4) * 229+'px',
      overflow: 'hidden',
      showTapArea: 'none',
      hideTapArea: 'block'
    })
  }

  hideFilters() {
    this.setState({
      height: 0,
      overflow: 'hidden',
      showTapArea: 'block',
      hideTapArea: 'none'
    })
  }

  showCounter() {
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
  }

  getDateRange(arr) {
    let new_arr = arr.sort(function (a, b) {
      let key1 = new Date(a.date),
        key2 = new Date(b.date);
      if (key1 > key2) {
        return -1;
      } else if (key1 == key2) {
        return 0;
      } else {
        return 1;
      }
    });
    // console.log(new_arr, "new_Arr")
    let startDate, endDate;
    if (new_arr.length === 0) {
      startDate = '';
      endDate = '';
    } else {
      startDate = new_arr[new_arr.length - 1].date;
      endDate = new_arr[0].date;
    }
    
    return {
      startDate: startDate,
      endDate: endDate
    }
  }


  renderLaptop() {
    if (this.state.dataJSON === undefined || this.state.filtDat === undefined) {
      let color = '#F02E2E';

      let style = {
        display: '-webkit-flex',
        display: 'flex',
        WebkitFlex: '0 1 auto',
        flex: '0 1 auto',
        WebkitFlexDirection: 'column',
        flexDirection: 'column',
        WebkitFlexGrow: 1,
        flexGrow: 1,
        WebkitFlexShrink: 0,
        flexShrink: 0,
        WebkitFlexBasis: '100%',
        flexBasis: '100%',
        maxWidth: '100%',
        height: '200px',
        WebkitAlignItems: 'center',
        alignItems: 'center',
        WebkitJustifyContent: 'center',
        justifyContent: 'center'
      };
      return(
       <div style={{
          boxSizing: 'border-box',
          display: '-webkit-flex',
          display: 'flex',
          WebkitFlex: '0 1 auto',
          flex: '0 1 auto',
          WebkitFlexDirection: 'row',
          flexDirection: 'row',
          WebkitFlexWrap: 'wrap',
          flexWrap: 'wrap',
        }}>
          <div style={style}><Halogen.RiseLoader color={color}/></div>
        </div>
      )
    } else {
      let optionsObj={};
      this.state.filters.forEach((dat)=> {
        optionsObj[dat] = this.sortObject(Utils.groupBy(this.state.filteredJSON, dat)).map((d, i) => {
          return (
            <tr className={dat+'_inactive_item'} id={`${dat}-${d.key}`}>
              <td id={d.key} key={i} value={d.key} onClick={(e) => this.handleOnChange(e, d.key,dat)}>{d.key}</td>
              <td>{d.value}</td>
            </tr>
          )
        })
      });
      // console.log(this.state.filteredJSON,this.state.filteredJSON.length, "-----------" )

      let number_of_incidents = this.state.filteredJSON.length,
        range = this.state.filteredJSON,
        number_of_digits = number_of_incidents.toString().length,
        length = range.length - 1,
        start_date, end_date;

      if (range.length === 0) {
        start_date = '';
        end_date = '';
      } else {
        let formated_start_date = Utils.formatDate(range[length].date);
        start_date = range[length].date.split("-")[2] + " " +formated_start_date.split(" ")[0].substring(0, 3) + " '" + formated_start_date.split(" ")[1].substring(3, 5)
        let formated_end_date = Utils.formatDate(range[0].date)
        end_date = range[0].date.split("-")[2] + " " +formated_end_date.split(" ")[0].substring(0, 3) + " '" + formated_end_date.split(" ")[1].substring(3, 5) ;
      }

      let styles = {
        height: this.state.height,
        overflow: this.state.overflow,
        transition: 'ease-in 0.3s'
      };
      let first_tap_area_style = {
        display: this.state.showTapArea
      },
      second_tap_area_style = {
        display: this.state.hideTapArea
      }
      let rows=[];
      let num = Object.keys(this.state.filterHeaders).length/4;
      for( let i = 0;i<num;i++){
        rows.push([]);
      }
      let count = -1;
      
      Object.keys(optionsObj).forEach((key,index)=>{
        if(index % 4 === 0){
          count++;
        }
        rows[count].push(key);
      });
      return (
        <div className="banner-area">
          <div className="filter-area">
            <div className="tap-area" style={first_tap_area_style} onClick={(e) => this.showFilters(e)}>
              <span className="arrow-down"></span><div id="tap-me">Tap here to explore data</div><span className="arrow-down"></span>
            </div>
            <div id="filter-region" className="ui grid" style={styles}>
              {
                rows.map((row,index)=>{
                  return(
                    <div className="row">
                      {
                        rows[index].map((key,index)=>{
                          return(
                            <div className="col-sm-4 filter-title">
                              <table>
                                <thead className="table-thead">
                                  <tr>
                                    <th className="table-head">
                                      {this.state.filterHeaders[key]}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="table-tbody">{optionsObj[key]}</tbody>
                              </table>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
            </div>
            <div className="tap-area" style={second_tap_area_style} onClick={(e) => this.hideFilters(e)}>
              <div className="tap-area-div">
                <span className="arrow-up"></span><div id="tap-me">Tap here to hide filters</div><span className="arrow-up"></span>
              </div>
              <button className="reset-all" onClick={(e) => this.handleReset(e)}>Reset</button>
            </div>
          </div>
          <div className="col-sm-16">
            <div className="col-sm-6 filter-title">
              <div className="count-area">
                <div className="number-background">
                  <div className="single-background"></div>
                  <div className="single-background"></div>
                  <div className="single-background"></div>
                </div>
                <div className="display-number">
                  {number_of_digits !== 3 ? <span className="light-text">0</span>:'' }
                  {number_of_digits === 1 ? <span className="light-text">0</span>:'' }
                  <span className="animate-number">{number_of_incidents}</span>
                </div>
              </div>
              <div className="display-text">Instances of lynchings and mob vigilantism were reported 
               {start_date === '' || end_date === '' ? '' : ` from ${start_date} to ${end_date}` }
              </div>
              <TimeBrush dataJSON={this.state.filteredJSON} dimensionWidth={this.props.dimensionWidth} start_domain={this.state.start_domain} end_domain={this.state.end_domain} mode={this.props.mode} handleSelectDateRange={this.handleSelectDateRange}/>
            </div>
            <div className="col-sm-10 filter-title">
              <Map dataJSON={this.state.filteredJSON} topoJSON={this.state.topoJSON} chartOptions={this.props.chartOptions} mode={this.props.mode} circleClicked={this.state.circleClicked} handleCircleClicked={this.handleCircleClicked} circleHover={this.state.circleHover}/>
            </div>
          </div>
          <div className="col-sm-16">
            <div className="protograph-container">
              <List dataJSON={this.state.filteredJSON} mode={this.props.mode} handleCircleClicked={this.handleCircleClicked}/>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    switch(this.props.mode) {
      case 'laptop' :
        return this.renderLaptop();
      case 'mobile' :
        return this.renderLaptop();
    }
  }
}

export default App;

