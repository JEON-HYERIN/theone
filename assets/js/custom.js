$('a[href="#"]').on('click', function (e) {
	e.preventDefault();
})

const headTxt = new SplitType('.section-story__description', {
	types: 'words'
});

const videoElem = document.querySelector('.section-story__decoration video');

let progressRatio;

let currentFrame;

function init() {
	window.addEventListener('scroll', function () {

		progressRatio = scrollY / (document.body.offsetHeight - window.innerHeight);

		if (progressRatio < 0) progressRatio = 0;

		if (progressRatio > 1) progressRatio = 1;
		videoElem.currentTime = videoElem.duration * progressRatio;

	});

}

window.addEventListener('load', init);


$('.section-about__item').on('mouseenter', function() {
	//aboutHover.play();
	$(this).addClass('.is-active');
	//gsap.set('.section-about__title', {display: 'none'});
})
$('.section-about__item').on('mouseleave', function() {
	//aboutLeave.play();
	//$(this).find('.section-about__item').removeAttr('style');
	$(this).removeClass('.is-active');
	//gsap.set('.section-about__title', {display: 'block'});
})