var app = new Vue({
  el: '#app',
  data: {
    //Depends on ?route=number format
    currentRoute: document.location.search.substring(7),
    buses: [{
      name: "1004",
      stops: [{
        address: "NW 85th St @ 17th AVE NW",
        schedTime: "8:24",
        predTime: "predicted time",
        lat: 1.00,
        long: 2.4
      },
      {
        address: "NW 85th St@ 24th AVE NW",
        schedTime: "8:25",
        predTime: "predicted time",
        lat: 1.00,
        long: 2.4
      },
      {
        address: "NW 85th St@ 24th AVE NW",
        schedTime: "8:25",
        predTime: "predicted time",
        lat: 1.00,
        long: 2.4
      },
      {
        address: "24th AVE NW @ NW 96th St",
        schedTime: "8:27",
        predTime: "predicted time",
        lat: 1.00,
        long: 2.4
      },
      {
        address: "15th AVE NW @ NW 100th St",
        schedTime: "8:30",
        predTime: "predicted time",
        lat: 1.00,
        long: 2.4
      }]
    },
    {
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
      }]
    }]
  },
  methods: {
    expand: function (event) {
      /*console.log("hi" + HTMLDivElement);
      this.style.display = "visible";
      console.log(document.getElementsByClassName("accordion"));
      //document.getElementsByClassName("accordion").classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }*/
    }
  }
})


//to make the stop info expand down (thanks w3schools)
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
  acc[i].onclick = function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }
}
