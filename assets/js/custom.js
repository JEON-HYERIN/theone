$('a[href="#"]').on('click', function (e) {
	e.preventDefault();
})

gsap.to('.loading__text', {
	duration: 1,
	opacity: 1,
	delay: 1,
	text: 'Pelando las patatas fritas...',
})

const loadingMotion = gsap.timeline({
	// paused: true,
	onComplete: function() {
		$('body').removeAttr('style');
	}
});
loadingMotion
.set('body', {overflow: 'hidden'})
.to('.loading__text', {text: 'Sazonando la carne...', delay: 1, duration:2})
.to('.loading__icon svg', {rotate: 180,duration: .5, ease: "power1.inOut"},"+=.4")
.fromTo('.loading__text', {opacity: '.5'}, {text: 'Pelando las patatas fritas...', opacity: 1, duration:2}, "+=.7")
.to('.loading__icon svg', {rotate: 360,duration: .5, ease: "power1.inOut"},"+=.4")
.set('body', {overflow: 'auto'},"+=1")
.to('.loading', {yPercent: -100, duration: .5, ease: "power2.out"},"+=0")
.set('.loading', {display: 'none'}, "+=.5")
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

changeVideoAttr();
$(window).on('resize', changeVideoAttr);

function changeVideoAttr() {
	const video = $('.section-story__decoration video');

	video.get(0).load();
	
	if($(window).width() <= 1024) {
		video.attr({
			autoplay: true,
			loop: true
		});
		video.get(0).play();
	} else {
		video.removeAttr('autoplay loop');
		video.get(0).pause();
	}
}

let mm = gsap.matchMedia();
mm.add("(min-width: 1025px)", () => {
	ScrollTrigger.create({
		trigger: '.section-story',
		start: '15% top',
		end: '80% top',
		scrub: true,
		// markers: true,
		onUpdate: function(self) {
			const video = document.querySelector('.section-story__decoration video');
			progressRatio = self.progress * 2;
			duration = 8;
			video.currentTime = duration * progressRatio;
		}
	})
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

const ani = gsap.timeline({
	scrollTrigger: {
		trigger: '.section-about',
		start: '-130% top',
		end: 'bottom center',
		scrub:true,
		// markers: true,
	}
});
ani.addLabel('t1')
.fromTo('.section-about__headline', {xPercent: 100}, {xPercent: -100, duration: 2});

let aboutSwiper = undefined;
function initSwiper() {
	const windowSize = $(window).width();

	if(windowSize <= 1024 && aboutSwiper == undefined) {
		aboutSwiper = new Swiper('.section-about .swiper', {
			loop: true,
			centeredSlides: true,
			slidesPerview: 3
		})
	} else if (windowSize > 1024 && aboutSwiper != undefined) {
		aboutSwiper.destroy();
		aboutSwiper = undefined;
	}
}
initSwiper();


$(window).on('resize', function() {
	initSwiper();
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

$(window).on('resize', function() {
	$('.section-ingredient__embedded video').get(0).load();
	$('.section-package__embedded video').get(0).load();
});
ScrollTrigger.create({
	trigger: '.section-ingredient',
	start: '-98% top',
	scrub: 0,
	onUpdate: function(self) {
		$('.section-ingredient__embedded video').get(0).play();
	},
	toggleActions: 'play none none reset',
	// markers: true
})

let mm2 = gsap.matchMedia();
mm2.add("(min-width: 1025px)", () => {
	ScrollTrigger.create({
		trigger: '.section-package__embedded video',
		start: 'top top',
		end: '+=3000',
		pin: true,
		scrub: 0,
		// markers: true,
		onUpdate: function(self) {
			const video = document.querySelector('.section-package__embedded video');
			progressRatio = self.progress;
			duration = 6;
			video.currentTime = duration * progressRatio;
		}
	})
});

mm2.add("(max-width: 1024px)", () => {
	ScrollTrigger.create({
		trigger: '.section-package__embedded video',
		start: '-65% top',
		end: 'center center',
		// scrub: 0,
		// markers: true,
		onUpdate: function(self) {
			$('.section-package__embedded video').get(0).play();
		},
		toggleActions: 'none none none none',
	})
})

$('.section-faq__cta').click(function() {
	$(this).parents('.section-faq__item').toggleClass('is-open');
})


let minutes = 0;
let seconds = 0;

function getTime() {
	minutes = new Date().getMinutes().toString().padStart(2, '0');
	seconds = new Date().getSeconds().toString().padStart(2, '0');
}


function changeBannerText() {
	const bannerTime = document.querySelector('.section-banner__time span');
	getTime();
	bannerTime.textContent = `${minutes}:${seconds}`;
}
changeBannerText();
setInterval(changeBannerText, 1000);

function changeFloatingText() {
	const floatingTime = document.querySelector('.floating-object__time span');
	getTime();
	floatingTime.textContent = `${minutes}:${seconds}`;
}
changeFloatingText();
setInterval(changeFloatingText, 1000);


const tl2 = gsap.to('.section-banner__header', {
	x: -50,
})

ScrollTrigger.create({
	animation: tl2,
	trigger: '.section-banner',
	start: '-126% top',
	end: 'bottom top',
	scrub: 0,
	onEnter: function() {
		$('.floating-object').addClass('is-invisible');
	},
	onLeaveBack: function() {
		$('.floating-object').removeClass('is-invisible');
	},
	// markers: true
})

$('.floating-object').on('mouseenter', function() {
	$(this).addClass('is-hover');
	const template = document.querySelector('template');
	const clone = document.importNode(template.content, true);
	const paragraphEl = clone.querySelector('.floating-object__copy');

	if($('.floating-object__textbox').find('.floating-object__copy').length > 1) {
		return;
	} else {
		$('.floating-object__textbox').append(paragraphEl);
		paragraphTimeText();
		setInterval(paragraphTimeText, 1000);
		function paragraphTimeText() {
			const paragraphTime = paragraphEl.querySelector('.floating-object__copy .time');
			getTime();
			paragraphTime.textContent = `${minutes}:${seconds}`;
		}
	}
})
$('.floating-object').on('mouseleave', function() {
	$(this).removeClass('is-hover');
	$('.floating-object__copy').remove();
})

