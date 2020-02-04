// let collectionAlbumTemplate = function() {
//     var template = 
//     `<div class="collection-container">
//         <img class="album-image" src="assets/images/album_covers/01.png" />
//         <div class="album-info caption">
//             <p>
//                 <a class="album-name" href="album.html">The Colors</a>
//                 <br />
//                 <a class=album-artist" href="#">Pablo Picasso</a>
//                 <br />
//                 <p class="number-of-songs">X songs</p>
//                 <br />
//             </p>
//         </div>
//     </div>`;

//     return $(template);
// }

var getCurrentAlbum = function(album) {
    currentAlbum = album;

    var $albumImage = $('.album-image');
    var $albumArtist = $('.album-artist');
    var $albumName = $('.album-name');
    var $numberOfSongs = $('.number-of-songs');

    $albumImage.attr('src', album.albumArtUrl);
    $albumArtist.text(album.artist);
    $albumName.text(album.title);
    $numberOfSongs.text(album.songs.length + ' songs');

    var template = 
    `<div class="collection-container">
        <img class="album-image" src="assets/images/album_covers/01.png" />
        <div class="album-info caption">
            <p>
                <a class="album-name" href="album.html">The Colors</a>
                <br />
                <a class=album-artist" href="#">Pablo Picasso</a>
                <br />
                <p class="number-of-songs">X songs</p>
                <br />
            </p>
        </div>
    </div>`;

    return $(template);
}

$(window).load(function() {
    var $collectionContainer = $('.collection-covers');
    $collectionContainer.empty();
    for (var i = 0; i < 8; i++) {
        var $newThumbnail = getCurrentAlbum(albumPicasso);
        $collectionContainer.append($newThumbnail);
    }
});