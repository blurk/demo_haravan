/* STICKY HEADER */
$(window).scroll(function () {
  const sticky = $("#header"),
    scroll = $(window).scrollTop();

  if (scroll >= 100) {
    sticky.addClass("mySticky");
    $("#toTop").removeClass("fadeOut");
    $("#toTop").addClass("fadeIn");
  } else {
    sticky.removeClass("mySticky");
    $("#toTop").removeClass("fadeIn");
    $("#toTop").addClass("fadeOut");
  }
});

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  document
    .querySelectorAll(".navbar-nav > .nav-item:nth-child(3)")[0]
    .classList.remove("my-dropdown");
}

/* HIDE NAV SUBMENU WHEN CLICK */

$("#myDropDownBtn").click(() => {
  $(".my-dropdown-menu").hide();
  $(".my-dropdown > span").hide();
});

/* GEOLOCATION */
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

let crd = null;

function success(pos) {
  crd = pos.coords;
  let latlng = new L.LatLng(crd.latitude, crd.longitude);
  let myMap = L.map("mapid").setView(latlng, 14);

  const accessToken =
    "pk.eyJ1IjoiYmx1cmsiLCJhIjoiY2tkY2xwNmJ1MXI4aDJybHZ6bWgwODF1eSJ9.K6hjHyS6EA01LL1wDZrHvg";

  L.tileLayer(
    `http://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
    {
      maxZoom: 20,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: accessToken,
    }
  ).addTo(myMap);

  var newMarker = new L.marker(latlng).addTo(myMap);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

/* TO TOP BUTTON */

$("#toTop").click(() => {
  $(window).scrollTop(0);
});

/* LOAD MORE ITEMS */
function render(child = "", parent = "", number = 0, data) {
  for (let i = 0; i < number; i++) {
    const $arr = $(`.${child}`).first().clone();
    const { download_url } = data[i];
    $arr[0].querySelector(".product__image > img").src = download_url;
    $arr.appendTo(`.${parent}`);
  }
}

/* TOOLTIP */

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

/*FORMAT CURRENCY*/

function formatCurrency(amount) {
  return (
    new Intl.NumberFormat("vn-VN", { style: "currency", currency: "VND" })
      .format(amount)
      .slice(1) + "₫"
  );
}
