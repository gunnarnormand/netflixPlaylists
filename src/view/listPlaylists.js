// ~~~~~~~~~~~ listPlaylists.js ~~~~~~~~~~~~

// create procedure for setting up the data management context and UI called setupUserInterface in 2 steps:
// 1. read the collection of all objects from the persistent data store 
// 2. display each object as a row in a HTML table on the screen (using a loop)

pl.view.listPlaylists = {
  setupUserInterface: function () {
    var tableBodyEl = document.querySelector("table#playlists>tbody");
    var keys=[], key="", row={}, i=0;
    // load all playlist objects
    Playlist.loadAll();
    keys = Object.keys( Playlist.instances);
    // for each playlist, create a table row with a cell for each attribute
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      row = tableBodyEl.insertRow(-1);
      row.insertCell(-1).textContent = Playlist.instances[key].name;      
      row.insertCell(-1).textContent = Playlist.instances[key].movie;  
      row.insertCell(-1).textContent = Playlist.instances[key].year;
    }
  }
};