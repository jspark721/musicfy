let albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21' },
        { title: 'Magenta', duration: '2:15' }
    ]
};

let albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};


let createSongRow = function(songNumber, songName, songLength) {
    let template = 
        `<tr class="album-view-song-item">
            <td class="song-item-number"><span class="ion-music-note"></span></td>
            <td class="song-item-title">${songName}</td>
            <td class="song-item-duration">${songLength}</td>
        </tr>`
    ;
    return template;
}

let setCurrentAlbum = function(album) {
    let albumTitle = document.getElementsByClassName('album-view-title')[0];
    let albumArtist = document.getElementsByClassName('album-view-artist')[0];
    let albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    let albumImage = document.getElementsByClassName('album-cover-art')[0];
    let albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    albumSongList.innerHTML = '';

    for(let i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

let songListContainer = document.getElementsByClassName('album-view-song-list')[0];
let songRows = document.getElementsByClassName('album-view-song-item');

let playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

window.onload = function() {
    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {
        if(event.target.parentElement.className === 'album-view-song-item') {
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
        }
    });

    for(let i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            this.children[0].innerHTML = '<span class="ion-music-note"></span>';
        })
    }
};