// ~~~~~~~~~~~ Playlist.js ~~~~~~~~~~~~

// ecode the model class Playlist as a constructor function
// with a single slots parameter as a record object with properties playlistName, playistMovies, and playlistShows 
// representing values for the name, title, and year attributes of the class Playlist
// assign the values of the slots properties to the corresponding attributes in the constructor function 

// Constructor with attribute definitions  
function Playlist( slots) {
  this.name = slots.name;
  this.movie = slots.movie;
  this.year = slots.year;
};

// for representing the collection of all Playlist instances managed by the application
// define and initialize the class-level property Playlist.instances as an empty object

// Class-level ("static") properties

Playlist.instances = {};  // initially an empty associative array

// use Local Storage to store playlist records in 3 steps:
// 1. retrieve the playlist table stored as a string with key 'playlistTable' 

// playlistTableString = localStorage["playlistTable"];

// 2. convert the playlist table string to a corresponding map playlistTable with playlist rows as elements 
// using built-in function JSON.parse, this conversion is called deserialization 

// playlistTable = JSON.parse( playlistTableString);

// 3. convert each row of playlistTable into a corresponding object of type Playlist stored as an element
// of the map Playlist.instances with help of procedure convertRow2Obj defined as a 'static' (class-level) 
// method in the Playlist class

// Class-level ("static") methods

// Convert row to object

Playlist.convertRow2Obj = function (playlistRow) {
  var playlist = new Playlist( playlistRow);
  return playlist;
};

// Load the playlist table from Local Storage

// full procedure for loading all playlist instances

Playlist.loadAll = function () {
  var key="", keys=[], playlistString="", playlists={}, i=0;  
  try {
    if (localStorage.getItem("playlists")) {
      playlistString = localStorage.getItem("playlists");
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (playlistString) {
    playlists = JSON.parse( playlistString);
    keys = Object.keys( playlists);
    console.log( keys.length +" playlists loaded.");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      Playlist.instances[key] = Playlist.convertRow2Obj( playlists[key]);
    }
  }
};

// save all playlist objects from Playlist.instances collection in main memory to Local Storage in 2 steps:
// 1. convert the map Playlist.instances into a string with predefined function JSON.stringify

// playlistTableString = JSON.stringify( Playlist.instances); // serialization

// 2. write the resulting string as the value of the key "playlistTable" to Local Storage

// localStorage["playlistTable"] = playlistTableString;

// full procedure for saving all playlist instances
Playlist.saveAll = function () {
  var playlistString="", error=false,
      nmrOfPlaylists = Object.keys( Playlist.instances).length;  
  try {
    playlistString = JSON.stringify( Playlist.instances);
    localStorage.setItem("playlists", playlistString);
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (!error) console.log( nmrOfPlaylists + " playlists saved.");
};

// create new Playlist instance Playlist.create and add it to the Playlist.instances collection

//  Create a new playlist row
Playlist.create = function (slots) {
  var playlist = new Playlist( slots);
  Playlist.instances[slots.name] = playlist;
  console.log("Playlist " + slots.name + " created!");
};

// update existing playlist intance by retrieving it form Playlist.instances 
// and then re-assing those attributes the value of which has changed
Playlist.update = function (slots) {
  var playlist = Playlist.instances[slots.name];
  var year = parseInt( slots.year);
  if (playlist.title !== slots.title) { playlist.title = slots.title;}
  if (playlist.year !== slots.year) { playlist.year = year;}
  console.log("Playlist " + slots.name + " modified!");
};

// delete a Playlist instance from Playlist.instances colection by first testing if the map has an 
// element with the given key, and then applying the built in delete operator, which deletes the element from the map
Playlist.destroy = function (name) {
  if (Playlist.instances[name]) {
    console.log("Playlist " + name + " deleted");
    delete Playlist.instances[name];
  } else {
    console.log("There is no playlist with name " + name + " in the database!");
  }
};

// create procedure for creating test data
Playlist.createTestData = function () {
  Playlist.instances["Netflix N Chill"] = new Playlist({name:"Netflix N Chill", movie:"The Notebook", year:2000});
  Playlist.instances["Guys Night"] = new Playlist({name:"Guys Night", movie:"Gladiator, Terminator 2, Skyfall, Inglorius Basterds", year:1999});
  Playlist.instances["Nature"] = new Playlist({name:"Nature", movie:"Everest, Grizzly Man, Planet Earth, Life", year:2008});
  Playlist.saveAll();
};

// create procedure for clearing all data from local Storage 
Playlist.clearData = function () {
  if (confirm("Do you really want to delete all playlist data?")) {
    Playlist.instances = {};
    localStorage.setItem("playlists", "{}");
  }
};
