'use strict';

window.navigation = (function () {
  var MOBILE_WIDTH_MAX = 749;

  var header = document.querySelector('.page-header');
  var headerToggle = document.querySelector('.page-header__toggle');
  var siteList = document.querySelector('.site-list');

  var isHeaderOpened = function () {
    return header.classList.contains('page-header--opened');
  };

  var isMobileScreen = function () {
    return window.innerWidth <= MOBILE_WIDTH_MAX;
  };

  var showHeader = function () {
    header.classList.remove('page-header--closed');
    header.classList.add('page-header--opened');
    window.addEventListener('resize', resizeWindowHandler);
  };

  var hideHeader = function () {
    header.classList.remove('page-header--opened');
    header.classList.add('page-header--closed');
    window.removeEventListener('resize', resizeWindowHandler);
  };

  var onToggleClick = function () {
    if (isHeaderOpened()) {
      hideHeader();
    } else {
      showHeader();
    }
  };

  var resizeWindowHandler = function () {
    if (!isMobileScreen() && isHeaderOpened()) {
      hideHeader();
    }
  };

  var siteToggle = document.querySelector(".site-list__toggle");
  var subNav = document.querySelector(".sub-nav");
  var dropdown = document.querySelector(".site-list__item--dropdown");

  var dropdownItem = function () {
    if (subNav.classList.contains('sub-nav--active') && siteToggle.classList.contains('site-list__toggle--active')){
      subNav.classList.remove('sub-nav--active');
      siteToggle.classList.remove('site-list__toggle--active');
    } else {
      subNav.classList.add('sub-nav--active');
      siteToggle.classList.add('site-list__toggle--active')
    }
  };

  if (!isMobileScreen()) {
    dropdown.addEventListener("mouseenter", function (evt) {
      subNav.classList.remove("sub-nav--active");
      subNav.classList.add("sub-nav--active");
    });
    dropdown.addEventListener("mouseleave", function (evt) {
      subNav.classList.add("sub-nav--active");
      subNav.classList.remove("sub-nav--active");
    });
  }

  siteToggle.addEventListener ("click", dropdownItem);
  headerToggle.addEventListener('click', onToggleClick);

  return {
    isOpened: isHeaderOpened,
    show: showHeader,
    hide: hideHeader
  };
})();
