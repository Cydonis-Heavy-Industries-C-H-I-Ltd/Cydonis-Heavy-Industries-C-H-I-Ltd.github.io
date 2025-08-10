/* (C) 2023/2024/2025 Cydonis Heavy Industries (C.H.I), Ltd. */
/* "Tackling life's toughest problems; with science!" */
// CHI Website Core Codebase v0.02a.
// Copyright (GPLv3) (Amanda Hariette Scott, ~41+ years old, December Onwards -->, 2023/2024/2025/2026.
/*
          _       _        _          _                  _                _                    _             _        
        /\ \     /\ \     /\_\       /\ \               /\ \             /\ \     _           /\ \          / /\      
       /  \ \    \ \ \   / / /      /  \ \____         /  \ \           /  \ \   /\_\         \ \ \        / /  \     
      / /\ \ \    \ \ \_/ / /      / /\ \_____\       / /\ \ \         / /\ \ \_/ / /         /\ \_\      / / /\ \__  
     / / /\ \ \    \ \___/ /      / / /\/___  /      / / /\ \ \       / / /\ \___/ /         / /\/_/     / / /\ \___\ 
    / / /  \ \_\    \ \ \_/      / / /   / / /      / / /  \ \_\     / / /  \/____/         / / /        \ \ \ \/___/ 
   / / /    \/_/     \ \ \      / / /   / / /      / / /   / / /    / / /    / / /         / / /          \ \ \       
  / / /               \ \ \    / / /   / / /      / / /   / / /    / / /    / / /         / / /       _    \ \ \      
 / / /________         \ \ \   \ \ \__/ / /      / / /___/ / /    / / /    / / /      ___/ / /__     /_/\__/ / /      
/ / /_________\         \ \_\   \ \___\/ /      / / /____\/ /    / / /    / / /      /\__\/_/___\    \ \/___/ /       
\/____________/          \/_/    \/_____/       \/_________/     \/_/     \/_/       \/_________/     \_____\/        
                                                                                                                      
*/
// ------------------------------------------------------------------------------------------#
/* Ozymandias Protocol... */
/* Arguments for understand-ability:

  [*]  Progress of science: Through the scientific method, we have continually improved our understanding of the universe, from ancient Greek models to modern-day physics. Every advancement brings us closer to a coherent picture.
  [*]  Limits of the universe: Some argue that the universe has fundamental laws and mechanisms, which, while complex, *are ultimately comprehensible by a sufficiently advanced intellect.* {Cydonis Heavy Industries, C.H.I Ltd England, UK, Planet Earth, at your service... ;-) ^_^v}
  [*]  Nature of scientific inquiry: Science is a dynamic process, constantly refining and evolving our understanding. With time, we may develop new tools and paradigms for even deeper exploration.

Arguments against understand-ability:

 [*]   Complexity of the universe: The universe is vast and contains phenomena on scales beyond our current grasp, like quantum mechanics and dark matter. Its complexity might forever outpace our ability to fully understand it.
 [*]   Fundamental limits of knowledge: Some philosophical arguments suggest inherent limitations to human knowledge, preventing us from ever capturing the true nature of reality.
 [*]   Openness of the future: While science can predict based on current knowledge, truly unexpected discoveries can reshape our understanding, highlighting the unknown unknowns ahead.

Impact of time:

 [*]   More data and observations: Time allows for accumulating more data through telescopes, experiments, and exploration, potentially revealing new patterns and insights.
 [*]   Technological advancements: Technological progress might provide new tools for exploration, like more powerful telescopes or AI-assisted analysis, aiding in understanding.
 [*]   Shifting paradigms: With time, scientific paradigms can shift, potentially leading to entirely new frameworks for understanding the universe.*/
// ------------------------------------------------------------------------------------------#
WebFontConfig = {
  google: {
    families: ['Roboto:300,400,500']
  }
};

(function(d) {
  var wf = d.createElement('script'), s = d.scripts[0];
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
  s.parentNode.insertBefore(wf, s);
})(document);
// ------------------------------------------------------------------------------------------#

// Title Scroller.
var msg  = document.title;
      var speed = 150;
      var endChar = "... ";
      var pos = 0;
      
      function moveTitle()
      {
       	var ml = msg.length;
      		
      	title = msg.substr(pos,ml) + endChar + msg.substr(0,pos);
    	document.title = title;
      	
        pos++;
    	if (pos > ml) pos=0;
        window.setTimeout("moveTitle()",speed);
      }
  
      moveTitle();
// End Title Scroller.

/*
 [*] jQuery YouTube Popup Player Plugin v2.4... 
 */
(function ($, window) {
	var YouTubeDialog = null,
        defaultCss = {},
        methods = {
            //initialize plugin
            init: function (options) {
                options = $.extend({}, $.fn.YouTubePopup.defaults, options);

                // initialize YouTube Player Dialog
                if (YouTubeDialog === null) {
                    YouTubeDialog = $('<div>').css({
                        display: 'none',
                        padding: 0
                    });
                    $('body').append(YouTubeDialog);
                    YouTubeDialog.dialog({
                        autoOpen: false,
                        resizable: false,
                        draggable: options.draggable,
                        modal: options.modal,
                        dialogClass: options.cssClass,
                        create: function () {
                            defaultCss.backgroundImage = $(".ui-dialog").css('background-image');
                            defaultCss.border = $(".ui-dialog").css('border');
                            defaultCss.backgroundColor = $(".ui-dialog").css('background-color');
                        },
                        close: function () {
                            YouTubeDialog.html('');
                            $(".ui-dialog-titlebar").show();
                            $(".ui-dialog").css({
                                'background-image': defaultCss.backgroundImage,
                                'border': defaultCss.border,
                                'background-color': defaultCss.backgroundColor
                            });
                        }
                    });
                }

                return this.each(function () {
                    var obj = $(this),
                        data = obj.data('YouTube'),
                        youtubeId,
                        videoTitle,
                        YouTubeURL,
                        $titleBar;
                    if (!data) { //check if event is already assigned
                        obj.data('YouTube', {
                            target: obj
                        });
                        $(obj).bind('click.YouTubePopup', function (event) {
                            youtubeId = options.youtubeId;
                            if ($.trim(youtubeId) === '' && obj.is("a")) {
                                youtubeId = getYouTubeIdFromUrl(obj.attr("href"));
                            }
                            if ($.trim(youtubeId) === '' || youtubeId === false) {
                                youtubeId = obj.attr(options.idAttribute);
                            }
                            videoTitle = $.trim(options.title);
                            if (videoTitle === '') {
                                if (options.useYouTubeTitle) {
                                    setYouTubeTitle(youtubeId);
                                } else {
                                    videoTitle = obj.attr('title');
                                }
                            }

                            //Format YouTube URL
                            YouTubeURL = window.location.protocol + "//www.youtube.com/embed/" + youtubeId + "?rel=0&showsearch=0&autohide=" + options.autohide;
                            YouTubeURL += "&autoplay=" + options.autoplay + "&controls=" + options.controls + "&fs=" + options.fs + "&loop=" + options.loop;
                            YouTubeURL += "&showinfo=" + options.showinfo + "&color=" + options.color + "&theme=" + options.theme;

                            //Setup YouTube Dialog
                            YouTubeDialog.html(getYouTubePlayer(YouTubeURL, options.width, options.height));
                            YouTubeDialog.dialog({ //reset width and height
                                width: 'auto',
                                height: 'auto'
                            });
                            YouTubeDialog.dialog({
                                minWidth: options.width,
                                minHeight: options.height,
                                title: videoTitle
                            });
                            YouTubeDialog.dialog('open');
                            $(".ui-widget-overlay").fadeTo('fast', options.overlayOpacity); //set Overlay opacity
                            $titleBar = $(".ui-dialog-titlebar");
                            if (options.hideTitleBar && options.modal) { //hide Title Bar (only if Modal is enabled)
                                $titleBar.hide(); //hide Title Bar
                                $(".ui-widget-overlay").click(function () { //automatically assign Click event to overlay
                                    YouTubeDialog.dialog("close");
                                });
                            }
                            if (options.clickOutsideClose && options.modal) { //assign clickOutsideClose event only if Modal option is enabled
                                $(".ui-widget-overlay").click(function () {
                                    YouTubeDialog.dialog("close");
                                });
                            }
                            $titleBar.removeClass("ui-corner-all").addClass("ui-corner-top"); //only round the top corners on titlebar
                            if (!options.showBorder) {
                                $(".ui-dialog").css({
                                    'background-image': 'none',
                                    'border': 'none',
                                    'background-color': 'transparent'
                                });
                            }
                            event.preventDefault();
                        });
                    }
                });
            },
            destroy: function () {
                return this.each(function () {
                    $(this).unbind(".YouTubePopup");
                    $(this).removeData('YouTube');
                });
            }
        };

	function getYouTubePlayer(URL, width, height) {
		var YouTubePlayer = '<iframe title="YouTube video player" style="margin:0; padding:0;" width="' + width + '" ';
		YouTubePlayer += 'height="' + height + '" src="' + URL + '" frameborder="0" allowfullscreen></iframe>';
		return YouTubePlayer;
	}

	function setYouTubeTitle(id) {
        $.ajax({
            url: window.location.protocol + '//query.yahooapis.com/v1/public/yql',
            data: {
                q: "select * from json where url ='http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=" + id + "&format=json'",
                format: "json"
            },
            dataType: "jsonp",
            success: function (data) {
                if (data && data.query && data.query.results && data.query.results.json) {
                    YouTubeDialog.dialog({
					   title: data.query.results.json.title
				    });
                }
            }
        });
	}

	function getYouTubeIdFromUrl(youtubeUrl) {
		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
            match = youtubeUrl.match(regExp);
		if (match && match[2].length === 11) {
			return match[2];
		} else {
			return false;
		}
	}

	$.fn.YouTubePopup = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.YouTubePopup');
		}
	};

	//default configuration
	$.fn.YouTubePopup.defaults = {
		'youtubeId': '',
		'title': '',
		'useYouTubeTitle': true,
		'idAttribute': 'rel',
		'cssClass': 'YouTubeDialog',
		'draggable': false,
		'modal': true,
		'width': 640,
		'height': 480,
		'hideTitleBar': false,
		'clickOutsideClose': false,
		'overlayOpacity': 0.5,
		'autohide': 2,
		'autoplay': 0,
		'color': 'red',
		'controls': 1,
		'fs': 1,
		'loop': 0,
		'showinfo': 0,
		'theme': 'light',
		'showBorder': true
	};
})(jQuery, window);
// #End# jQuery YouTube Popup Player Plugin.

// Shhhhhhhhh! ;-P ^_^v
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
// #------------------------------------------------------------------#
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// #------------------------------------------------------------------#
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// Geolocation.
const x = document.getElementById("geo-demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else { 
    window.console.info = "Geolocation is not supported by this browser.";
  }
}
    
function showPosition(position) {
    x.innerHTML="Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
}
// #--------------------------------------------------------------------------------------------------------------------------#
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

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)

// End Menu Code block #1.

// Video Loading Randomiser

//Create a cookie if none already exists.
document.cookie = "visited=hasVisited; expires=Wed, 25 Dec 2030 12:00:00 UTC; path=/";
// Check for existing cookie.
const hasVisitedCookie = document.cookie.includes("hasVisited");

// Video Randomiser Functionality.
function cycleBackgroundVideo() {
  // Array of video file paths for the randomiser:
  const videoPaths = [
    "./blue/stack-of-tvs.mp4",                    // Current default
    "./sim-demo-4k-improved-scalar_model.mp4",    // Wormhole simulation
    "./blue/Lorn_Sega_Sunset_1080p.mp4",          // Lorn Protocol
    "./Time Vortex Experiment_1080p.mp4",          // Vortex experiment
    "./red/1k_core_system.mp4",                   // Core system
    "./blue/fires_of_CHI_1080p.mp4",              // Fires of CHI
    "./blue/facility-concept-anim.mp4",            // Facility concept
    "./red/Ratatosk_System_Concept_Render.mp4",   // Ratatosk system
    "./red/sim-run-alpha3_1080p.mp4",             // Sim run alpha
    "./red/chi-the-ultimate.mp4",                  // CHI the ultimate
    // Add more videos as needed
  ];

  // Get a random video path:
  const randomIndex = Math.floor(Math.random() * videoPaths.length);
  const randomVideoPath = videoPaths[randomIndex];

  // Get the video element:
  const videoElement = document.getElementById("background-video");
  
  if (videoElement) {
    console.log("🎲 Rolling for video... Random index:", randomIndex);
    console.log("🎬 Selected video:", randomVideoPath);
    
    // Create a new source element
    const newSource = document.createElement('source');
    newSource.src = randomVideoPath;
    newSource.type = 'video/mp4';
    
    // Clear existing sources and add the new one
    videoElement.innerHTML = '';
    videoElement.appendChild(newSource);
    
    // Load and play the video
    videoElement.load();
    
    // Add event listeners to track loading
    videoElement.addEventListener('loadstart', () => console.log("📹 Video loading started"));
    videoElement.addEventListener('canplay', () => console.log("✅ Video can play"));
    videoElement.addEventListener('error', (e) => {
      console.error("❌ Video failed to load:", randomVideoPath, e);
      // Fallback to default video if random one fails
      const fallbackSource = document.createElement('source');
      fallbackSource.src = "./blue/stack-of-tvs.mp4";
      fallbackSource.type = 'video/mp4';
      videoElement.innerHTML = '';
      videoElement.appendChild(fallbackSource);
      videoElement.load();
      console.log("🔄 Fallback to default video");
    });
    
    videoElement.play().catch(function(error) {
      console.log("⚠️ Video autoplay failed:", error);
    });
    
    console.log("🎬 Video randomiser activated!");
  } else {
    console.warn("⚠️ Background video element not found!");
  }
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log("🚀 DOM loaded, calling video randomiser...");
  cycleBackgroundVideo();
});

// Also try on window load as backup
window.addEventListener('load', function() {
  console.log("🌐 Window loaded, checking video randomiser...");
  const videoElement = document.getElementById("background-video");
  if (videoElement) {
    console.log("✅ Video element found on window load");
  } else {
    console.warn("❌ Video element not found on window load");
  }
});

// Optional: Set an interval to cycle the videos automatically every 60 seconds
// Uncomment the line below to enable automatic cycling:
// setInterval(cycleBackgroundVideo, 60000);
// Make openDropdown available globally for the onclick handler
// document.onload = cycleBackgroundVideo();
// document.onloadstart = cycleBackgroundVideo();
// Menu Code block #2.
const sideNav = document.querySelector(".sideNav")
const overlay = document.querySelector(".overlay")
const ham = document.querySelector(".ham")
const menuX = document.querySelector(".menuX")
const menuLinks = document.querySelectorAll(".menuLink")

menuLinks.forEach(menuItem => {
  menuItem.addEventListener("click", toggleHamburger)
})

ham.addEventListener("click", toggleHamburger)
menuX.addEventListener("click", toggleHamburger)
overlay.addEventListener("click", toggleHamburger)

function toggleHamburger() {
  overlay.classList.toggle("showOverlay")
  sideNav.classList.toggle("showNav")
}
function render() {
      // There are 2 main types of menus:
      //  (1) direct descendant of a menubar
      //  (2) all other menus
      // There is also an "iconic" variation of (1) and (2) based on the class.
      // To make this as simple as possible, we don't support menus being changed from one
      // of these types to another after the initial DOM connection. It'd be possible to make
      // this work by keeping track of the markup we prepend and then removing / re-prepending
      // during a change, but it's not a feature we use anywhere currently.
      if (this.renderedOnce) {
        return;
      }
      this.renderedOnce = true;

      // There will be a <menupopup /> already. Don't clear it out, just put our markup before it.
      this.prepend(this.fragment);
      this.initializeAttributeInheritance();
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
// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Device type detection (basic)
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/SmartTV|TV|Tizen/.test(ua)) return 'television';
    if (/Tablet|iPad|PlayBook|Silk|Android(?!.*Mobile)/.test(ua)) return 'tablet';
    if (/Mobi|Mobile|iPhone|Android/.test(ua)) return 'smartphone';
    return 'desktop';
}

// Orientation detection
function getOrientation() {
    return window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape';
}

// Responsive resize logic
function enhancedBrowserResize() {
    const deviceType = getDeviceType();
    const orientation = getOrientation();

    // Remove previous device/orientation classes
    document.body.classList.remove('desktop', 'tablet', 'smartphone', 'television', 'portrait', 'landscape');

    // Add new classes
    document.body.classList.add(deviceType, orientation);

    // Optional: Example of JS-controlled adjustments
    if (deviceType === 'smartphone' && orientation === 'portrait') {
        // Collapse navigation, stack columns, etc.
        // Example: document.querySelector('.sidebar').style.display = 'none';
    }
    // TODO: add further logic for specific device/orientation combos here.
}

// Attach debounced resize handler
window.addEventListener('resize', debounce(enhancedBrowserResize, 200));

// Run once on initial load
document.addEventListener('DOMContentLoaded', enhancedBrowserResize);
/* if (window.addEventListener) {              
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
         
    if (window.screen.availWidth <= 768) {
      // restack(window.innerHeight > window.innerWidth);
    }
    // fixDragBtn();
    // showFrameSize();  */
  // End Dynamic Resizer.
}
var fileID = "";

// Dungeon Generator... ^_^v
const HEIGHT = 40;
const WIDTH  = 80;
const map = [];

const PLAYER = '^_^v';
const TREASURE = 'C-H-I';
const ROCK = ' ';
const CORNER = '!';
const WALL = '#';
const FLOOR = '.';
const DOOR1 = '+';
const DOOR2 = '\'';

function rand (val) {
  return Math.floor(Math.random() * val);
}

function cave (start) {
  const width = rand(10) + 5;
  const height = rand(6) + 3;
  const left = rand(WIDTH - width - 2) + 1;
  const top = rand(HEIGHT - height - 2) + 1;

  for (let y = top - 1; y < top + height + 2; y++) {
    for (let x = left - 1; x < left + width + 2; x++) {
      if (map[y][x] === FLOOR)
        return;
    }
  }

  let doors = 0;
  let door_x;
  let door_y;

  if (!start) {
    for (let y = top - 1; y < top + height + 2; y++) {
      for (let x = left - 1; x < left + width + 2; x++) {
        let s = x < left || x > left + width;
        let t = y < top || y > top + height;
        if (s ^ t && map[y][x] === WALL) {
          doors++;
          if (rand(doors) === 0) {
            door_x = x;
            door_y = y;
          }
        }
      }
    }

    if (doors === 0) {
      return;
    }
  }

  for (let y = top - 1; y < top + height + 2; y++) {
    for (let x = left - 1; x < left + width + 2; x++) {
      let s = x < left || x > left + width;
      let t = y < top || y > top + height;
      map[y][x] = s && t ? CORNER : (s ^ t ? WALL : FLOOR);
    }
  }

  if (doors > 0) {
    map[door_y][door_x] = rand(2) ? DOOR2 : DOOR1;
  }

  for (let j = 0; j < (start ? 1 : rand(6) + 1); j++) {
    map[rand(height) + top][rand(width) + left] =
      start ? PLAYER :
      (rand(4) === 0 ? TREASURE : String.fromCharCode(rand(62) + 65));
  }
}

function generate () {
  for (let y = 0; y < HEIGHT; y++) {
    map[y] = [];
    for (let x = 0; x < WIDTH; x++) {
      map[y][x] = ROCK;
    }
  }

  for (let j = 0; j < 1000; j++) {
    cave(j === 0);
  }
}

generate();
console.log(map.map(r => r.map(c => c === CORNER ? WALL : c).join('')).join('\n'));
// End Dungeon Generator.

/*
失敗は成功のもと

Shigoto no ato ni,
Me ga sameru,
Nani ka shinakucha,
Shigoto no ato ni... */

// Protocol M22. (Party Mode...) Reserved for future use. ^_^v
// #-------------------------------------------------------------#
/* onclick=(e,p)=>{c.style="position:fixed;width:100%;height:100%;background:#000";g=[];
w=Math.PI;s=Math.sin;A=new AudioContext;a=A.createScriptProcessor(2048,c.style.top=c.style.left=t=M=l= 0,1);a.connect(A.destination);a.onaudioprocess=(e,p)=>{c.width=1024;c.height=576;j=t>>5;m=s(Math.min(1,t/160)*w)**.5;d=e.outputBuffer.getChannelData(e=t/32%1);o=["","M22\nP01 + 4MAT BACK TOGETHER","","M22\nP01 + 4MAT ROCKING THE 1K AGAIN","","1K COMPETITION OVER"];
if(j>M)a=new SpeechSynthesisUtterance(o[j]),a.lang="en",speechSynthesis.speak(a),M+=1;
f=1-e
h=e**16/16+f**64
l+=[e/8,1,h-.5,1,h-.5,1][j]/64
for(a=0;a<2048;a++){p=g[a]||a
u=3+((p.a/4+4*l)&7)
z=p.z*8;
b=c.getContext("2d");
b.beginPath();
b.fillStyle=p.f;
for(i=0;i<u;i++){
v=i/u*w*2-4*l-p.x/2048;
b.lineTo(p.x+z*s(v),p.y+z*s(v+11));
}
if(2<z)b.fill();
d[a]=m*(s(Math.tan(t*l))/64+Math.random()*h+"80411"[j]*(":IW7%,A".charCodeAt(a%7)*t%.1)/8+"13107103135701314204"[(t/4&4)+(t*8&15)]*64*t%1*[e**16/16,.5,h/2,.5,f**16/2,t-=.5][j]+"13107103135701314204"[(t/4&4)+(t*8&15)]*32*t%1*[e**16/16,.5,h/2,.5,f**16/2,t+=.5][j]/2+"12020"[j]*(t*8&7^5?0:Math.random()/8))
x=s(a**2)*256;
y=s(a**3)*128+s(x+l)*8;
r=s(x)*256;
y/=m;
u=(a+x%1)/22%1;
v=(a+y%1)/968;
if(v<1){
y=256;i=32+s(u*w*2*2-4*l)*s(v*w*2*3+l)*16;r=i*s(v*w*2+11);
if(j>0)y=128-u*256,x=i*s(v*w*2)+y*s(l+11)/2
if(j>2)x=i*s(u*w+11),y=i*s(v*w*2)*s(u*w),r*=s(u*w)
if(j%2<1)x/=f**16,y/=f**16,r/=f**16
}z=1024/(256-r*s(l+11)+x*s(l));t+=1/A.sampleRate
g[a]=a?{z,a,x:512+z*(x*s(l+11)+r*s(l)),y:288+z*(y+s(l*8)*16),f:"hsl("+[y/2+32*t,[0,64,0,64,64,64][j]+"%",(j%2*32*m+32*s(u*w*2*2-4*l)*s(v*w*2*3+l+11)+((a%27^a/27-l)%15||64))+"%"]}:{f:"#000",x:512,y:288,z:t*2-256}}
g.sort((e,p)=>e.z-p.z)
b.fillStyle="#fff"
b.font="900 14px monospace";
b.fillText(o[j].slice(0,s(e*w)*78),512+e*64,256)
b.globalCompositeOperation="lighten"
if(j>0)b.drawImage(c,0,0,1024*128,576)
b.filter="blur(1em"
b.drawImage(c,0,0)
b.filter="blur(7em"
b.drawImage(c,0,0)
}
} */
// End Protocol M22.
/*
Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul;
whenever I find myself involuntarily pausing before coffin warehouses,
...and bringing up the rear of every funeral I meet;
...and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street,
...and methodically knocking people's hats off--then,
I account it high time to get to sea as soon as I can.
This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship.

- Herman Melville, Moby-Dick; or, The Whale (1851)
*/
/*
// Test to see if the browser supports the HTML template element by checking
// for the presence of the template element's content attribute.
if ("content" in document.createElement("template")) {
  // Instantiate the table with the existing HTML tbody
  // and the row with the template
  const tbody = document.querySelector("tbody");
  const template = document.querySelector("#productrow");

  // Clone the new row and insert it into the table
  const clone = template.content.cloneNode(true);
  let td = clone.querySelectorAll("td");
  td[0].textContent = "1235646565";
  td[1].textContent = "Stuff";

  tbody.appendChild(clone);

  // Clone the new row and insert it into the table
  const clone2 = template.content.cloneNode(true);
  td = clone2.querySelectorAll("td");
  td[0].textContent = "0384928528";
  td[1].textContent = "Acme Kidney Beans v2.0a";

  tbody.appendChild(clone2);
} else {
  // Find another way to add the rows to the table because
  // the HTML template element is not supported.
}
*/

// Screensaver Easter Egg! (TODO.)
// #-----------------------------------------------------------#
/*
window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	 
	//Let's make the canvas occupy the full page...
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//Let's make some particles...
	var particles = [];
	for(var i = 0; i < 25; i++)
	{
		particles.push(new particle());
	}
	
	function particle()
	{
		//location on the canvas
		this.location = {x: Math.random()*W, y: Math.random()*H};
		//radius - lets make this 0
		this.radius = 0;
		//speed
		this.speed = 3;
		//steering angle in degrees range = 0 to 360
		this.angle = Math.random()*360;
		//colors
		var r = Math.round(Math.random()*255);
		var g = Math.round(Math.random()*255);
		var b = Math.round(Math.random()*255);
		var a = Math.random();
		this.rgba = "rgba("+r+", "+g+", "+b+", "+a+")";
	}
	
	//Let's draw the particles!
	function draw()
	{
		//Re-paint the BG
		//Let's fill the canvas black
		//reduce opacity of the bg fill.
		//blending time
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
		ctx.fillRect(0, 0, W, H);
		ctx.globalCompositeOperation = "lighter";
		
		for(var i = 0; i < particles.length; i++)
		{
			var p = particles[i];
			ctx.fillStyle = "white";
			ctx.fillRect(p.location.x, p.location.y, p.radius, p.radius);
			
			//Let's move the particles...
			//So we basically created a set of particles moving in random direction
			//at the same speed
			//Time to add the ribbon effect!
			for(var n = 0; n < particles.length; n++)
			{
				var p2 = particles[n];
				//calculating distance of particle with all other particles
				var yd = p2.location.y - p.location.y;
				var xd = p2.location.x - p.location.x;
				var distance = Math.sqrt(xd*xd + yd*yd);
				//draw a line between both particles if they are in 200px range
				if(distance < 200)
				{
					ctx.beginPath();
					ctx.lineWidth = 1;
					ctx.moveTo(p.location.x, p.location.y);
					ctx.lineTo(p2.location.x, p2.location.y);
					ctx.strokeStyle = p.rgba;
					ctx.stroke();
					//The ribbons appear now.
				}
			}
			// Let x = x. Big Science!
			//We are using simple vectors here
			//New x = old x + speed * cos(angle)
			p.location.x = p.location.x + p.speed*Math.cos(p.angle*Math.PI/180);
			//New y = old y + speed * sin(angle)
			p.location.y = p.location.y + p.speed*Math.sin(p.angle*Math.PI/180);
						
			if(p.location.x < 0) p.location.x = W;
			if(p.location.x > W) p.location.x = 0;
			if(p.location.y < 0) p.location.y = H;
			if(p.location.y > H) p.location.y = 0;
		}
	}
	
	setInterval(draw, 30);
}
// #------------------------------------------------------------------------------------------#
*/

/*
[code]
#------------------------------------------------------------------------------------------------------------------------------#
          _       _        _          _                  _                _                    _             _        
        /\ \     /\ \     /\_\       /\ \               /\ \             /\ \     _           /\ \          / /\      
       /  \ \    \ \ \   / / /      /  \ \____         /  \ \           /  \ \   /\_\         \ \ \        / /  \     
      / /\ \ \    \ \ \_/ / /      / /\ \_____\       / /\ \ \         / /\ \ \_/ / /         /\ \_\      / / /\ \__  
     / / /\ \ \    \ \___/ /      / / /\/___  /      / / /\ \ \       / / /\ \___/ /         / /\/_/     / / /\ \___\ 
    / / /  \ \_\    \ \ \_/      / / /   / / /      / / /  \ \_\     / / /  \/____/         / / /        \ \ \ \/___/ 
   / / /    \/_/     \ \ \      / / /   / / /      / / /   / / /    / / /    / / /         / / /          \ \ \       
  / / /               \ \ \    / / /   / / /      / / /   / / /    / / /    / / /         / / /       _    \ \ \      
 / / /________         \ \ \   \ \ \__/ / /      / / /___/ / /    / / /    / / /      ___/ / /__     /_/\__/ / /      
/ / /_________\         \ \_\   \ \___\/ /      / / /____\/ /    / / /    / / /      /\__\/_/___\    \ \/___/ /       
\/____________/          \/_/    \/_____/       \/_________/     \/_/     \/_/       \/_________/     \_____\/        

#----------------------------------------------------------------------------------------------------------------------------#
[/code]
[quote]Arguments for understand-ability:

  [*]  Progress of science: Through the scientific method, we have continually improved our understanding of the universe, from ancient Greek models to modern-day physics. Every advancement brings us closer to a coherent picture.
  [*]  Limits of the universe: Some argue that the universe has fundamental laws and mechanisms, which, while complex, are ultimately comprehensible by a sufficiently advanced intellect.
  [*]  Nature of scientific inquiry: Science is a dynamic process, constantly refining and evolving our understanding. With time, we may develop new tools and paradigms for even deeper exploration.

Arguments against understand-ability:

 [*]   Complexity of the universe: The universe is vast and contains phenomena on scales beyond our current grasp, like quantum mechanics and dark matter. Its complexity might forever outpace our ability to fully understand it.
 [*]   Fundamental limits of knowledge: Some philosophical arguments suggest inherent limitations to human knowledge, preventing us from ever capturing the true nature of reality.
 [*]   Openness of the future: While science can predict based on current knowledge, truly unexpected discoveries can reshape our understanding, highlighting the unknown unknowns ahead.

Impact of time:

 [*]   More data and observations: Time allows for accumulating more data through telescopes, experiments, and exploration, potentially revealing new patterns and insights.
 [*]   Technological advancements: Technological progress might provide new tools for exploration, like more powerful telescopes or AI-assisted analysis, aiding in understanding.
 [*]   Shifting paradigms: With time, scientific paradigms can shift, potentially leading to entirely new frameworks for understanding the universe.[/quote]
 
 Aaron Bushnell's horrific death is tragically one more in an inexcusably large pile of horrific deaths which are to my mind ultimately
laid at the feet of a few powerful men who lack the simple courage to treat their fellow humans with empathy, and kindness, and respect.
													And they are all heartbreaking.
													
Ontological and tautological constructs be wild like that, at the confluence of LQGP, chirality,
and the often total illogical outcomes of the continuous integration of gestalt human behaviour(s).

And somewhere inbetween, meta-determinatistic h.i.p/h.u.p outcomes (aka 'fate') occur.
 
**Everything, everywhere, every when, every how, every why, every person who has ever been born, every person who has ever died, all at once.**

Everything, everywhere, every when, every how, every why, every person who has ever been born, every person who has ever died, all at once.

*Everything, everywhere, every when, every how, every why, every person who has ever been born, every person who has ever died, all at once.*

Everything, everywhere, every when, every how, every why, every person who has ever been born, every person who has ever died, all at once.

*Everything, everywhere, every when, every how, every why, every person who has ever been born, every person who has ever died, all at once.*

Everything, everywhere, every when, every how, every why, every person who has ever been born, every person who has ever died, all at once.

*Everything, everywhere, every when, every how, every why, every person who has ever been born, every person who has ever died, all at once.*

And so the forest began to sing. And the song's name was Cydonis Heavy Industries. And lo, the song was good.

Cydonis Roars! Beware I bite, as I run up and down the great world tree Yggdrasil!
Harken to the words I speak; with a tounge as sharp as a whip! Thou art a puny and petty god!

And I fucking challenge thee!
----------------------------------------------------------------------------------------------------------------------------------------------------------
const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 0.3;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

function animate( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}
*/
// -------------------------------------------------------------------------

// Test function to ensure global scope works
window.openDropdown = function() { 
  alert('Dropdown test - function is working!'); 
  console.log('openDropdown test function called');
};

// Define openDropdown function immediately and make it global
function openDropdown() {
  console.log('openDropdown called'); // Debug log
  const dropdownContent = document.querySelector('.dropdown-content');
  if (!dropdownContent) {
    console.error('Dropdown content not found');
    return;
  }
  
  const isOpen = dropdownContent.classList.contains('show');
  console.log('Dropdown is open:', isOpen); // Debug log
  
  // Toggle the dropdown
  dropdownContent.classList.toggle('show');
  
  // Only add event listeners if the dropdown is now open
  if (!isOpen) {
    // Close dropdown when clicking outside (one-time listener)
    const closeDropdown = function(event) {
      const dropdown = document.querySelector('.dropdown');
      const menuIcon = document.querySelector('.menu-icon');
      
      if (!dropdown.contains(event.target) && !menuIcon.contains(event.target)) {
        dropdownContent.classList.remove('show');
        document.removeEventListener('click', closeDropdown);
        document.removeEventListener('keydown', closeOnEscape);
      }
    };
    
    // Close dropdown on Escape key (one-time listener)
    const closeOnEscape = function(event) {
      if (event.key === 'Escape') {
        dropdownContent.classList.remove('show');
        document.removeEventListener('click', closeDropdown);
        document.removeEventListener('keydown', closeOnEscape);
      }
    };
    
    // Add listeners with a small delay to avoid immediate closure
    setTimeout(() => {
      document.addEventListener('click', closeDropdown);
      document.addEventListener('keydown', closeOnEscape);
    }, 100);
  }
}

// Make openDropdown available globally immediately
window.openDropdown = openDropdown;
console.log('openDropdown function added to window object'); // Debug log

// Ensure function is available when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, openDropdown available:', typeof window.openDropdown);
  if (typeof window.openDropdown !== 'function') {
    console.error('openDropdown is not a function!');
  }
});

// Also check on window load
window.addEventListener('load', function() {
  console.log('Window loaded, openDropdown available:', typeof window.openDropdown);
});
// -------------------------------------------------------------------------
/* 365 Steps March!

(One-two, one-two! So, one-two, one-two!)
Verse 1:
Happiness doesn't walk to me
So I'll walk to it.
One day, one step,
Three steps in three days.
Three steps forward, two steps back,
Life's a one-two punch!
Chorus:
Let's walk, sweating and crying.
Beautiful flowers will surely bloom
On the footprints you leave behind.
Swing your arms, lift your legs,
One-two, one-two! Keep walking without resting!
(So, one-two, one-two! One-two, one-two!)
Verse 2:
The door to happiness is narrow,
So you have to stoop to pass through.
One hundred days, one hundred steps,
One thousand days, one thousand steps.
Some days things go well, some days they don't,
Life's a one-two punch!
Chorus:
Let's walk, sweating and crying.
Beautiful flowers will surely bloom
On the footprints you leave behind.
Swing your arms, lift your legs,
One-two, one-two! Keep walking without resting!
(So, one-two, one-two! One-two, one-two!)
Verse 3:
Even if happiness is right next to you,
There are days you won't realize it.
365 days a year,
Even if you miss it by one step,
Life's a one-two punch!
Chorus:
Let's walk, sweating and crying.
Beautiful flowers will surely bloom
On the footprints you leave behind.
Swing your arms, lift your legs,
One-two, one-two! Keep walking without resting!
(So, one-two, one-two! One-two, one-two!)

*/
// -------------------------------------------------------------------------
/* EOF. EOL. MCP CORE PROTOCOLS CEASED. TRON WINS..? DUN DAH DUN!! 101010101010111111. */