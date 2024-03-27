$('a[href="#"]').on('click', function (e) {
	e.preventDefault();
});

// 새로고침 시 사용자 스크롤 위치 저장하지 않음
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

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

$('.global-nav__item--white').on('click', function() {
	const headerHeight = $('.header').outerHeight(); 
	const position = ($('.section-order').offset().top) - headerHeight;
	
	$('html, body').stop().animate({scrollTop: position}, 700);
})
$('.global-nav__item--black').on('click', function() {
	const headlineHeight = $('.section-about__headline').outerHeight();
	const position = $('.section-about').offset().top - headlineHeight;

	$('html, body').stop().animate({scrollTop: position}, 700);
})
$('.global-nav__item--red').on('click', function() {
	const position = $('.section-home').offset().top;
	
	$('html, body').stop().animate({scrollTop: position}, 700);
})

changeVideoAttr();
$(window).on('resize', changeVideoAttr);

function changeVideoAttr() {
	const video = $('.section-story__decoration video');
	const source = $('.section-story__decoration video source');
	
	if($(window).width() <= 1023) {
		video.attr({
			autoplay: true,
			loop: true
		});
		source.attr('src', './assets/videos/section-story-deco-mo.mp4');
		
		video.get(0).play();
	} else {
		source.attr('src', './assets/videos/section-story-deco.mp4');
		video.removeAttr('autoplay loop');
		video.get(0).pause();
	}

	video.get(0).load();
}

let mm = gsap.matchMedia();
mm.add("(min-width: 1024px)", () => {
	ScrollTrigger.create({
		trigger: '.section-story',
		start: '18% top',
		end: '80% top',
		scrub: true,
		// markers: true,
		onUpdate: function(self) {
			const video = document.querySelector('.section-story__decoration video');
			progressRatio = self.progress;
			duration = 8;
			video.currentTime = duration * progressRatio;
		}
	})
})


// ScrollTrigger.create({
// 	trigger: '.section-story__description',
// 	start: 'top top',
// 	end: 'bottom top',
// 	scrub: 0,
// 	onUpdate: function(self) {
// 		const total = $('.section-story__description .word').length;
// 		const current = Math.round(((self.progress * total) ));
// 		const currentWord = $('.section-story__description .word').eq(current)
// 		if($('.section-story__description .word.on')) {
// 			$('.section-story__description .word').removeClass('on')
// 		}
// 		if(currentWord) {
// 			currentWord.addClass('on')
// 		}
// 		console.log(current)

// 		imgEl = $('.section-story__description .word');
//     total = imgEl.length - 1;
//     currImg = Math.round(total-(self.progress * total));
//     curr = imgEl.eq(currImg);

//     if($('.section-story__description .word.on')) {
//       imgEl.removeClass('on');
//     }

//     if(curr) {
//       curr.addClass('on');
//     }
// 	}
// })

const ani = gsap.timeline({
	scrollTrigger: {
		trigger: '.section-about',
		start: '-80% top',
		end: '80%',
		scrub: true,
		// markers: true,
	}
});
ani.addLabel('t1')
.fromTo('.section-about__headline', {xPercent: 100}, {xPercent: -100, duration: 10});

let aboutSwiper = undefined;
function initSwiper() {
	const windowSize = $(window).width();

	if(windowSize <= 1023 && aboutSwiper == undefined) {
		aboutSwiper = new Swiper('.section-about .swiper', {
			loop: true,
			centeredSlides: true,
			slidesPerview: 3
		})
	} else if (windowSize >= 1024 && aboutSwiper != undefined) {
		aboutSwiper.destroy();
		aboutSwiper = undefined;
	}
}
initSwiper();

$(window).on('resize', initSwiper);

const words = document.querySelectorAll('.section-story__description .word');
words.forEach(function(word, index) {
	gsap.from(word, {
		opacity: .2,
		stagger: .1,
		scrollTrigger :{
			trigger: word,
			start: 'top 60%',
			end: 'bottom 60%',
			scrub: 0,
			// markers: true
		}
	})
});


changeVideoAttr2();
$(window).on('resize', changeVideoAttr2);

function changeVideoAttr2() {
	const video = $('.section-ingredient__embedded video');
	const source = $('.section-ingredient__embedded video source');
	
	if($(window).width() <= 1023) {
		source.attr('src', './assets/videos/section-ingredient-mo.mp4');
	} else {
		source.attr('src', './assets/videos/section-ingredient.mp4');
	}

	video.get(0).load();
}

ScrollTrigger.create({
	trigger: '.section-ingredient',
	start: '-98% top',
	// scrub: 0,
	onUpdate: function(self) {
		$('.section-ingredient__embedded video').get(0).play();
	},
	toggleActions: 'play none none reset',
	// markers: true
})

changeVideoAttr3();
$(window).on('resize', changeVideoAttr3);

function changeVideoAttr3() {
	const video = $('.section-package__embedded video');
	const source = $('.section-package__embedded video source');
	
	if($(window).width() <= 1023) {
		source.attr('src', './assets/videos/section-package-mo.mp4');
	} else {
		source.attr('src', './assets/videos/section-package.mp4');
	}

	video.get(0).load();
}

let mm2 = gsap.matchMedia();
mm2.add("(min-width: 1024px)", () => {
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

mm2.add("(max-width: 1023px)", () => {
	ScrollTrigger.create({
		trigger: '.section-package__embedded video',
		start: '-65% top',
		end: 'center center',
		// scrub: 0,
		// markers: true,
		onUpdate: function(self) {
			$('.section-package__embedded video').get(0).play();
		},
		toggleActions: 'play none none reset',
	})
})

$('.section-faq__cta').click(function() {
	$(this).parents('.section-faq__item').toggleClass('is-open');
})

// 스톱워치
let defaultTime = 0;
let timerStart;
window.addEventListener('load', function() {
	defaultTime = new Date().getTime();
});

timerStart = () => {
	const nowTime = new Date().getTime();
	const newTime = new Date(nowTime - defaultTime);
	const minutes = String(newTime.getMinutes()).padStart(2, '0');
	const seconds = String(newTime.getSeconds()).padStart(2, '0');
	const floatingTime = document.querySelector('.floating-clock__time span');
	const bannerTime = document.querySelector('.section-banner__time span');
	const floatingDescTime = document.querySelector('.floating-clock__copy .time');

	setTimeout(() => {
		floatingTime.textContent = `${minutes}:${seconds}`;
		bannerTime.textContent = `${minutes}:${seconds}`;
		floatingDescTime.textContent = `${minutes}:${seconds}`;

		timerStart();
	}, 1000)
}
timerStart();

$(window).on('scroll', function() {
	const scroll = $(window).scrollTop();
	if(scroll > 0) {
		$('.floating-clock').removeClass('is-invisible');
	} else {
		$('.floating-clock').addClass('is-invisible');
	}
})

let mm3 = gsap.matchMedia();
mm3.add("(min-width: 1024px)", () => {
	const tl2 = gsap.to('.section-banner__header', {
		x: -50,
	})
	
	ScrollTrigger.create({
		animation: tl2,
		trigger: '.section-banner',
		start: 'top bottom',
		end: 'bottom top',
		scrub: 0,
		// markers: true,
		onEnter: function() {
			$('.floating-clock').css('display', 'none');
		},
		onLeaveBack: function() {
			$('.floating-clock').removeAttr('style');
		}
	})
})

$(window).on('resize', floatingObj);
floatingObj();
function floatingObj() {
	const windowSize = $(window).width();
	if(windowSize >= 1024) {
		$('.floating-clock').on('mouseenter', function() {
			const tl = gsap.timeline({});
			tl.set('.floating-clock__time', {display: 'none'}, "+=0")
			.set('.floating-clock__copy', {display: 'block'}, "+=0")
		})
		$('.floating-clock').on('mouseleave', function() {
			const tl = gsap.timeline({});
			tl.set('.floating-clock__time', {display: 'block'}, "+=0")
			.set('.floating-clock__copy', {display: 'none'}, "+=0")
		})
	}
}

$('.section-order__item--modal').on('click', function() {
	$('body').css('overflow', 'hidden');
	gsap.to('.modal', {
		autoAlpha: 1,
		duration: .4,
		onComplete: function() {
			$('.modal').addClass('is-open');
		}
	})
})

$('.modal__close, .modal__button--close, .modal__dimmed').on('click', function() {
	gsap.to('.modal', {
		autoAlpha: 0,
		duration: .4,
		onComplete: function() {
			$('.modal').removeClass('is-open');
			$('body').removeAttr('style');
		}
	})
})