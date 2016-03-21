
// Methods for the use case "delete playlist" 

pl.view.deletePlaylist = {
  setupUserInterface: function () {
    var deleteButton = document.forms['Playlist'].commit;
    var selectEl = document.forms['Playlist'].selectPlaylist;
    var key="", keys=[], playlist=null, optionEl=null, i=0;
    
    // load all playlist objects
    Playlist.loadAll();
    keys = Object.keys( Playlist.instances);
    
    // populate the selection list with playlists
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      playlist = Playlist.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = playlist.movie;
      optionEl.value = playlist.name;
      selectEl.add( optionEl, null);
    }
    deleteButton.addEventListener("click", 
        pl.view.deletePlaylist.handleDeleteButtonClickEvent);
    window.addEventListener("beforeunload", function () {
        Playlist.saveAll(); 
    });
  },
  
  // Event handler for deleting a playlist
  handleDeleteButtonClickEvent: function () {
    var selectEl = document.forms['Playlist'].selectPlaylist;
    var name = selectEl.value;
    if (name) {
      Playlist.destroy( name);
      
      // remove deleted playlist from select options
      selectEl.remove( selectEl.selectedIndex);
    }
  }
};