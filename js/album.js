var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var musicNoteTemplate = '<span class="ion-music-note"></span>';
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;


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
    currentAlbum = album;
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


let clickHandler = function(targetElement) {
    let songItem = getSongItem(targetElement);
    let songData = songItem.getAttribute('data-song-number');

    if(currentlyPlayingSongNumber === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSongNumber = songData;
    } else if(currentlyPlayingSongNumber === songData) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSongNumber = null;
    } else if (currentlyPlayingSongNumber !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSongNumber + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSongNumber = songItem.getAttribute('data-song-number');
    }
};


window.onload = function() {
    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {
        if(event.target.parentElement.className === 'album-view-song-item') {
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            let songItem = getSongItem(event.target);

            if(songItem.getAttribute('data-song-number') !== currentlyPlayingSongNumber) {
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
            if(songNumber !== currentlyPlayingSongNumber) {
                songItem.innerHTML = songNumber;
            } else if(songNumber === currentlyPlayingSongNumber) {
                songItem.innerHTML = pauseButtonTemplate;
            }
        });
        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);
        });
    }
};