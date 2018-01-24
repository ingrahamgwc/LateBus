// my url --> let serverURL = "https://r3dnwi3z86.execute-api.us-east-1.amazonaws.com/dev";
let serverURL = "https://i526t8ar6k.execute-api.us-west-2.amazonaws.com/dev/";

Vue.component("navbar", {
  template: "<div>\
                <div id=\"mySidenav\" class=\"sidenav\">\
                  <span style=\"cursor:pointer\" class=\"closebtn\" onclick=\"closeNav()\">&times;</span>\
                  <a href=\"./homepage.html\">Home</a><a href=\"./about.html\">About</a>\
                  <a href=\"./help.html\">Help</a><a href=\"./contact.html\">Contact</a>\
                </div>\
              <span style=\"font-size:30px;cursor:pointer\" onclick=\"openNav()\">&#9776; Home</span>\
            </div>"
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

var app = new Vue({
  el: "#app",
  data: {
    busComment: "",
    busEvents:[],
    //Depends on ?route=number format
    currentRoute: document.location.search.substring(7),
    buses: [
      {
        name: "1002",
        stops: [{
          address: "7th Ave W @ W Wheeler St NW",
          schedTime: "8:04",
          predTime: "predicted time",
          lat: 47.64071260000001,
          long: -122.36624569999998

        },
        {
          address: "22nd Ave W @ W Barrett St NW",
          schedTime: "8:11",
          predTime: "predicted time",
          lat: 47.6465926,
          long: -122.38467179999998
        },
        {
          address: "15th Ave NW @NW Market St SE",
          schedTime: "8:18",
          predTime: "predicted time",
          lat: 47.6686653,
          long: -122.37620040000002
        },
        {
          address: "15th Ave NW @ NW 65th St SE",
          schedTime: "8:20",
          predTime: "predicted time",
          lat: 47.67602240000001,
          long: -122.37651740000001
        },
        {
          address: "15th Ave NW @ NW 75th St SE",
          schedTime: "8:22",
          predTime: "predicted time",
          lat: 47.6832287,
          long: -122.3767972
        },
        {
          address: "Ashworth Ave N @ N 135th St SE",
          schedTime: "8:35",
          predTime: "predicted time",
          lat: 47.7268625,
          long: -122.33958459999997
        }]
      },
      {
        name: "1003",
        stops: [{
          address: "NW 85th St @15th Ave NW",
          schedTime: "8:23",
          predTime: "predicted time",
          lat: 47.6906124,
          long: -122.37680969999997

        },
        {
          address: "NW 85th St @17th Ave NW",
          schedTime: "8:24",
          predTime: "predicted time",
          lat: 47.6905997,
          long: -122.378961

        },
        {
          address: "NW 85th St @ 24th Ave NW",
          schedTime: "8:25",
          predTime: "predicted time",
          lat: 47.69057429999999,
          long: -122.38762270000001
        },
        {
          address: "24th Ave NW @ NW 96th St SE",
          schedTime: "8:27",
          predTime: "predicted time",
          lat: 47.6989729,
          long: -122.38757609999999
        },
        {
          address: "15th Ave NW @ NW 100th St SE",
          schedTime: "8:30",
          predTime: "predicted time",
          lat: 47.70154160000001,
          long: -122.37678089999997
        },
        {
          address: "Ashworth Ave N @ N 135th St SE",
          schedTime: "8:35",
          predTime: "predicted time",
          lat: 47.7268625,
          long: -122.33958459999997
        }]
      },
      {
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
    //listens to submitted comments
    addComment: function (event) {
      console.log("A comment was submitted!");
      //call to serverless
    },
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

    },
    // Go to the URL data has our data and display it
    /*getComments: function () {
      // Store "this" so we can access our Vue object inside the asynchronous then() functions.
      // By the time the data is returned from the cloud, loadBusRoutes() has exited, and our context is no longer the Vue object
      // but "self" sticks around since it was defined here. This is a "closure".
      let self = this;

      fetch(serverURL + "/bussy-mcbus").
        then(function (response) { if (response.ok) { return response.json(); } }).
        then(function (data) {
          console.log(data);
          self.buses = data.busRoutes;
        });
    }*/
    // Go to the URL data has our data and display it
    loadBusRoutes: function () {
      // Store "this" so we can access our Vue object inside the asynchronous then() functions.
      // By the time the data is returned from the cloud, loadBusRoutes() has exited, and our context is no longer the Vue object
      // but "self" sticks around since it was defined here. This is a "closure".
      let self = this;

      fetch(serverURL + "bus-routes")
        .then(function (response) { if (response.ok) { return response.json(); } })
        .then(function (data) {
          console.log(data);
          self.buses = data.busRoutes;
        });

      fetch(serverURL + "events?bus=1999")
        .then(function (response) { if (response.ok) { return response.json(); } })
        .then(function (events) {
          console.log(events);
          self.busEvents = events;
        });
    },
    // Go to the URL data has our data and display it
    saveComment: function () {
      // Store "this" so we can access our Vue object inside the asynchronous then() function
      let self = this;

      let data = {
        userName: "Anonymous",
        comment: this.busComment,
        bus: 1999
      };

      let jsonHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      };

      // post the data to the server to store
      fetch(serverURL + "event", {
        headers: jsonHeaders,
        method: "POST",
        body: JSON.stringify(data)
      })
        .then(function (response) {
          console.log(response); self.debug = response.json();
        })
        .catch(function (response) { console.error(response); });
    }
  }
});

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

