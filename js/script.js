$(function(){
	/*
	HeaderNavListJump
	*/
	$('.HeaderNavList__item').find('a').on('click',function(){
		var id = $(this).attr('href'),
			position = $(id).offset().top,
			AdjustedPosition = position-120;
		$('html, body').animate({
			'scrollTop': AdjustedPosition
		},1000);
	});
	/*
	Back To Top
	*/
	$('.BackToTopButton').on('click',function(){
		$('html, body').animate({
			'scrollTop': 0
		},1500);
	});
	/*
	Back To Top Appearance
	*/
	$('.BackToTopButton').each(function(){
		var $window = $(window),
			$BackToTopButton = $(this),
			$FirstSection = $('section:first-of-type'),
			FirstSectionOffsetTop = $FirstSection.offset().top;
		
		$window.on('scroll',function(){
			if($window.scrollTop() > FirstSectionOffsetTop){
				$BackToTopButton.fadeIn(500);
			}else{
				$BackToTopButton.fadeOut(500);
			}
		});
		$window.trigger('scroll');
	});
	/*
	Smooth Scroll From Other Pages
	*/
	var headerHeight = $('.header').outerHeight();
	var urlHash = location.hash;
	if(urlHash) {
    $('body,html').stop().scrollTop(0);
    setTimeout(function(){
        var target = $(urlHash);
        var position = target.offset().top - headerHeight -70;
        $('body,html').stop().animate({scrollTop:position}, 1500);
    }, 100);
	}
	$('a[href^="#"]').click(function() {
    var href= $(this).attr("href");
    var target = $(href);
    var position = target.offset().top - headerHeight;
	$('body,html').stop().animate({scrollTop:position}, 1500);
	$('body').removeClass('ScrollLock'); /*I added this to prevent body from being fixed when the same page jump on Overlay menu is executed*/   
	});
	/*
	Overaly Closes when the link button for the same page is pressed
	*/
	$('.OverlayNav__item').on('click',function(){
		$('.OverlayNav').stop(true).animate({
			'left': '-120%'
		},500);
		if($('body').hasClass(ScrollLock)){
			$('.OverlayNav').removeClass('active');
			$('body').removeClass('ScrollLock');
		}else{
			;
		}
	});
	/*
	Accordion Menu
	*/
	var PlusMinusButton = $('.QuestionContainer__PlusMinusButton');
			
	PlusMinusButton.on('click',function(){
		var answer = $(this).closest('.QuestionContainer').find('.QuestionContainer__AnswerContainer');
		$(this).toggleClass('open');
		if($(this).hasClass('open')){
			answer.stop(true).slideDown(300);
		}else{
			answer.stop(true).slideUp(300);
		}
	});
	/*
	Overlay Nav
	*/
	$('.HamBurgerIconContainer').on('click', function(){	
		$('.OverlayNav').stop(true).animate({
			'left': 0
		},500);
		$('.OverlayNav').addClass('active');
		$('body').addClass('ScrollLock');
	});
	$('.OverlayNav__CloseButton').on('click',function(){
		$('.OverlayNav').stop(true).animate({
			'left': '-120%'
		},500);
		$('.OverlayNav').removeClass('active');
		$('body').removeClass('ScrollLock');
	});
	/*
	Remove ScrollLock when the window is wider than 768px
	This will prevent the scroll lock when the user makes the window width wider than 768px after opeining the overlay menu.
	"else if" ensures the scrolllock when the browser width is narrowed after opening the overlay.
	*/
	$(window).resize(function(){
		var w = $(window).innerWidth();
		var x = 768;
		if(w >= x){
			$('body').removeClass('ScrollLock');
		}else if($('.OverlayNav').hasClass('active')){
			$('body').addClass('ScrollLock');
		}
	});
});
