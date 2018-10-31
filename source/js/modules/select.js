'use strict';

//управление выпадающими списками в форме
(function () {
  var select = document.querySelector('.certificate__select');
  var fieldInvoice = document.querySelector('.certificate__field-number--invoice');
  var fieldWaybill = document.querySelector('.certificate__field-number--waybill');

  var activeSelect = null;
  var selectedValue = null;
  var activeDropBlock = null;
  var inputValue = null;

  var showDropBlock = function () {
    activeSelect.classList.add('certificate__select--dropdown');
    activeDropBlock.style.display = 'block';
    activeDropBlock.addEventListener('click', onOptionClick);
    selectedValue.classList.remove('certificate__select-value--active');
  };

  var hideDropBlock = function () {
    activeSelect.classList.remove('certificate__select--dropdown');
    activeDropBlock.style.display = 'none';
    activeDropBlock.removeEventListener('click', onOptionClick);
    if (inputValue.value) {
      selectedValue.classList.add('certificate__select-value--active');
    }
  };

  var onOptionClick = function (evt) {
    var target = evt.target;

    while (target !== activeDropBlock) {
      if (target.classList.contains('certificate__select-option')) {
        selectedValue.textContent = target.textContent;
        inputValue.value = target.getAttribute('data-value');
        break;
      }
      target = target.parentNode;
    }
  };

  var onSelectClick = function (evt) {
    var target = evt.target;

    while (!target.classList.contains('certificate__select')) {
      target = target.parentNode;
    }

    if (activeSelect && activeSelect !== target) {
      hideDropBlock();
    }

    activeSelect = target;
    selectedValue = activeSelect.querySelector('.certificate__select-value');
    activeDropBlock = activeSelect.querySelector('.certificate__select-dropdown');
    inputValue = activeSelect.querySelector('input[type="hidden"]');

    if (activeSelect.classList.contains('certificate__select--dropdown')) {
      hideDropBlock();
    } else {
      showDropBlock();
    }

    if (inputValue.value == 'invoice') {
      fieldInvoice.classList.add('certificate__field-number--active');
      fieldWaybill.classList.remove('certificate__field-number--active');
    }
    if (inputValue.value == 'waybill') {
      fieldInvoice.classList.remove('certificate__field-number--active');
      fieldWaybill.classList.add('certificate__field-number--active');
    }
  };

  if (select) {
  select.addEventListener('click', onSelectClick);
  }
})();
