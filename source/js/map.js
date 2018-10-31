function initMap() {
var centerLatLng = new google.maps.LatLng(55.707367, 37.429801);
var mapOptions = {
      center: centerLatLng,
      zoom: 17
};

var map = new google.maps.Map(document.querySelector(".contacts__map"), mapOptions);
var addressLatLng = new google.maps.LatLng(55.707367, 37.429801);

var isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));
var marker = new google.maps.Marker({
  position: addressLatLng,
  map: map,
  title: "ул. Верейская, д. 29, стр. 136, Москва",
  icon: isIE11 ? "img/icon-pin.png" : "img/icon-pin.svg"
});
}
