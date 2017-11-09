var app = new Vue({
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
      }]
    }
  },
  methods: {
    expand: function (event) {
      console.log("hi" + event);
    }
  }
})

//to make the stop info expand down (thanks w3schools)
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}