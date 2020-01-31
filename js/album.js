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

/* functions */

let createSongRow = function(songNumber, songName, songLength) {
    let template = 
        `<tr class="album-view-song-item">
            <td class="song-item-number" data-song-number="${songNumber}">${songNumber}</td>
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

let findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};

let getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var musicNoteTemplate = '<span class="ion-music-note"></span>';
var currentlyPlayingSong = null;


let clickHandler = function(targetElement) {
    let songItem = getSongItem(targetElement);
    let songData = songItem.getAttribute('data-song-number');

    if(currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songData;
    } else if(currentlyPlayingSong === songData) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
};


window.onload = function() {
    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {
        if(event.target.parentElement.className === 'album-view-song-item') {
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            let songItem = getSongItem(event.target);

            if(songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            } else {
                songItem.innerHTML = pauseButtonTemplate;
            }
        }
    });

    for(let i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            let songItem = getSongItem(event.target);
            let songNumber = songItem.getAttribute('data-song-number');
            if(songNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songNumber;
            } else if(songNumber === currentlyPlayingSong) {
                songItem.innerHTML = pauseButtonTemplate;
            }
        });
        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);
        });
    }
};