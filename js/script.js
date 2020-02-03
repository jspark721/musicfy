let boxArray = document.getElementsByClassName('desc');

let animateDescBox = function(box) {

    let revealBox = function(i) {
        boxArray[i].style.opacity = 1;
        boxArray[i].style.transform = "scaleX(1) translateY(0)";
        boxArray[i].style.msTransform = "scaleX(1) translateY(0)";
        boxArray[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    };

    for(let i = 0; i < boxArray.length; i++) {
        setTimeout(function timer() {
            revealBox(i);
            console.log('reveal box');
        }, i * 200);
    }
};

$(window).load(function() {
    if(window.innerHeight > 950) {
        animateDescBox(boxArray);
    }

    let desc = document.getElementsByClassName('desc')[0];
    let scrollDistance = desc.getBoundingClientRect().top - window.innerHeight + 200;

    window.addEventListener('scroll', function(event) {
        if(document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animateDescBox(boxArray);
        }
    })
});

