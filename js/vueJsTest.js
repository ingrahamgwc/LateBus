let serverURL = "https://cmao24c1ob.execute-api.us-west-2.amazonaws.com/dev/";

var navbar = {
  template: "<div class=\"navdiv\">\
                <div id=\"mySidenav\" class=\"sidenav\">\
                  <span style=\"cursor:pointer\" class=\"closebtn\" onclick=\"closeNav()\">&times;</span>\
                  <a href=\"./homepage.html\">Home</a><a href=\"./about.html\">About</a>\
                  <a href=\"./help.html\">Help</a><a href=\"./contact.html\">Contact</a>\
                </div>\
              <span style=\"font-size:30px;cursor:pointer\" onclick=\"openNav()\">&#9776;</span>\
            </div>"
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

var app = new Vue({
  el: "#app",
  data: {
    user: "Anonymous",
    busComment: "",
    busEvents: [],
    //Depends on ?route=number format
    currentRoute: document.location.search.substring(7),
    buses: stopData
  },
  methods: {
    signin: function () {
      if (this.user == "") {
        console.log("Invalid username: " + this.user);
        this.user = "Anonymous";
      }
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

      fetch(serverURL + "events?bus=" + this.currentRoute)
        .then(function (response) { if (response.ok) { return response.json(); } })
        .then(function (events) {
          console.log(events);
          //sort data by time
          function compare(a,b) {
            if(a.time < b.time) {
              return -1;
            } else if (a.time > b.time) {
              return 1;
            } else {
              return 0;
            }
          }
          events.sort(compare);
          self.busEvents = events;
        });
    },
    // Go to the URL data has our data and display it
    saveComment: function () {
      // Store "this" so we can access our Vue object inside the asynchronous then() function
      let self = this;

      let data = {
        userName: this.user,
        comment: this.busComment,
        bus: parseInt(this.currentRoute)
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
  },
  components: {
    'navbar': navbar
  },
  //comments page loads immediately
  mounted() {
    let self = this;
    //depends on the url being commentsTest
    if (document.location.toString().includes("commentsTest.html")) {
      this.loadBusRoutes();
      // setinterval function
      setInterval(function () {
        this.loadBusRoutes();
      }.bind(this), 30000);
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
