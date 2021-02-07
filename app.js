const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displaySongs(data.data)
        })
}
const displaySongs = songs => {
    const songsContainer = document.getElementById('song-container');
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title} </h3>
                        <p class="author lead">Album By <span>${song.artist.name}</span> </p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success">Get Lyrics</button>
                    </div>
        `;

        songsContainer.appendChild(songDiv);
    });
}