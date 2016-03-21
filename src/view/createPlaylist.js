// ~~~~~~~~~~~ createPlaylist.js ~~~~~~~~~~~~

// 1. set setupUserInterface to retreive collection of all objects from the persistent data store and set up 
// event handler handleSaveButtonClickEvent on save button for click events by saving user input data 

pl.view.createPlaylist = {
  setupUserInterface: function () {
    var saveButton = document.forms['Playlist'].commit;
    // load all playlist objects
    Playlist.loadAll();
    // Set an event handler for the save/submit button
    saveButton.addEventListener("click", 
        pl.view.createPlaylist.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function () {
        Playlist.saveAll(); 
    });
  },
  
  // save user input data
  // set handleSaveButtonClickEvent to read user input data from form fields and then save this data
  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Playlist'];
    var slots = { name: formEl.name.value, 
        movie: formEl.movie.value, 
        year: formEl.year.value};
    Playlist.create( slots);
    formEl.reset();
  }
};