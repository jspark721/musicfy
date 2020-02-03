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
    var $row = $(template);

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if(songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        };
    };
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if(songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        };
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
}

let setCurrentAlbum = function(album) {
    currentAlbum = album;

    let $albumTitle = $('.album-view-title');
    let $albumArtist = $('.album-view-artist');
    let $albumReleaseInfo = $('.album-view-release-info');
    let $albumImage = $('.album-cover-art');
    let $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for(let i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};


let clickHandler = function() {
	var songNumber = $(this).attr('data-song-number');

	if (currentlyPlayingSongNumber !== null) {
		// Revert to song number for currently playing song because user started playing new song.
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
		currentlyPlayingCell.html(currentlyPlayingSongNumber);
	}
	if (currentlyPlayingSongNumber !== songNumber) {
		// Switch from Play -> Pause button to indicate new song is playing.
        $(this).html(pauseButtonTemplate);
        $('.album-song-button').css('background-color', '#f0baba');
        $('.album-song-button').css('color', '#fce5dd');
		currentlyPlayingSongNumber = songNumber;
	} else if (currentlyPlayingSongNumber === songNumber) {
		// Switch from Pause -> Play button to pause currently playing song.
		$(this).html(playButtonTemplate);
		currentlyPlayingSongNumber = null;
	}
};


$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
});