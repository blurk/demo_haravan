/* STICKY HEADER */
$(window).scroll(function () {
  const sticky = $("#header"),
    scroll = $(window).scrollTop();

  if (scroll >= 100) {
    sticky.addClass("sticky");
    $("#toTop").removeClass("fadeOut");
    $("#toTop").addClass("fadeIn");
  } else {
    sticky.removeClass("sticky");
    $("#toTop").removeClass("fadeIn");
    $("#toTop").addClass("fadeOut");
  }
});

/* HIDE NAV SUBMENU WHEN CLICK */

$("#myDropDownBtn").click((e) => {
  $(".my-dropdown-menu").hide();
  $(".my-dropdown > span").hide();
});

/* LOAD MORE ITEMS */
function render(child = "", parent = "", number = 0) {
  for (let i = 0; i < number; i++) {
    $(`.${child}`).first().clone().appendTo(`.${parent}`);
  }
}

$("#btnLoadMore").click(() => {
  $(".load-more").append("<div class='loader mx-auto'></div>");
  $("#btnLoadMore").hide();
  axios.get("https://picsum.photos/v2/list?page=1&limit=8").then(({ data }) => {
    $(".loader").remove();
    render("product", "products", 8);
    $("#btnLoadMore").show();
  });
});

/* SLIDER */
let slider1 = tns({
  container: "#slider1",
  loop: false,
  startIndex: 0,
  nav: false,
  swipeAngle: false,
  speed: 400,
  gutter: 20,
  controlsContainer: "#slider-controls1",
  responsive: {
    "576": {
      items: 1,
    },
    "768": {
      items: 3,
    },
    "992": {
      items: 4,
    },
  },
});

let slider2 = tns({
  container: "#slider2",
  loop: false,
  startIndex: 0,
  nav: false,
  swipeAngle: false,
  speed: 400,
  gutter: 20,
  controlsContainer: "#slider-controls2",
  responsive: {
    "576": {
      items: 1,
    },
    "768": {
      items: 3,
    },
    "992": {
      items: 4,
    },
  },
});

let slider3 = tns({
  container: "#slider3",
  loop: false,
  startIndex: 0,
  nav: false,
  swipeAngle: false,
  speed: 400,
  gutter: 20,
  controlsContainer: "#slider-controls3",
  responsive: {
    "576": {
      items: 1,
    },
    "768": {
      items: 3,
    },
    "992": {
      items: 4,
    },
  },
});

let slider4 = tns({
  container: "#slider4",
  startIndex: 0,
  loop: false,
  nav: false,
  swipeAngle: false,
  speed: 400,
  controlsContainer: "#slider-controls4",
  responsive: {
    "576": {
      items: 1.1,
    },
    "768": {
      items: 4.1,
    },
  },
});

let slider5 = tns({
  container: "#slider5",
  startIndex: 0,
  nav: false,
  swipeAngle: false,
  gutter: 10,
  speed: 400,
  controlsContainer: "#slider-controls5",
  responsive: {
    "576": {
      items: 2,
    },
    "768": {
      items: 4,
    },
  },
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
    `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
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
