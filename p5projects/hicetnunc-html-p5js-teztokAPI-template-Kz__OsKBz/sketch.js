// TEZTOK API TEMPLATE

// 🚨 this template uses an external API (Teztok)
// If Teztok changes its API or stops functioning
// already minted OBJKTs may be permanently broken

// p5.js template for minting on Teia
// By @ktorn


// Based on Hicdex template by Raphaël de Courville (@sableraph)
// Original code: https://github.com/SableRaf/HicEtNunc-p5js-templates

// teia code is adapted from https://github.com/teia-community/teia-templates/tree/main/html-p5js-template
// More teia html templates (three.js, glsl, etc) can be found at
// https://github.com/teia-community/teia-templates/tree/main

// 🤓 Note: replace thumbnail.png with your own thumbnail

// **************************
// *        COLORS          *
// **************************

const paletteArray = [
  "https://coolors.co/ffadad-ffd6a5-fdffb6-caffbf-9bf6ff-a0c4ff-bdb2ff-ffc6ff",
  "https://coolors.co/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529",
];

let colors = [];

function getColorsFrom(palArray, index) {
  if (index > palArray.length) {
    console.error(
      `You are trying to get color palette at index ${index} but the color palette array is only of length ${palArray.length}`
    );
    return;
  }
  let paletteUrl = palArray[index];
  console.log("🎨 color palette: " + paletteUrl);
  let colorArray = paletteUrl.match(/[0-9a-f]{6}/g).map((c) => color(`#${c}`));
  return colorArray;
}

// **************************
// *    OBJKT DATA    *
// **************************

// If you want to create OBJKT's with different seeds,
// you can access the creator and viewer wallet ids.
// This values will only be injected once the piece has been minted
// they will not work locally.
const creator = new URLSearchParams(window.location.search).get("creator");
const viewer = new URLSearchParams(window.location.search).get("viewer");
// NOTE: if the user is viewing the page on hicetnunc while unsynced,
// the viewer variable will return a string of value "false" (NOT a boolean)

// The ID of the OBJKT is also passed via the URL parameters
const objkt = new URLSearchParams(window.location.search).get("objkt");
// NOTE: when the object is viewed in the preview page
// the objkt variable will return a string of value "false" (NOT a boolean)

let OBJKTdata;


console.log("NFT created by", creator); // null if local
console.log("NFT viewed by", viewer); // null if local
console.log("OBJKT ID is", objkt); // null if local

const DEFAULTSEED = 1234;
let viewerSeed = DEFAULTSEED;

const DUMMY = "tz1dd2tmTJFRJh8ycLuZeMpKLquJYkMypu2Q"; // simulate a synced viewer (user a different address to try another viewer)
const UNSYNCED = "false"; // simulate an unsynced user

const PREVIEW = "false"; // simulate the preview page
const DUMMY_OBJKT = 230177; // simulate an OBJKT ID

// Default is viewer. Try with DUMMY or UNSYNCED only for debugging
// let viewerData = viewer;
//let viewerData = UNSYNCED;
let viewerData = DUMMY;

// Default is creator. Try with DUMMY only for debugging
// let creatorData = creator;
let creatorData = DUMMY;

// Default is objkt. Try with DUMMY_OBJKT or PREVIEW_OBJKT only for debugging
// let objktID = objkt; // will cause errors when ran locally (objkt is null)
let objktID = DUMMY_OBJKT;
//let objktID = PREVIEW;

// Check if we have a viewer
let viewerWasFound = viewerData && !viewerData.includes("false");

// **************************
// *       PARAMETERS       *
// **************************

// Set this to true when minting
p5.disableFriendlyErrors = false;

// The title of your piece goes here (not visible on hicetnunc)
document.title = "My beautiful p5.js sketch";

// Describe what your piece looks like to screen reader users
let description = "";

let txtSize = 32;

// **************************
// *    GLOBAL VARIABLES    *
// **************************

let objktMetadata = {};

let owners = [];

let viewerIsOwner = false; // we will set this based on the hicdex query

let isPreview = objktID === "false";

let dataFinishedLoading = false;

let bubbles;
let bubblesCreated = false;
const BUBBLE_SIZE_UNIT = 50;

// **************************
// *        PRELOAD         *
// **************************

function preload() {
  if (!isPreview) {
    fetchData(objktID)
      .then((data) => checkViewerIsOwner(data))
      .then(() => {
        colors = getColors(viewerIsOwner);
      })
      .then(() => {
        dataFinishedLoading = true;
      });
  } else {
    console.warn(
      "This sketch doesn't have an OBJKT ID yet (preview mode?). Unable to fetch data"
    );
  }
}

// **************************
// *          SETUP         *
// **************************

function setup() {
  
  randomSeed(viewerSeed);
  
  createCanvas(windowWidth, windowHeight);

  describe(description); // Create a screen reader accessible description for the canvas
  
  bubbles = [];

  push();
  stroke(0);
  strokeWeight(8);
  strokeJoin(ROUND);
  fill(255);

  if (isPreview) {
    console.log("Preview mode");
  }
  
}

// **************************
// *          DRAW          *
// **************************

function draw() {
  background(255);
  fill(255);
  stroke(0);

  if (dataFinishedLoading) {
    if (viewerIsOwner === true) {
      showOwnerArt();
    } else {
      showDefaultArt();
    }
  }

  text(`OBJKT #${objktID}`, txtSize, height - txtSize);
}

// We do this if the viewer owns the OBJKT
function showOwnerArt() {
  background("rgb(182,250,182)");
  createBubbles();
  showBubbles();
  text(`You own this NFT`, txtSize, txtSize * 2);
}

// We do that if the viewer does NOT own the OBJKT
function showDefaultArt() {
  background("rgb(216,215,215)");
  createBubbles();
  showBubbles();
  text(`You do not own this NFT`, txtSize, txtSize * 2);
}

function createBubbles() {
  if (!bubblesCreated) {
    
    print("Creating bubbles!");
    
    // console.log("###### " + JSON.stringify(OBJKTdata, null, 2))
    
    let holdings = OBJKTdata.holdings;
    
    // print("holdings: " + holdings.length)
    
    for (let i = 0; i < holdings.length; i++) {
      
      let owner = holdings[i];
      
      // print("holder[" + i + "] = " + JSON.stringify(owner, null, 2))

      let ownerName = truncate(owner.holder_address, 12);
      
      if(owner.holder_profile && owner.holder_profile.name) {
        ownerName = owner.holder_profile.name;
      }
      
      print("holder[" + i + "] = " + ownerName + " - " + owner.amount);
      
      let bubbleSize = BUBBLE_SIZE_UNIT * owner.amount;
      let textSize = getTextSize(ownerName, bubbleSize);
      
      let newBubble = { x: random(width),
                        y: random(height),
                        size: bubbleSize,
                        text: ownerName,
                        textSize: textSize,
                        address: owner.holder_address
                      }
      
      bubbles.push(newBubble);
    
    
    }

    bubblesCreated = true;
  }
}

function showBubbles() {
  
  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    
    push();
    
    strokeWeight(1);
    
    if(bubble.address == viewerData) {
      fill(255, 0, 0, 100);
    } else {
      fill(0, 50);
    }
    
    noStroke();
    circle(bubble.x, bubble.y, bubble.size);
    
    textAlign(CENTER, CENTER);
    textSize(bubble.textSize);
    
    if(bubble.address == viewerData) {
      fill(255, 255);
    }
    else {
      fill(255, 100);
    }
    text(bubble.text, bubble.x, bubble.y);
    
    pop();
  }
}

function getColors(isColor) {
  if (isColor) {
    return getColorsFrom(paletteArray, 0);
  } else {
    return getColorsFrom(paletteArray, 1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Function to adjust text size to fit within the circle
function getTextSize(str, maxSize) {
  let size = 32; // Initial text size
  textSize(size);
  
  // Decrease text size until it fits within the circle
  while (textWidth(str) > maxSize || textAscent() + textDescent() > maxSize) {
    size--;
    textSize(size);
  }
  
  return size;
}


