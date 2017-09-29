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
    'classification',
    "was_incident_planned",
    'state',
    'party_whose_chief_minister_is_in_power',
    "area_classification",
    "judge_to_population_in_state",
    "police_to_population_in_state",
    "police_vehicles_per_km",
    "did_the_police_intervene",
    "did_the_police_intervention_prevent_death",
    "does_state_have_village_defence_force",
    "victim_social_classification",
    "accused_social_classification"
  ],
  filterHeaders:[
    "What led to the violence?",
    "Was the incident planned?",
    "States that have the most incidents",
    "Party whose Chief Minister was in power",
    "Area type",
    "Judge to population ratio",
    "Police to population ratio",
    "Police vehicles per sq. km",
    "Did the police intervene?",
    "Did the police intervention prevent death?",
    "Does state have village defence force?",
    "Victim social classification",
    "Accused social classification"
  ]
})
x.renderLaptop();