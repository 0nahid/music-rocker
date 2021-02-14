const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    toggleSpinner();
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    } catch (error) {
        displayError();
    }
}
const displaySongs = songs => {
    const songsContainer = document.getElementById('song-container');
    songsContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title} </h3>
                        <p class="author lead">Album By <span>${song.artist.name}</span> </p>
                        <audio controls
                            src="${song.preview}">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `;
        songsContainer.appendChild(songDiv);
        toggleSpinner();
    });
}

const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    } catch (error) {
        displayError()
    }
}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerHTML = '';
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = 'Sorry! we can\'t reach you. Please try Again Later';
    return displayError(error);
}

const toggleSpinner = () => {
    const spinner = document.getElementById('loaderSpinner');
    spinner.classList.toggle('d-none');
}