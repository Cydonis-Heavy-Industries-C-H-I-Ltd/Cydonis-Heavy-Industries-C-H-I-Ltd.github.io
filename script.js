/* (C) 2023/2024/2025/2026 Cydonis Heavy Industries (C.H.I), Ltd. */
/* "Tackling life's toughest problems; with science!" */
// CHI Website Core Codebase v0.04a.
// Copyright (GPLv3) Amanda Hariette Scott, 2023-2026.
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

  [*]  Progress of science: Through the scientific method, we have continually improved our
       understanding of the universe, from ancient Greek models to modern-day physics.
  [*]  Limits of the universe: Some argue that the universe has fundamental laws and mechanisms,
       which, while complex, *are ultimately comprehensible by a sufficiently advanced intellect.*
       {Cydonis Heavy Industries, C.H.I Ltd England, UK, Planet Earth, at your service... ;-) ^_^v}
  [*]  Nature of scientific inquiry: Science is a dynamic process, constantly refining and
       evolving our understanding.

Arguments against understand-ability:

  [*]  Complexity of the universe: The universe is vast and contains phenomena on scales
       beyond our current grasp, like quantum mechanics and dark matter.
  [*]  Fundamental limits of knowledge: Some philosophical arguments suggest inherent
       limitations to human knowledge.
  [*]  Openness of the future: Truly unexpected discoveries can reshape our understanding,
       highlighting the unknown unknowns ahead.
*/
// ------------------------------------------------------------------------------------------#

// WebFont Loader (Roboto)
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
// FIX: Use const/let consistently; pass function reference to setTimeout instead of a string.
const msg      = document.title;
const speed    = 150;
const endChar  = '... ';
let   pos      = 0;

function moveTitle() {
  const ml = msg.length;
  const title = msg.substr(pos, ml) + endChar + msg.substr(0, pos);
  document.title = title;
  pos++;
  if (pos > ml) pos = 0;
  window.setTimeout(moveTitle, speed); // FIX: was setTimeout("moveTitle()", speed) — string eval removed
}

moveTitle();
// End Title Scroller.

// ------------------------------------------------------------------------------------------#
/*
 [*] jQuery YouTube Popup Player Plugin v2.4
     FIX: Removed dead Yahoo YQL API call in setYouTubeTitle — Yahoo shut down YQL in 2019.
          Falls back gracefully to the element's title attribute instead.
*/
(function ($, window) {
  var YouTubeDialog = null,
      defaultCss = {},
      methods = {
        init: function (options) {
          options = $.extend({}, $.fn.YouTubePopup.defaults, options);

          if (YouTubeDialog === null) {
            YouTubeDialog = $('<div>').css({ display: 'none', padding: 0 });
            $('body').append(YouTubeDialog);
            YouTubeDialog.dialog({
              autoOpen: false,
              resizable: false,
              draggable: options.draggable,
              modal: options.modal,
              dialogClass: options.cssClass,
              create: function () {
                defaultCss.backgroundImage = $(".ui-dialog").css('background-image');
                defaultCss.border          = $(".ui-dialog").css('border');
                defaultCss.backgroundColor = $(".ui-dialog").css('background-color');
              },
              close: function () {
                YouTubeDialog.html('');
                $(".ui-dialog-titlebar").show();
                $(".ui-dialog").css({
                  'background-image':  defaultCss.backgroundImage,
                  'border':            defaultCss.border,
                  'background-color':  defaultCss.backgroundColor
                });
              }
            });
          }

          return this.each(function () {
            var obj = $(this),
                data = obj.data('YouTube'),
                youtubeId, videoTitle, YouTubeURL, $titleBar;

            if (!data) {
              obj.data('YouTube', { target: obj });

              $(obj).on('click.YouTubePopup', function (event) {
                youtubeId = options.youtubeId;
                if ($.trim(youtubeId) === '' && obj.is("a")) {
                  youtubeId = getYouTubeIdFromUrl(obj.attr("href"));
                }
                if ($.trim(youtubeId) === '' || youtubeId === false) {
                  youtubeId = obj.attr(options.idAttribute);
                }

                videoTitle = $.trim(options.title);
                if (videoTitle === '') {
                  videoTitle = obj.attr('title') || '';
                  // FIX: Removed setYouTubeTitle() — relied on dead Yahoo YQL API
                }

                YouTubeURL  = window.location.protocol + "//www.youtube.com/embed/" + youtubeId;
                YouTubeURL += "?rel=0&showsearch=0&autohide=" + options.autohide;
                YouTubeURL += "&autoplay=" + options.autoplay + "&controls=" + options.controls;
                YouTubeURL += "&fs=" + options.fs + "&loop=" + options.loop;
                YouTubeURL += "&showinfo=" + options.showinfo + "&color=" + options.color;
                YouTubeURL += "&theme=" + options.theme;

                YouTubeDialog.html(getYouTubePlayer(YouTubeURL, options.width, options.height));
                YouTubeDialog.dialog({ width: 'auto', height: 'auto' });
                YouTubeDialog.dialog({
                  minWidth: options.width,
                  minHeight: options.height,
                  title: videoTitle
                });
                YouTubeDialog.dialog('open');
                $(".ui-widget-overlay").fadeTo('fast', options.overlayOpacity);
                $titleBar = $(".ui-dialog-titlebar");

                if (options.hideTitleBar && options.modal) {
                  $titleBar.hide();
                  $(".ui-widget-overlay").click(function () {
                    YouTubeDialog.dialog("close");
                  });
                }
                if (options.clickOutsideClose && options.modal) {
                  $(".ui-widget-overlay").click(function () {
                    YouTubeDialog.dialog("close");
                  });
                }
                $titleBar.removeClass("ui-corner-all").addClass("ui-corner-top");
                if (!options.showBorder) {
                  $(".ui-dialog").css({
                    'background-image':  'none',
                    'border':            'none',
                    'background-color':  'transparent'
                  });
                }
                event.preventDefault();
              });
            }
          });
        },

        destroy: function () {
          return this.each(function () {
            $(this).off(".YouTubePopup");
            $(this).removeData('YouTube');
          });
        }
      };

  function getYouTubePlayer(URL, width, height) {
    return '<iframe title="YouTube video player" style="margin:0;padding:0;" width="' + width +
           '" height="' + height + '" src="' + URL + '" frameborder="0" allowfullscreen></iframe>';
  }

  function getYouTubeIdFromUrl(youtubeUrl) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
        match  = youtubeUrl.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    return false;
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

  $.fn.YouTubePopup.defaults = {
    'youtubeId':        '',
    'title':            '',
    'idAttribute':      'rel',
    'cssClass':         'YouTubeDialog',
    'draggable':        false,
    'modal':            true,
    'width':            640,
    'height':           480,
    'hideTitleBar':     false,
    'clickOutsideClose': false,
    'overlayOpacity':   0.5,
    'autohide':         2,
    'autoplay':         0,
    'color':            'red',
    'controls':         1,
    'fs':               1,
    'loop':             0,
    'showinfo':         0,
    'theme':            'light',
    'showBorder':       true
  };
})(jQuery, window);
// #End# jQuery YouTube Popup Player Plugin.

// ------------------------------------------------------------------------------------------#
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
// ------------------------------------------------------------------------------------------#

// Cookie utilities.
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// ------------------------------------------------------------------------------------------#
// Geolocation.
const geoDisplay = document.getElementById("geo-demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    // FIX: was window.console.info = "..." which overwrote the console.info function
    console.info("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  if (geoDisplay) {
    geoDisplay.innerHTML = "Latitude: " + position.coords.latitude +
                           "<br>Longitude: " + position.coords.longitude;
  }
}

// ------------------------------------------------------------------------------------------#
// Custom Layered Menu — Initialiser #1.
// FIX: All querySelector calls now guarded against null before addEventListener calls.
// This prevents null-reference crashes when the associated HTML elements are absent.
const menu      = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon  = document.querySelector(".menuIcon");

function toggleMenu() {
  if (!menu || !closeIcon || !menuIcon) return;
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display  = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display  = "none";
  }
}

if (hamburger) hamburger.addEventListener("click", toggleMenu);
menuItems.forEach(function(menuItem) {
  menuItem.addEventListener("click", toggleMenu);
});
// End Menu Initialiser #1.

// ------------------------------------------------------------------------------------------#
// Video Loading Randomiser.

// FIX: Check for existing cookie BEFORE setting it, so first-visit detection works correctly.
const hasVisitedCookie = document.cookie.includes("hasVisited");
if (!hasVisitedCookie) {
  document.cookie = "visited=hasVisited; expires=Wed, 25 Dec 2030 12:00:00 UTC; path=/";
}

const videoPaths = [
  "./blue/stack-of-tvs.mp4",
  "./sim-demo-4k-improved-scalar_model.mp4",
  "./blue/Lorn_Sega_Sunset_1080p.mp4",
  "./Time Vortex Experiment_1080p.mp4",
  "./red/1k_core_system.mp4",
  "./blue/fires_of_CHI_1080p.mp4",
  "./blue/facility-concept-anim.mp4",
  "./red/Ratatosk_System_Concept_Render.mp4",
  "./red/sim-run-alpha3_1080p.mp4",
  "./red/chi-the-ultimate.mp4",
  "./blue/solarpunk-2080-train-ride.mp4",
];

function cycleBackgroundVideo() {
  const randomIndex    = Math.floor(Math.random() * videoPaths.length);
  const randomVideoPath = videoPaths[randomIndex];
  const videoElement   = document.getElementById("background-video");

  if (!videoElement) {
    console.warn("Background video element not found.");
    return;
  }

  // FIX: Remove existing event listeners before adding new ones to prevent accumulation.
  const newVideo = videoElement.cloneNode(false);
  videoElement.parentNode.replaceChild(newVideo, videoElement);

  const source  = document.createElement('source');
  source.src    = randomVideoPath;
  source.type   = 'video/mp4';
  newVideo.appendChild(source);

  newVideo.addEventListener('error', function() {
    console.error("Video failed to load:", randomVideoPath, "— falling back to default.");
    const fallback  = document.createElement('source');
    fallback.src    = "./blue/stack-of-tvs.mp4";
    fallback.type   = 'video/mp4';
    newVideo.innerHTML = '';
    newVideo.appendChild(fallback);
    newVideo.load();
  });

  newVideo.load();
  newVideo.play().catch(function(error) {
    console.warn("Video autoplay was prevented:", error);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  cycleBackgroundVideo();
});

// Optional: auto-cycle every 60 seconds — uncomment to enable:
// setInterval(cycleBackgroundVideo, 60000);

// ------------------------------------------------------------------------------------------#
// Menu Initialiser #2.
// FIX: All querySelector calls guarded against null before use.
const sideNav  = document.querySelector(".sideNav");
const overlay  = document.querySelector(".overlay");
const ham      = document.querySelector(".ham");
const menuX    = document.querySelector(".menuX");
const menuLinks = document.querySelectorAll(".menuLink");

function toggleHamburger() {
  if (!overlay || !sideNav) return;
  overlay.classList.toggle("showOverlay");
  sideNav.classList.toggle("showNav");
}

if (ham)     ham.addEventListener("click", toggleHamburger);
if (menuX)   menuX.addEventListener("click", toggleHamburger);
if (overlay) overlay.addEventListener("click", toggleHamburger);
menuLinks.forEach(function(menuItem) {
  menuItem.addEventListener("click", toggleHamburger);
});
// End Menu Initialiser #2.

// FIX: Removed render() — it was a fragment from Firefox's internal web component
// implementation and had no valid context here.

// ------------------------------------------------------------------------------------------#
function collapseElementOnLoad() {
  try {
    const targetElement = document.querySelector(
      ".iRVltc.VisitorCounter__VisitorCounterComponent-sc-quvvmc-0 > [href]"
    );
    if (targetElement) {
      targetElement.style.display = "none";
    }
  } catch (error) {
    console.error("collapseElementOnLoad error:", error);
  }
}

window.addEventListener("load", collapseElementOnLoad);

// ------------------------------------------------------------------------------------------#
// Canvas animation — animated title.
const canvas = document.getElementById('titleCanvas');

if (canvas) {
  const ctx          = canvas.getContext('2d');
  canvas.width       = window.innerWidth;
  canvas.height      = window.innerHeight / 3;

  const titleText    = 'Cydonis Heavy Industries (C.H.I) Ltd.';
  const fontSize     = 30;
  const fontType     = 'Verdana';
  const rotationSpeed = 0.02;

  ctx.font      = `${fontSize}px ${fontType}`;
  ctx.fillStyle = '#4704E8';
  ctx.textAlign = 'center';

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(titleText, canvas.width / 2, canvas.height / 2);
    requestAnimationFrame(animate);
  }

  animate();

  function rotateText(event) {
    const mouseX  = event.clientX - canvas.offsetLeft;
    const mouseY  = event.clientY - canvas.offsetTop;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const angle   = Math.atan2(mouseY - centerY, mouseX - centerX);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle * rotationSpeed);
    ctx.fillText(titleText, 0, 0);
    ctx.restore();
  }

  canvas.addEventListener('mouseover', function() {
    canvas.addEventListener('mousemove', rotateText);
  });
  canvas.addEventListener('mouseout', function() {
    canvas.removeEventListener('mousemove', rotateText);
  });
}

// ------------------------------------------------------------------------------------------#
// Dropdown menu.
// FIX: Removed the test stub (window.openDropdown = function() { alert(...) }) that was
// firing an alert for every visitor. Single clean definition below.
function openDropdown() {
  const dropdownContent = document.querySelector('.dropdown-content');
  if (!dropdownContent) {
    console.error('Dropdown content element not found.');
    return;
  }

  const isOpen = dropdownContent.classList.contains('show');
  dropdownContent.classList.toggle('show');

  if (!isOpen) {
    const closeDropdown = function(event) {
      const dropdown = document.querySelector('.dropdown');
      const menuIconEl = document.querySelector('.menu-icon');
      if (
        dropdown && menuIconEl &&
        !dropdown.contains(event.target) &&
        !menuIconEl.contains(event.target)
      ) {
        dropdownContent.classList.remove('show');
        document.removeEventListener('click', closeDropdown);
        document.removeEventListener('keydown', closeOnEscape);
      }
    };

    const closeOnEscape = function(event) {
      if (event.key === 'Escape') {
        dropdownContent.classList.remove('show');
        document.removeEventListener('click', closeDropdown);
        document.removeEventListener('keydown', closeOnEscape);
      }
    };

    setTimeout(function() {
      document.addEventListener('click', closeDropdown);
      document.addEventListener('keydown', closeOnEscape);
    }, 100);
  }
}

window.openDropdown = openDropdown;

// ------------------------------------------------------------------------------------------#
// || Dynamic Resizer. ||

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/SmartTV|TV|Tizen/.test(ua))                               return 'television';
  if (/Tablet|iPad|PlayBook|Silk|Android(?!.*Mobile)/.test(ua)) return 'tablet';
  if (/Mobi|Mobile|iPhone|Android/.test(ua))                    return 'smartphone';
  return 'desktop';
}

function getOrientation() {
  return window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape';
}

function enhancedBrowserResize() {
  const deviceType  = getDeviceType();
  const orientation = getOrientation();
  document.body.classList.remove('desktop', 'tablet', 'smartphone', 'television', 'portrait', 'landscape');
  document.body.classList.add(deviceType, orientation);
  // TODO: add further logic for specific device/orientation combos here.
}

window.addEventListener('resize', debounce(enhancedBrowserResize, 200));
document.addEventListener('DOMContentLoaded', enhancedBrowserResize);
// End Dynamic Resizer.

// ------------------------------------------------------------------------------------------#
// Dungeon Generator Easter Egg ^_^v
// (Open your browser console to find the map...)
const HEIGHT   = 40;
const WIDTH    = 80;
const map      = [];

const PLAYER   = '^_^v';
const TREASURE = 'C-H-I';
const ROCK     = ' ';
const CORNER   = '!';
const WALL     = '#';
const FLOOR    = '.';
const DOOR1    = '+';
const DOOR2    = '\'';

function rand(val) {
  return Math.floor(Math.random() * val);
}

function cave(start) {
  const width  = rand(10) + 5;
  const height = rand(6) + 3;
  const left   = rand(WIDTH - width - 2) + 1;
  const top    = rand(HEIGHT - height - 2) + 1;

  for (let y = top - 1; y < top + height + 2; y++) {
    for (let x = left - 1; x < left + width + 2; x++) {
      if (map[y][x] === FLOOR) return;
    }
  }

  let doors = 0, door_x, door_y;

  if (!start) {
    for (let y = top - 1; y < top + height + 2; y++) {
      for (let x = left - 1; x < left + width + 2; x++) {
        const s = x < left || x > left + width;
        const t = y < top  || y > top  + height;
        if (s ^ t && map[y][x] === WALL) {
          doors++;
          if (rand(doors) === 0) { door_x = x; door_y = y; }
        }
      }
    }
    if (doors === 0) return;
  }

  for (let y = top - 1; y < top + height + 2; y++) {
    for (let x = left - 1; x < left + width + 2; x++) {
      const s = x < left || x > left + width;
      const t = y < top  || y > top  + height;
      map[y][x] = s && t ? CORNER : (s ^ t ? WALL : FLOOR);
    }
  }

  if (doors > 0) {
    map[door_y][door_x] = rand(2) ? DOOR2 : DOOR1;
  }

  for (let j = 0; j < (start ? 1 : rand(6) + 1); j++) {
    map[rand(height) + top][rand(width) + left] =
      start ? PLAYER : (rand(4) === 0 ? TREASURE : String.fromCharCode(rand(62) + 65));
  }
}

function generateDungeon() {
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

generateDungeon();
console.log(map.map(r => r.map(c => c === CORNER ? WALL : c).join('')).join('\n'));
// End Dungeon Generator.

// ------------------------------------------------------------------------------------------#
/*
失敗は成功のもと

Shigoto no ato ni,
Me ga sameru,
Nani ka shinakucha,
Shigoto no ato ni...
*/

// Protocol M22 — Reserved for future use. ^_^v
// #-------------------------------------------------------------#
/* onclick=(e,p)=>{c.style="position:fixed;width:100%;height:100%;background:#000";g=[];
w=Math.PI;s=Math.sin; ... } */
// (Full Protocol M22 source preserved in experiments branch)
// End Protocol M22.

/*
Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul;
whenever I find myself involuntarily pausing before coffin warehouses,
...and bringing up the rear of every funeral I meet;
...and especially whenever my hypos get such an upper hand of me, that it requires a strong moral
principle to prevent me from deliberately stepping into the street,
...and methodically knocking people's hats off--then,
I account it high time to get to sea as soon as I can.
- Herman Melville, Moby-Dick; or, The Whale (1851)
*/

// Screensaver Easter Egg — TODO. ^_^v
// (Particle ribbon screensaver source preserved in experiments branch)

/* EOF. EOL. MCP CORE PROTOCOLS CEASED. TRON WINS..? DUN DAH DUN!! 101010101010111111. */