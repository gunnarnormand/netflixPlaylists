// create Playlist.js using module pattern
// return only functions neccessary for other files to run 

(function () {
    
	function Playlist( slots) {
	  this.name = slots.name;
	  this.movie = slots.movie;
	  this.year = slots.year;
	};

	Playlist.instances = {};  

	Playlist.convertRow2Obj = function (playlistRow) {
	  var playlist = new Playlist( playlistRow);
	  return playlist;
	};

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

	Playlist.create = function (slots) {
	  var playlist = new Playlist( slots);
	  Playlist.instances[slots.name] = playlist;
	  console.log("Playlist " + slots.name + " created!");
	};

	Playlist.update = function (slots) {
	  var playlist = Playlist.instances[slots.name];
	  var year = parseInt( slots.year);
	  if (playlist.title !== slots.title) { playlist.title = slots.title;}
	  if (playlist.year !== slots.year) { playlist.year = year;}
	  console.log("Playlist " + slots.name + " modified!");
	};

	Playlist.destroy = function (name) {
	  if (Playlist.instances[name]) {
	    console.log("Playlist " + name + " deleted");
	    delete Playlist.instances[name];
	  } else {
	    console.log("There is no playlist with name " + name + " in the database!");
	  }
	};

	Playlist.createTestData = function () {
	  Playlist.instances["Netflix N Chill"] = new Playlist({name:"Netflix N Chill", movie:"The Notebook", year:2000});
	  Playlist.instances["Guys Night"] = new Playlist({name:"Guys Night", movie:"Gladiator, Terminator 2, Skyfall, Inglorius Basterds", year:1999});
	  Playlist.instances["Nature"] = new Playlist({name:"Nature", movie:"Everest, Grizzly Man, Planet Earth, Life", year:2008});
	  Playlist.saveAll();
	};

	Playlist.clearData = function () {
	  if (confirm("Do you really want to delete all playlist data?")) {
	    Playlist.instances = {};
	    localStorage.setItem("playlists", "{}");
	  }
	};

    return {
      playlist: playlist
    }
})();