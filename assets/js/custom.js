$('a[href="#"]').on('click', function (e) {
	e.preventDefault();
})

const headTxt = new SplitType('.section-story__description', {
	types: 'words'
});

// const video1 = document.querySelector('.section-story__decoration video');
// video1.addEventListener('onloadeddata', function() {
// 	currentTime = video1.currentTime;
// 	duration = video1.duration;
// 	// console.log(currentTime)
// 	// console.log(duration)
// })
// function init() {
// 	window.addEventListener('scroll', function () {

// 		progressRatio = scrollY / (document.body.offsetHeight - window.innerHeight);

// 		if (progressRatio < 0) progressRatio = 0;

// 		if (progressRatio > 1) progressRatio = 1;
// 		video1.currentTime = video1.duration * progressRatio;
// 		// console.log(video1.currentTime,video1.duration)
// 	});

// }
// init()
// window.addEventListener('load', init);


ScrollTrigger.create({
	trigger: '.section-story',
	start: 'top top',
	scrub: true,
	onUpdate: function(self) {
		const video = document.querySelector('.section-story__decoration video');
		progressRatio = self.progress * 2;
		duration = 8;
		video.currentTime = duration * progressRatio;
	},
	// markers: true
})


ScrollTrigger.create({
	trigger: '.section-story__description',
	start: 'top top',
	end: 'bottom top',
	scrub: 0,
	onUpdate: function(self) {
		// const total = $('.section-story__description .word').length;
		// const current = Math.round(((self.progress * total) ));
		// const currentWord = $('.section-story__description .word').eq(current)
		// if($('.section-story__description .word.on')) {
		// 	$('.section-story__description .word').removeClass('on')
		// }
		// if(currentWord) {
		// 	currentWord.addClass('on')
		// }
		// console.log(current)

		imgEl = $('.section-story__description .word');
    total = imgEl.length - 1;
    currImg = Math.round(total-(self.progress * total));
    curr = imgEl.eq(currImg);

    if($('.section-story__description .word.on')) {
      imgEl.removeClass('on');
    }

    if(curr) {
      curr.addClass('on');
    }
	}
})

gsap.from('.section-story__description .word', {
	scrollTrigger: {
	trigger: '.section-story__description .word',

	}
})

const tl = gsap.timeline({
	trigger: '.section-story__description .word',
	start: 'top top',
	end: 'bottom top',
	scrub: 0,
	// markers: true
});
// tl.fromTo('.section-story__description .word', {opacity: .2}, {opacity: 1})

// gsap.fromTo('.section-story__description .word', 
// 	{
// 		opacity: .2
// 	},
// 	{
// 		opacity: 1
// 	}
// )

document.querySelectorAll('.section-story__description .word').forEach(function(element, index) {
	tl.fromTo($(this),{opacity: .2,}, {opacity: 1})
})


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

ScrollTrigger.create({
	trigger: '.section-ingredient',
	start: '-50% top',
	scrub: 0,
	onUpdate: function(self) {
		$('.section-ingredient__embedded video').get(0).play(0);
	},
	toggleActions: 'play none none reset',
	// markers: true
})

ScrollTrigger.create({
	trigger: '.section-package__embedded video',
	start: 'top top',
	end: '+=3000',
	pin: true,
	scrub: true,
	// markers: true,
	onUpdate: function(self) {
		const video = document.querySelector('.section-package__embedded video')
		progressRatio = self.progress;
		duration = 6;
		video.currentTime = duration * progressRatio;
	}
})

$('.section-faq__cta').click(function() {
	$(this).parents('.section-faq__item').toggleClass('is-open');
})

function getTime() {
	const time = document.querySelector('.section-banner__time span');
	const date = new Date();
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	time.innerText = `${minutes}:${seconds}`
}
getTime();
setInterval(getTime, 1000);