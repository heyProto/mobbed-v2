 var x = new ProtoGraph.Card.toMaps()
  x.init({
  selector: document.querySelector('#card-list-div'),
  dataURL: "http://protograph.indianexpress.com/49a045aea2b71456f5d04f4a/index.json",
  topoURL: 'http://protograph.indianexpress.com/ie-mobbed/src/data/india-topo.json',
  chartOptions: {
    chartTitle: 'Mob Justice in India',
    height: 500,
    defaultCircleColor: '#F02E2E'
  },
  filterNames:[
    "is_hate_crime",
    "is_gender_hate_crime",
    "is_caste_hate_crime",
    "is_race_hate_crime",
    "is_religion_hate_crime",
    "is_political_affiliation_hate_crime",
    "is_sexual_orientation_and_gender_identity_hate_crime",
    "is_disability_hate_crime",
    "is_ethnicity_hate_crime",
    'classification',
    "was_incident_planned",
    'state',
    'party_whose_chief_minister_is_in_power',
    "area_classification",
    "victim_social_classification",
    "accused_social_classification"
  ],
  filterHeaders:[
    "Is it a hate crime?",
    "Based on gender",
    "Based on caste",
    "Based on race",
    "Based on religion",
    "Based on political affiliation",
    "Based on sexual orientation and gender identity",
    "Based on disability",
    "Based on ethnicity",
    "What led to the violence?",
    "Was the incident planned?",
    "States that have the most incidents",
    "Party whose Chief Minister was in power",
    "Area type",
    "Victim social classification",
    "Accused social classification"
  ]
})
x.renderLaptop();