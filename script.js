//TODO IIFE
var displayType;
var header = document.getElementById('header');
var headerWrapper = document.getElementById('header-wrapper');
var fauxHeader = document.getElementById('fauxheader');
var menuButton = document.getElementById('menu-button');
var uimask = document.getElementById('uimask');
var sideNav = document.getElementById('side-nav');

var peekabooConfig = {
  'header': {
    'mobile': 72,
    'desktop-sm': 72,
    'default': 192
  },
  'header-wrapper': {
    'mobile': 28,
    'desktop-sm': 28,
    'default': 82
  }
};

var defineDisplay = function() {
  displayType = 'default';
};

/* EVENTS */
window.addEventListener('resize', function() {
  defineDisplay();
});

var toggleDrawer = function() {
  uimask.classList.toggle('visible');
  sideNav.classList.toggle('visible');
  document.body.classList.toggle('disable-scrolling');
  document.documentElement.classList.toggle('disable-scrolling');
};

menuButton.addEventListener('click', function() {
  toggleDrawer();
});

uimask.addEventListener('click', function() {
  toggleDrawer();
});

window.addEventListener('scroll', function() {
  if (window.scrollY > peekabooConfig['header'][displayType]) {
    if (!header.classList.contains('peekaboo')) {
      header.classList.add('peekaboo');
      fauxHeader.classList.add('peekaboo');
    }
  } else {
    header.classList.remove('peekaboo');
    fauxHeader.classList.remove('peekaboo');
  }

  if (window.scrollY > peekabooConfig['header-wrapper'][displayType]) {
    if (!headerWrapper.classList.contains('peekaboo')) {
      headerWrapper.classList.add('peekaboo');
    }
  } else {
    headerWrapper.classList.remove('peekaboo');
  }
});

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
  defineDisplay();
});