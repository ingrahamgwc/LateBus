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
    //Depends on ?route=number format
    currentRoute: document.location.search.substring(7),
    buses: 
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
    }
  }, 
  // Go to the URL data has our data and display it
  loadBusRoutes: function() {
    // Store "this" so we can access our Vue object inside the asynchronous then() functions.
    // By the time the data is returned from the cloud, loadBusRoutes() has exited, and our context is no longer the Vue object
    // but "self" sticks around since it was defined here. This is a "closure".
    let self = this;
    
    fetch( serverURL + "/bussy-mcbus").
      then( function( response ) { if (response.ok) { return response.json(); }}).
      then( function( data ) {
        console.log( data );
        self.buses = data.busRoutes;
      });
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

