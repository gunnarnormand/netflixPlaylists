// update setupUserInterface procedure to set up a selection field by retreiving the collection of all 
// book objects from the persistent data store for populating the select element's option list

pl.view.updatePlaylist = {
  setupUserInterface: function () {
    var formEl = document.forms['Playlist'],
        saveButton = formEl.commit,
        selectPlaylistEl = formEl.selectPlaylist;
    var key="", keys=[], playlist=null, optionEl=null, i=0;
    // load all playlist objects
    Playlist.loadAll();
    // populate the selection list with playlists
    keys = Object.keys( Playlist.instances);
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      playlist = Playlist.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = playlist.movie;
      optionEl.value = playlist.name;
      selectPlaylistEl.add( optionEl, null);
    }
    // when a playlist is selected, populate the form with the playlist data
    selectPlaylistEl.addEventListener("change", function () {
        var playlist=null, key = selectPlaylistEl.value;
        if (key) {
          playlist = Playlist.instances[key];
          formEl.name.value = playlist.name;
          formEl.movie.value = playlist.movie;
          formEl.year.value = playlist.year;
        } else {
      	  formEl.name.value = "";
      	  formEl.movie.value = "";
      	  formEl.year.value = "";
        }
    });
    saveButton.addEventListener("click", 
        pl.view.updatePlaylist.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function () {
        Playlist.saveAll(); 
    });
  },
  // save session data
  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Playlist'];
    var slots = { name: formEl.name.value, 
          movie: formEl.movie.value, 
          year: formEl.year.value
        };
    Playlist.update( slots);
    formEl.reset();
  }
};