document.addEventListener("DOMContentLoaded", () => {
  const playlist = document.querySelector(".playlist-body");






  //Load our Playlist from our json file
  fetch("data/data.json").then((response) => {
    if (!response.ok){
      throw new Error ("Network error: " + response.status);
    }
    return response.json();

  }).then((data) => {
    data.playlist.forEach(createPlaylistBox);

  }).catch((err) =>{
    console.error("Failed to load playlist", err);
  })
  
  

   


  function createPlaylistBox(pl) {

    const box = document.createElement("div");
    box.className = "playlist-box";
    box.innerHTML = `
  <div class="playlist-design-box">
    <img src="assets/img/playlist-back.png" alt="Playlist Cover" />
    <h3>${pl.title}</h3>
    <span class="edit-icon" data-id="${pl.id}">&#9998;</span> 
  </div>
  <p>By ${pl.author}</p>
  <div class="like-row">
    <span class="heart-icon">&#x2665;</span>
    <span class="like-count">${pl.likes}</span>
  </div>
`;


    const heart = box.querySelector(".heart-icon");
    const likeCount = box.querySelector(".like-count");

    heart.addEventListener("click", (e) => {
      e.stopPropagation();
      let n = parseInt(likeCount.textContent);

      if (heart.classList.contains("liked")) {
        heart.classList.remove("liked");
            heart.style.color =  "#cccccc";
        likeCount.textContent = --n;
      } else {
        heart.classList.add("liked");
        heart.style.color =  "#ef0404";
        likeCount.textContent = ++n;
      }
    });

    box.addEventListener("click", () => {
      
      openModal(pl);
    });

    playlist.appendChild(box);
  }

   function randomize(songs) {
      const previousValues = {
        //index : boolean
      };         
      const newSongs = [];             
      let count = 0;

      while (count < songs.length) {
        const randomIndex = Math.floor(Math.random() * songs.length);

        if (!previousValues[randomIndex]) {
          previousValues[randomIndex] = true;
          newSongs.push(songs[randomIndex]);
          count++;
        }
      }

      return newSongs;
    }




window.openModal = function (playlist) {
  const modal = document.getElementById("song-modal");


  document.getElementById("playlist-img-feature").src = "assets/img/playlist-back.png";
  document.getElementById("playlist-name").textContent = playlist.title;
  document.getElementById("playlist-author").textContent = `By ${playlist.author}`;

  const songList = document.getElementById("song-list");
  songList.innerHTML = "";

  playlist.songs.forEach(song => {
    const songCard = document.createElement("div");
    songCard.classList.add("song-card");

    songCard.innerHTML = `
      <div class="song-details">
        <img class="song-thumbnail" src="assets/img/song.png" alt="Song Thumbnail">
        <div class="song-info">
          <p class="song-title">${song.title}</p>
          <p class="song-artist">${song.artist}</p>
          <span class="song-duration">${song.duration}</span>
        </div>
      </div>
    `;

    songList.appendChild(songCard);
  });

  modal.style.display = "block";



   

    //Shuffle Processs

    const shuffle = document.getElementById("shuffle-button")

    shuffle.addEventListener('click', () => {
      songList.innerHTML = "" //clear
      const shuffledSongs = randomize(playlist.songs)

      shuffledSongs.forEach(song => {
        const songCard = document.createElement("div");
        songCard.classList.add("song-card");

        songCard.innerHTML = `
          <div class="song-details">
            <img class="song-thumbnail" src="assets/img/song.png" alt="Song Thumbnail">
            <div class="song-info">
              <p class="song-title">${song.title}</p>
              <p class="song-artist">${song.artist}</p>
              <p class="song-album">${song.album || "Unknown Album"}</p>
               <span class="song-duration">${song.duration}</span>
            </div>
          </div>
         
        `;
        songList.appendChild(songCard);
  
      })

     

    })
  }
  


    document.querySelector(".close").onclick = function () {
      document.getElementById("song-modal").style.display = "none";
    };

    window.onclick = function (event) {
      const modal = document.getElementById("song-modal");
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };

   const editModal = document.getElementById("edit-modal");
const closeEditBtn = document.querySelector(".close-edit");
const editTitleInput = document.getElementById("edit-title");
const editSongList = document.getElementById("edit-song-list");
const saveEditBtn = document.getElementById("save-edit-button");

let currentEditPlaylist = null; // to track which playlist is being edited

// Add event listener to close modal
closeEditBtn.onclick = () => editModal.style.display = "none";

// When clicking ✏️ icon
playlist.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-icon")) {
    const playlistId = e.target.dataset.id;
    const pl = playlistData.find(p => p.id == playlistId); // store your loaded playlist data in a global array
    if (pl) openEditModal(pl);
  }
});

function openEditModal(pl) {
  currentEditPlaylist = pl;
  editTitleInput.value = pl.title;

  editSongList.innerHTML = ""; // Clear before filling

  // Populate checkbox list
  allSongs.forEach(song => {  // <-- allSongs should be your master list
    const isChecked = pl.songs.some(s => s.title === song.title);

    editSongList.innerHTML += `
      <label>
        <input type="checkbox" value="${song.title}" ${isChecked ? 'checked' : ''}>
        ${song.title} — ${song.artist}
      </label>
    `;
  });

  editModal.style.display = "block";
}

saveEditBtn.onclick = () => {
  const newTitle = editTitleInput.value.trim();
  const selectedTitles = Array.from(editSongList.querySelectorAll("input[type='checkbox']:checked"))
                              .map(cb => cb.value);

  currentEditPlaylist.title = newTitle;
  currentEditPlaylist.songs = allSongs.filter(song => selectedTitles.includes(song.title));

  editModal.style.display = "none";
  document.querySelector(".playlist-body").innerHTML = ""; // Clear & redraw
  playlistData.forEach(createPlaylistBox);
};


      

});