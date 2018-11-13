'use strict';

window.navigation = (function () {
  var MOBILE_WIDTH_MAX = 939;

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

  var siteList = document.querySelector('.site-list');

  var dropdownItem = function (item) {
    var openedItems = document.querySelectorAll('.site-list__toggle--active');
    [].forEach.call(openedItems, function (openedItem) {
      openedItem !== item && openedItem.classList.remove('site-list__toggle--active');
    });
    if (item.classList.contains('site-list__toggle--active')) {
      item.classList.remove('site-list__toggle--active');
    } else {
      item.classList.add('site-list__toggle--active');
    }
  };

  var dropdownOverItem = function (item) {
    item.classList.remove('site-list__item--active');
    item.classList.add('site-list__item--active');
  };

  var dropdownOutItem = function (item) {
    item.classList.add('site-list__item--active');
    item.classList.remove('site-list__item--active');
  };


  var dropdownOverItemHandler = function (evt) {
    var target = evt.target;
      while (target !== siteList) {
        if (target.classList.contains('site-list__item--dropdown')) {
          dropdownOverItem(target);
          break;
        }
        target = target.parentNode;
      }
  };

  var dropdownOutItemHandler = function (evt) {
    var target = evt.target;
      while (target !== siteList) {
        if (target.classList.contains('site-list__item--dropdown')) {
          dropdownOutItem(target);
          break;
        }
        target = target.parentNode;
      }
  }

  var dropdownItemHandler = function (evt) {
    var target = evt.target;
      while (target !== siteList) {
        if (target.classList.contains('site-list__toggle')) {
          dropdownItem(target);
          break;
        }
        target = target.parentNode;
      }
  };

  if (isMobileScreen()) {
    siteList.addEventListener('click', dropdownItemHandler);
  }
  if (!isMobileScreen()) {
    siteList.removeEventListener('click', dropdownItemHandler);
    siteList.addEventListener("mouseover", dropdownOverItemHandler);
    siteList.addEventListener("mouseout", dropdownOutItemHandler);
  }
  headerToggle.addEventListener('click', onToggleClick);

  return {
    isOpened: isHeaderOpened,
    show: showHeader,
    hide: hideHeader
  };
})();
