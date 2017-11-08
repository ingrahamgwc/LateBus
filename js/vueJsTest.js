new Vue({
  el: '#app',
  data: {
    currentRoute: 1006,
    bus: ["1003", "1004", "1005", "1006"],
    route1006: {
      name: "1006",
      stops: [{
        address: "Garfield HS LZ 400 23rd AVE",
        schedTime: "8:03",
        predTime: "predicted time",
        lat: 1.00,
        long: 2.4
      },
      {
        address: "23rd AVE E @ E Aloha St",
        schedTime: "8:03",
        predTime: "predicted time",
        lat: 1.00,
        long: 2.4
      },
      {
        address: "35th Ave NE @ NE 65th St",
        schedTime: "8:14",
        predTime: "predicted time",
        lat: 1.00,
        long: 2.4
      },]
    }
  }
})