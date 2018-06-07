let serverURL = "https://cmao24c1ob.execute-api.us-west-2.amazonaws.com/dev/";

var navbar = {
  template: "<div class=\"navdiv\">\
                <div id=\"mySidenav\" class=\"sidenav\">\
                  <span style=\"cursor:pointer\" class=\"closebtn\" onclick=\"closeNav()\">&times;</span>\
                  <a href=\"./index.html\">Home</a><a href=\"./about.html\">About</a>\
                  <a href=\"./help.html\">Help</a><a href=\"./contact.html\">Contact</a>\
                </div>\
              <span style=\"font-size:30px;cursor:pointer\" onclick=\"openNav()\">&#9776;</span>\
            </div>"
}

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('hh:mm');
  }
});

function openNav() {
  document.getElementById("mySidenav").style.width = "210px";
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
	  isWelcomePage: document.location.search.substring(1) == "welcome",
    timeLeft: 0,
    buses: stopData,
    position: 0,     // GPS coords
  },

  beforeCreate: function () {
    // find out where we are from browser/phone
    // watchPosition() calls our function whenever phone moves
    var self = this;
    navigator.geolocation.watchPosition(function (position) {
      console.log("Location = " + position.coords.latitude, position.coords.longitude);
      self.position = [ position.coords.latitude, position.coords.longitude];
    });
  },

  methods: {
    signin: function () {
      if (this.user == "") {
        console.log("Invalid username: " + this.user);
        this.user = "Anonymous";
      }
    },
    // this is called when the user pushes the "my bus is here" button is pushed. 
    arrivalReport: function (event) {
      console.log("hi world");
      // alert("GET ON THE BUS!");

      // Store "this" so we can access our Vue object inside the asynchronous then() function
      let self = this;

      let data = {
        userName: this.user,
        comment: "Hey a bus arrived",
        bus: parseInt(this.currentRoute),
        location: this.position,
        arrival: true
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
          self.loadBusRoutes();
          window.location.href = "https://ingrahamgwc.github.io/latebus/comments.html?route=" + self.currentRoute;
        })
        .catch(function (response) { 
          console.error(response);
          alert("something's broken :("); 
        });
    },
	closepopup: function (event) {
		this.isWelcomePage = false;
		window.location.href = "https://ingrahamgwc.github.io/latebus/index.html";
		
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
    //used by loadBusRoutes to find the stop address closest to a single comment's location
    getClosestAddress: function(commentCoordinates) {
      var shortestDistance = Number.MAX_SAFE_INTEGER;
      var closestAddress = "no address found";
      for(var i = 0; i < stopData.length; i++) {
        //only check correct route
        if(stopData[i].name == this.currentRoute) {
          console.log(stopData[i]);
          //loop through stop addresses
          for(var j = 0; j < stopData[i].stops.length; j++) {
            var tempDistance = Math.sqrt(Math.pow(commentCoordinates[0] - stopData[i].stops[j].lat, 2)
                   + Math.pow(commentCoordinates[1] - stopData[i].stops[j].long, 2));
            if(tempDistance < shortestDistance) { 
              shortestDistance = tempDistance;
              closestAddress = stopData[i].stops[j].address;
            }
          }
        }
      }
      console.log("Closest address: " + closestAddress)
      return closestAddress;
    },
    // Go to the URL data has our data and display it
    loadBusRoutes: function () {
      // Store "this" so we can access our Vue object inside the asynchronous then() functions.
      // By the time the data is returned from the cloud, loadBusRoutes() has exited, and our context is no longer the Vue object
      // but "self" sticks around since it was defined here. This is a "closure".
      let self = this;

      /*fetch(serverURL + "bus-routes")
        .then(function (response) { if (response.ok) { return response.json(); } })
        .then(function (data) {
          console.log(data);
          self.buses = data.busRoutes;
        });*/

      fetch(serverURL + "events?bus=" + this.currentRoute)
        .then(function (response) { if (response.ok) { return response.json(); } })
        .then(function (events) {
          console.log(events);
          //sort data by time
          function compare(a, b) {
            if (a.time > b.time) {
              return -1;
            } else if (a.time < b.time) {
              return 1;
            } else {
              return 0;
            }
          }
          events.sort(compare);
          //self.busEvents = events;

          //add address to busEvents object
          for(var i = 0; i < events.length; i++) {
            events[i].address = "no address found";
            events[i].address = self.getClosestAddress(events[i].location);

          }

          //find last arrival comment
          var lastArrival; //put a default value here
          var timeDiff = 0; //time difference in milliseconds

          for(var i = 0; i < events.length; i++) {
            if(events[i].arrival == true && events[i].address != "no address found") {

              //find scheduled time for that address
              for(var k = 0; k < stopData.length; k++) {
                //only check correct route
                var s = stopData[k].name;
                var c = self.currentRoute;
                if(stopData[k].name == self.currentRoute) {
                  console.log(stopData[k]);
                  //loop through stop addresses
                  for(var j = 0; j < stopData[k].stops.length; j++) {
                    if(stopData[k].stops[j].address == events[i].address) {
                      console.log(stopData[k].stops[j].address + ", " + events[i].address);
                      stopData[k].stops[j].predTime = stopData[k].stops[j].schedTime;

                      //make scheduled time into date data type
                      var schedDate = new Date();
                      var timeStr = stopData[k].stops[j].schedTime;
                      var hr = parseInt(timeStr.substring(0,timeStr.indexOf(":")));
                      var min = parseInt(timeStr.substring(timeStr.indexOf(":") + 1));
                      console.log(min);
                      schedDate.setHours(hr);
                      schedDate.setMinutes(min);
                      console.log(schedDate.getHours());
                      var schedDateMs = Date.parse(schedDate);

                      var eventDate = Date.parse(events[i].time);

                      var currentDiff = schedDateMs - eventDate;
                      console.log(schedDateMs - eventDate);
                      if(Math.abs(currentDiff) > Math.abs(timeDiff)) { //should change this at some point - pretty wrong. 
                        timeDiff = currentDiff;
                      }

                    }
                  }
                }
              }

              
            } 
          }

          //add predicted time to each busEvents object
          for(var k = 0; k < stopData.length; k++) {
            //only check correct route
            var s = stopData[k].name;
            var c = self.currentRoute;
            if(stopData[k].name == self.currentRoute) {
              console.log(stopData[k]);
              //loop through stop addresses
              for(var j = 0; j < stopData[k].stops.length; j++) {

                //make scheduled time into date data type
                var schedDate = new Date();
                var timeStr = stopData[k].stops[j].schedTime;
                var hr = parseInt(timeStr.substring(0,timeStr.indexOf(":")));
                var min = parseInt(timeStr.substring(timeStr.indexOf(":") + 1));
                console.log(min);
                schedDate.setHours(hr);
                schedDate.setMinutes(min);
                console.log(schedDate.getHours());
                var schedDateMs = Date.parse(schedDate);

                var diffDate = new Date(schedDateMs -  timeDiff)
                stopData[k].stops[j].predTime = diffDate.getHours() + ":" + diffDate.getMinutes();
              }
            }
          }
          self.busEvents = events;

        });
    },
    // Go to the URL data has our data and display it
    loadTimeRemaining: function() {

      if (!this.position) {
        this.timeLeft = "can't figure out your location";
        return;
      }
      let busStop = new google.maps.LatLng( this.position.latitude,
                                            this.position.longitude );

      var googleMaps = new google.maps.DistanceMatrixService();
      googleMaps.getDistanceMatrix(
        {
          origins: [busStop],
          destinations: [this.destination],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: true,
        }, callback);

        
      function callback( data, status) {
          console.log( data );
        self.timeLeft = data.rows[0].elements[0].duration.text;
      }
    },
    // Storing a comment in the data base then we re-load the comments.
    saveComment: function () {
      // Store "this" so we can access our Vue object inside the asynchronous then() function
      let self = this;
	    var filter = new Filter();
	    var cleanComment = filter.clean(this.busComment); //Don't be an ******
	    var cleanUserName = filter.clean(this.user);    
      let data = {
        comment: cleanComment,
	      userName: cleanUserName,
        bus: parseInt(this.currentRoute),
        location: this.position,
        arrival: false
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
          self.loadBusRoutes()
        })
        .catch(function (response) { console.error(response); });
    }
  },
  components: {
    'navbar': navbar
  },
  //comments page loads immediately
  mounted: function () {
    let self = this;
    //depends on the url being commentsTest
    // this breaks everything but why?: 
    if (document.location.toString().includes("comments.html") || document.location.toString().includes("busroute.html")) {
    //if (document.location.toString().includes("comments.html")) {

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
