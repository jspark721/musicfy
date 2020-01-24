let collectionAlbumTemplate = 
`<div class="collection-container">
    <img src="assets/images/album_covers/01.png" />
    <div class="album-info caption">
        <p>
            <a class="album-name" href="album.html">The Colors</a>
            <br />
            <a href="#">Pablo Picasso</a>
            <br />
            X songs
            <br />
        </p>
    </div>
</div>`

window.onload = function() {
    let collectionContainer = document.getElementsByClassName('collection-covers')[0];
    collectionContainer.innerHTML = '';

    for(let i = 0; i < 8; i++) {
        collectionContainer.innerHTML += collectionAlbumTemplate;
        console.log(collectionAlbumTemplate);
    }
}