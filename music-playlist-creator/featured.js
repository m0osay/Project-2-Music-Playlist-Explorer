document.addEventListener("DOMContentLoaded", () => {
  const featureContainer = document.querySelector(".featured-grid");

  fetch("data/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      const playlists = data.playlist;
      const playlistSelected = playlists[Math.floor(Math.random() * playlists.length)];

      // Playlist Info
      const playlistContainer = document.createElement("div");
      playlistContainer.className = "playlist-grid";
      playlistContainer.innerHTML = `
      <div class = "playlist-header">
  
         <img  src="assets/img/playlist-back.png" alt="Playlist Cover" />
      <h3>${playlistSelected.title}</h3>
       <p > By: ${playlistSelected.author}</p>

        </div>
      
      `;

      featureContainer.appendChild(playlistContainer);

      // Song List
      const songContainer = document.createElement("div");
      songContainer.className = "song-grid";

      playlistSelected.songs.forEach((song) => {
        const songCard = document.createElement("div");
        songCard.className = "song-card";
        songCard.innerHTML = `
          <img src="./assets/img/song.png" alt="Thumbnail">
          <div class="song-info">
            <strong>${song.title}</strong>
            <p>${song.artist}</p>
            <p>${song.album || "Unknown Album"}</p>
            <p>${song.duration}</p>
          </div>
        `;
        songContainer.appendChild(songCard);
      });

      featureContainer.appendChild(songContainer);
    })
});
