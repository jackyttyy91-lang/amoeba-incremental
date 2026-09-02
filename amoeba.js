var game= {
 exponent: 0,
 doubling: 1,
 divisionCost: 5,
 infGain: 0,
 equivalent: 0,
 infinityPoints: 0,
 infMul: 0,
 lastTick: Date.now()
};

function buyGrowth(){
  if(game.exponent >= game.divisionCost){
    game.exponent -= game.divisionCost;
    game.doubling += 1 * game.infMul;
    game.divisionCost *= 1.1;
    game.divisionCost = Math.floor(game.divisionCost);
    
  }
};

setInterval(function(){
game.exponent += game.doubling/20;
game.infGain = game.exponent/1024;
game.infMul = game.infinityPoints + 1;
document.getElementById("exponent").innerText = Math.floor(game.exponent);
document.getElementById("ip").innerText = Math.floor(game.infinityPoints);
document.getElementById("ipMul").innerText = Math.floor(game.infMul);
document.getElementById("division").innerText = Math.floor(game.doubling);
document.getElementById("growthCost").innerText = Math.floor(game.divisionCost);
if (game.exponent >= 1024 || game.infinityPoints >= 1){
document.getElementById("infReqFalse").style.display = "none";
document.getElementById("infReqTrue").style.display = "inline-block";
document.getElementById("goInfinity").innerText = "Infinity";
}else{
document.getElementById("infReqFalse").style.display = "inline-block";
document.getElementById("infReqTrue").style.display = "none";
document.getElementById("goInfinity").innerText = "???";

}
document.getElementById("infGain").innerText = Math.floor(game.infGain);
if (game.exponent >= 1024){
game.equivalent = game.exponent/3.32;
document.getElementById("equal").innerText = "~e" + Math.floor(game.equivalent);
}else{
game.equivalent = 2**Math.floor(game.exponent);
document.getElementById("equal").innerText = Math.floor(game.equivalent);
}
},50 );

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("amoeba", JSON.stringify(game))
}, 15000)

function loadGame(){
var savegame = JSON.parse(localStorage.getItem("amoeba"))
if (savegame !== null) {
  game = savegame
}

if (typeof savegame.exponent !== "undefined") game.exponent = savegame.exponent;

if (typeof savegame.doubling !== "undefined") game.doubling = savegame.doubling;

if (typeof savegame.divisionCost !== "undefined") game.divisionCost = savegame.divisionCost;

if (typeof savegame.infinityPoints !== "undefined") game.infinityPoints = savegame.infinityPoints;
}

function save() { 
  localStorage.setItem("amoeba", JSON.stringify(game));
}

loadGame();

function resetGame(){
 restart =confirm("Are you sure? Your long data (if you have any) will be lost! This cannot be undone!");
 if (restart == true) {
	game.exponent = 0;
	game.doubling = 1;
	game.divisionCost = 5;
	game.infinityPoints = 0;
   save();
  }
}

function tab(tab) {
  // hide all your tabs, then show the one the user selected.
  document.getElementById("main").style.display = "none"
  document.getElementById("options").style.display = "none"

document.getElementById("infinity").style.display = "none"

document.getElementById("achievements").style.display = "none"

document.getElementById(tab).style.display = "inline-block"
}

// go to a tab for the first time, so not all show
tab("main")


function goInf(){
 infConf =confirm("Are you sure? You will lose everything at the expense of infinity points");
 if (infConf == true) {
   game.infinityPoints += Math.floor(game.infGain);
	game.exponent = 0;
	game.divisionCost = 5;
	game.doubling = 1 * (game.infinityPoints + 1);
  }
}

function toggleLightDark(){
  var element = document.body;
  element.classList.toggle("dark-mode");
}
   
