 var x = new ProtoGraph.Card.toMaps()
  x.init({
  selector: document.querySelector('#card-list-div'),
  dataURL: 'https://dkqrqc7q64awx.cloudfront.net/b0cf35e9943e8e913cdf57d1/index.json',
  topoURL: 'https://s3.ap-south-1.amazonaws.com/cdn.protograph/jal-jagran/src/data/uttar_pradesh-topo.json',
  chartOptions: {
    chartTitle: 'Mob Justice in India',
    height: 500,
    defaultCircleColor: '#F02E2E'
  },
  filterNames:[
    'land_score',
    'forest_score',
    'population_score',
    'rainfall_deficit_score',
    'decadal_decrease_score'
  ],
  filterHeaders:[
    "भूमि उपयोग के लिए रेटिंग",
    "वन कवर के लिए रेटिंग",
    "जनसंख्या के लिए रेटिंग",
    "वर्षा में घाटे के लिए रेटिंग",
    "भूजल स्तर में दशमांश की कमी के लिए रेटिंग"
  ]
})
x.renderLaptop();