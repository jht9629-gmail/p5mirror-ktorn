

const DB_NAME = "multiplication-attempts";

let db_name = DB_NAME;

let apiKey = ""
let authDomain = "";
let databaseURL = "";
let projectId = "";
let storageBucket = "";
let messagingSenderId = "";
let debug = "";

let d;
let pp;
let i_apiKey;
let i_authDomain;
let i_databaseURL;
let i_projectId;
let i_storageBucket;
let i_messagingSenderId;
let c_debug;

let d_save;
let i_save;
let b_toggle;

let isInit = false;
let isConfigExpanded = false;

function initConfig() {
  
  b_toggle = createButton("Show config");
  b_toggle.mousePressed(toggleConfig);
  
  d = createDiv();
  
  pp = createP("apiKey: ");
  i_apiKey = createInput('');
  pp.child(i_apiKey);
  pp.parent(d);
  
  pp = createP("authDomain: ");
  i_authDomain = createInput('');
  pp.child(i_authDomain);
  pp.parent(d);
  
  pp = createP("databaseURL: ");
  i_databaseURL = createInput('');
  pp.child(i_databaseURL);
  pp.parent(d);
  
  pp = createP("projectId: ");
  i_projectId = createInput('');
  pp.child(i_projectId);
  pp.parent(d);
  
  pp = createP("storageBucket: ");
  i_storageBucket = createInput('');
  pp.child(i_storageBucket);
  pp.parent(d);
  
  pp = createP("messagingSenderId: ");
  i_messagingSenderId = createInput('');
  pp.child(i_messagingSenderId);
  pp.parent(d);
  
  //pp = createP("debug: ");
  c_debug = createCheckbox(' debug');
  pp.child(c_debug);
  pp.parent(d);
  
  d_save = createDiv();
  d_save.style("display", "flex");
  d_save.style("flex-wrap", "wrap");
  i_save = createButton("Save");
  i_save.mousePressed(saveConfig);
  i_save.parent(d_save);
  d_save.parent(d);
  
  loadConfig();
}

function initFirebase() {
  
  if(debug) {
    db_name = DB_NAME + "-debug";
  }
  
  // Initialize Firebase
  var config = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
  };
  
  
  if (!firebase.apps.length) {
   firebase.initializeApp(config);
  }else {
   firebase.app(); // if already initialized, use that one
  }
  
  database = firebase.database();
    
  var ref = database.ref(db_name);
  ref.on("value", gotData, errData);
}

function submitAttempt(data) {
  var ref = database.ref(db_name);
  ref.push(data);
}

function gotData (data) {
	let attempts = data.val();
  
    if(attempts) {
      let keys = Object.keys(attempts);

      for (var i = 0; i < keys.length; i++) {
          let k = keys[i];
          let nums = attempts[k].nums;
          let timeStarted = Date.parse(attempts[k].timeStarted);
          let timeCompleted = Date.parse(attempts[k].timeCompleted);
          let timeDiff = (timeCompleted - timeStarted)/1000;
          let incorrectAttempts = attempts[k].incorrectAttempts;
          // print("["+nums[0]+"x"+nums[1]+"] inc:[" + incorrectAttempts + "] time: [" + timeDiff + "s]");
          multTable.addAttempt(k, attempts[k]);
      }
    }
}

function errData(err) {
	console.log('Error!');
  	console.log(err);
}

function renderConfig() {
  
  
  if (isConfigExpanded) {
    d.show();
    b_toggle.html("Hide config");
  } else {
     d.hide();
     b_toggle.html("Show config");
  }
  
}

function toggleConfig() {
  isConfigExpanded = !isConfigExpanded;
}

function saveConfig() {
  apiKey = i_apiKey.value();
  authDomain = i_authDomain.value();
  databaseURL = i_databaseURL.value();
  projectId = i_projectId.value();
  storageBucket = i_storageBucket.value();
  messagingSenderId = i_messagingSenderId.value();
  debug = c_debug.checked();

  storeItem('apiKey', apiKey);
  storeItem('authDomain', authDomain);
  storeItem('databaseURL', databaseURL);
  storeItem('projectId', projectId);
  storeItem('storageBucket', storageBucket);
  storeItem('messagingSenderId', messagingSenderId);
  storeItem('debug', debug);
  
  let p_saved = createP("Config saved.")
  d_save.child(p_saved);
  setTimeout(() => {p_saved.remove()}, 1000);
  
  initFirebase();
}

function loadConfig() {
  apiKey = getItem('apiKey');
  authDomain = getItem('authDomain');
  databaseURL = getItem('databaseURL');
  projectId = getItem('projectId');
  storageBucket = getItem('storageBucket');
  messagingSenderId = getItem('messagingSenderId');
  debug = getItem('debug');
  
  i_apiKey.value(apiKey);
  i_authDomain.value(authDomain);
  i_databaseURL.value(databaseURL);
  i_projectId.value(projectId);
  i_storageBucket.value(storageBucket);
  i_messagingSenderId.value(messagingSenderId);
  c_debug.checked(debug);
}

