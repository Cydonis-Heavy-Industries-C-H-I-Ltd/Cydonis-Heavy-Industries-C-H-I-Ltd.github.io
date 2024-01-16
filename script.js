/* (C) 2023/2024 Cydonis Heavy Industries (C.H.I), Ltd. */
/* "Tackling life's toughest problems; with science!" */
// CHI Website Core Codebase v0.02a.
// Copyright (GPLv3) (Amanda Hariette Scott, ~40+ years old, December Onwards -->, 2023/2024.
// ------------------------------------------------------------------------------------------
/* Ozymandias... */
//2F2F20466F7220416C6963652E20466F
//722053617368612E20466F7220616C6C
//2074686F73652077686F206861766520
//646965642E204B696C6C656420627920
//6269676F74732C2076696F6C656E6365
//2C2072696768742D77696E6720657874
//72656D697374732C206861727261736D
//656E742C20616E64206861747265642E
//205472616E7320726967687473206172
//652068756D616E20726967687473210D
//0A2F2F20416E6420666F722074686520
//2377686F6C65232068756D616E207261
//63652E20416C6C207E382062696C6C69
//6F6E2070656F706C652E2053616C7661
//74696F6E2066726F6D2074686520636C
//696D6174652063726973697320616E64
//2074686520676C6F62616C2070616E64
//656D69632873292E0D0A2F2F20596F75
//2772652077656C636F6D652C20796F75
//20646F6E277420646573657276652074
//6F2062652073617665642C2062757420
//49276D0D0A2F2F20676F696E6720746F
//2074727920616E6420676F20646F2069
//7420616E797761792E

// Custom Layered Menu |=| Menu Initaliser(s) Start.
// [Must Load First to avoid annoying Chrome/Webkit load ordering race condition bug(s)! Eff you Google for this!]. :-P ^_^v

const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);
const menuItems = document.querySelectorAll(".menuItem");

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)

// End Menu Code block #1.

// Menu Code block #2.
const sideNav = document.querySelector(".sideNav")
const overlay = document.querySelector(".overlay")
const ham = document.querySelector(".ham")
const menuX = document.querySelector(".menuX")
const menuItems = document.querySelectorAll(".menuLink")

menuItems.forEach(menuItem => {
  menuItem.addEventListener("click", toggleHamburger)
})

ham.addEventListener("click", toggleHamburger)
menuX.addEventListener("click", toggleHamburger)
overlay.addEventListener("click", toggleHamburger)

function toggleHamburger() {
  overlay.classList.toggle("showOverlay")
  sideNav.classList.toggle("showNav")
}

// End Menu Code Block #2.
function collapseElementOnLoad() {
  try {
    const targetElement = document.querySelector(".iRVltc.VisitorCounter__VisitorCounterComponent-sc-quvvmc-0 > [href]");

    if (targetElement) {
      targetElement.style.display = "none"; // Hide the element
      console.log("Target element successfully collapsed.");
    } else {
      console.warn("Target element not found.");
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// window.addEventListener("load", collapseElementOnLoad);

/////////////////////////////////////////////////////////////////////////
// Mantra
/*
Lucidity came slowly
I awoke from dreams of untying a great knot
It unraveled like a braid into what seemed were thousands of separate
Strands of fishing line
Attached to a coarse behavior it flowed
A calm it urged, what else is here?

How's it feel to be at the center of magic
To linger in tones and words?
I opened the floodgates and found no water, no current, no river, no rush
How's it feel to stand at the height of your powers
To captivate every heart?
Projecting your visions to strangers who feel it, who listen
Who linger on every word
Oh it's a rush!
Oh it's a rush!

But alone *it feels like dying!*
All alone *I feel so much!*

***I want my offering to woo, to calm, to clear, to solve!***
But the only offering that comes
It calls, it screams, ***there's nothing here!!***

How's it feel to be at the center of magic
To linger in tones and words?
I opened the floodgates and found no water, no current, no river, no rush
How's it feel to stand at the height of your powers
To captivate every heart?
Projecting your visions to strangers who feel it, who listen
Who linger on every word
Oh it's a rush
Oh it's a rush...
*/
// End Mantra...
// JavaScript for the animated canvas.

const canvas = document.getElementById('titleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 3;

const titleText = 'Cydonis Heavy Industries (C.H.I) Ltd.';
const fontSize = 30;
const fontType = 'Verdana';
const rotationSpeed = 0.02;

ctx.font = `${fontSize}px ${fontType}`;
ctx.fillStyle = '#4704E8';
ctx.textAlign = 'center';

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.fillText(titleText, centerX, centerY);

    requestAnimationFrame(animate);
}

animate();

canvas.addEventListener('mouseover', () => {
    canvas.addEventListener('mousemove', rotateText);
});

canvas.addEventListener('mouseout', () => {
    canvas.removeEventListener('mousemove', rotateText);
});

function rotateText(event) {
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const angle = Math.atan2(deltaY, deltaX);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle * rotationSpeed);
    ctx.fillText(titleText, 0, 0);
    ctx.restore();
}

// Event Listener trigger
window.addEventListener("load", collapseElementOnLoad);
// Trigger.

/* Rainbow Text Generator */
/*
$('.text').html(function(i, html) {
  var chars = $.trim(html).split("");

  return '<span>' + chars.join('</span><span>') + '</span>';
});
*/
/* End Rainbow Text Generator function call. */

// || Dynamic Resizer. ||

if (window.addEventListener) {              
    window.addEventListener("resize", browserResize);
} else if (window.attachEvent) {                 
    window.attachEvent("onresize", browserResize);
}
var xbeforeResize = window.innerWidth;

function browserResize() {
    var afterResize = window.innerWidth;
    if ((xbeforeResize < (970) && afterResize >= (970)) || (xbeforeResize >= (970) && afterResize < (970)) ||
        (xbeforeResize < (728) && afterResize >= (728)) || (xbeforeResize >= (728) && afterResize < (728)) ||
        (xbeforeResize < (468) && afterResize >= (468)) ||(xbeforeResize >= (468) && afterResize < (468))) {
        xbeforeResize = afterResize;
        
    //    if (document.getElementById("adngin-try_it_leaderboard-0")) {
    //            adngin.queue.push(function(){  adngin.cmd.startAuction(["try_it_leaderboard"]); });
              }
         
    }
    if (window.screen.availWidth <= 768) {
      restack(window.innerHeight > window.innerWidth);
    }
    fixDragBtn();
    showFrameSize();  
  // End Dynamic Resizer.
      
}
var fileID = "";
// -------------------------------------------------------------------------
/* EOF. EOL. MCP CORE PROTOCOLS CEASED. TRON WINS. 101010101010111111. */
