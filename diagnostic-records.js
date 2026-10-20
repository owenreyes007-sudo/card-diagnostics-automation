/* Fictional records for Northstar's local training simulation. */
window.NorthstarDiagnosticRecords = {
  activation: {
    title: 'Select Card to Diagnose', kind: 'card',
    records: [
      {id:'card-1842', label:'Northstar debit card', identifier:'Card ending 1842', status:'Not activated · delivered', detail:'Issued Oct 05, 2026 · Activation request available', scenarioIds:['activation-device-mismatch']},
      {id:'card-4821', label:'Replacement debit card', identifier:'Card ending 4821', status:'Not activated · delivered', detail:'Replacement request RP-76882 · Issued Oct 18, 2026 · Delivered Oct 19, 2026', scenarioIds:['activation-ready']},
      {id:'card-9037', label:'Northstar debit card', identifier:'Card ending 9037', status:'Activation attempt failed · error unavailable', detail:'Activation event AC-39017 · Failed · Error detail unavailable', scenarioIds:['activation-unconfirmed']}
    ]
  },
  decline: {
    title:'Select Transaction to Diagnose', kind:'transaction', searchable:true,
    records:[
      {id:'txn-884201',label:'Corner Coffee',identifier:'TXN-884201',date:'Oct 19, 2026 · 8:42 AM',amount:'$38.50 USD',status:'Declined',card:'Card ending 1842',detail:'Available demo balance at the time: $24.00 USD',scenarioIds:['decline-balance-demo']},
      {id:'txn-884155',label:'Market Square',identifier:'TXN-884155',date:'Oct 18, 2026 · 6:14 PM',amount:'$42.18 USD',status:'Approved',card:'Card ending 1842',detail:'Approved purchase · Customer confirmation needed to link it to the reported decline',scenarioIds:['decline-cleared']},
      {id:'txn-883992',label:'Metro Ride',identifier:'TXN-883992',date:'Oct 17, 2026 · 9:03 AM',amount:'$16.00 USD',status:'Declined',card:'Card ending 4821',detail:'Decline reason field is unavailable in the demo record',scenarioIds:['decline-reason-missing']}
    ]
  },
  delivery:{
    title:'Select Delivery Request',kind:'delivery',
    records:[
      {id:'del-62014',label:'Card delivery request',identifier:'DL-62014',date:'Oct 05, 2026',status:'Delivery exception',card:'Card ending 1842',estimate:'Oct 12, 2026',detail:'Latest configured event: address confirmation exception · Oct 19, 2026 · 2:10 PM',scenarioIds:['delivery-exception']},
      {id:'del-61983',label:'Card delivery request',identifier:'DL-61983',date:'Oct 03, 2026',status:'Delivered',card:'Card ending 4821',estimate:'Oct 10, 2026',detail:'Delivered Oct 05, 2026 · Customer receipt confirmed',scenarioIds:['delivery-confirmed']},
      {id:'del-62102',label:'Card delivery request',identifier:'DL-62102',date:'Oct 16, 2026',status:'Tracking unavailable',card:'Card ending 9037',estimate:'Not configured',detail:'No latest tracking event is available in this record',scenarioIds:['delivery-tracking-missing']}
    ]
  },
  replacement:{
    title:'Select Replacement Request',kind:'replacement',
    records:[
      {id:'rep-77104',label:'Replacement inquiry',identifier:'RP-77104',date:'Oct 19, 2026',status:'No replacement order recorded',card:'Card ending 1842',reason:'Damaged card',detail:'Chip damage is documented; replacement has not been initiated',scenarioIds:['replacement-damage']},
      {id:'rep-76882',label:'Card replacement request',identifier:'RP-76882',date:'Oct 12, 2026',status:'Fulfilled',card:'Card ending 4821',reason:'Damaged card',detail:'Replacement delivered Oct 18 and receipt confirmed',scenarioIds:['replacement-complete']},
      {id:'rep-77215',label:'Replacement inquiry',identifier:'RP-77215',date:'Oct 19, 2026',status:'Reason not recorded',card:'Card ending 1842',reason:'Unavailable',detail:'No loss, damage, or replacement order is documented',scenarioIds:['replacement-reason-missing']}
    ]
  },
  notworking:{
    title:'Select Card to Diagnose',kind:'card',
    records:[
      {id:'use-1842',label:'Northstar debit card',identifier:'Card ending 1842',status:'Active · unlocked',detail:'TXN-883991 · Chip read error · Oct 19, 2026 · 6:14 PM',symptom:'Chip payment',scenarioIds:['notworking-chip-error']},
      {id:'use-4821',label:'Northstar debit card',identifier:'Card ending 4821',status:'Active · unlocked',detail:'Latest linked test TXN-884309 approved Oct 20, 2026 · 10:04 AM · Contactless',symptom:'Recent card use',scenarioIds:['notworking-clear']},
      {id:'use-9037',label:'Northstar debit card',identifier:'Card ending 9037',status:'Active · unlocked',detail:'No matching attempt reference in this record',symptom:'Attempt details unavailable',scenarioIds:['notworking-details-missing']}
    ]
  },
  restrictions:{
    title:'Select Card to Diagnose',kind:'card',
    records:[
      {id:'control-1842',label:'Northstar debit card',identifier:'Card ending 1842',status:'Locked in card controls',detail:'Control event CT-1028 · Oct 19, 2026 · 8:32 PM · Linked attempt TXN-884612 declined after lock',scenarioIds:['restriction-customer-lock']},
      {id:'control-4821',label:'Northstar debit card',identifier:'Card ending 4821',status:'Active · unlocked',detail:'No current restriction indicator recorded',scenarioIds:['restriction-clear']},
      {id:'control-9037',label:'Northstar debit card',identifier:'Card ending 9037',status:'Restriction status unavailable',detail:'Restriction source event is not available',scenarioIds:['restriction-status-missing']}
    ]
  }
};

