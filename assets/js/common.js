$(document).ready(function(){
	$('.tot_line').length && card_cnt(); //팩 프로그래스바
	$('.pack_slide_wrap').length && packSlide(); //메인팩 슬라이드
	$('.spot').length && spotTarget(); //spot 활성화
	$('.btn_star').length && starBtn(); //헤더 대표 spot설정 토글 버튼
	$('.btn_del').length && pwDel() //input 텍스트 삭제
	$('.local_btn').length && localBtn(); //내 위치 활성화
	$('.btn_more').length && moreText(); //텍스트 전체보기
	$('.flip').length && cardFlip(); //카드 뒤집기
	$('.popup').length && popup(); //팝업/바닥팝업
	$('.btm_pop').length && bmtPopup(); //바닥팝업
	$('.full_pop').length && fullPopup(); //전체팝업
	$('.user_cnt').length && userCnt(); //참여수제한 체크영역
	$('.pf_li').length && pfSet(); //프로필 이미지 설정

	if($('.user_wrap input[id="form_chk"]').is(":checked") == false){
		$('.user_cnt').addClass('inactv');
		$('.user_cnt input[id="user_inpt"]').attr("disabled",true).attr('placeholder','무제한');

	}else{
		$('.user_cnt').removeClass('inactv')
		$('.user_cnt input[id="user_inpt"]').attr("disabled",false).attr('placeholder','');

	}
});

function card_cnt() { //팩 프로그래스바
	$('.tot_line').each(function(){
		var $this = $(this),
			current = $this.find('.crt_card').text(),
			end = $this.find('.end').text()
			current_line = $this.find('.current_line')

		current_line.css('width',current*100/end + '%')
	});
}

function packSlide(){ //메인팩 슬라이드
	var packSlide = new Swiper('.pack_slide_wrap .swiper', {
		slidesPerView:'auto',
		spaceBetween: 8,
	});
}

function spotTarget(){ //spot 활성화
	$('.spot').on('click', function(){
		var $this = $(this),
			spot = $('.spot'),
			spot_info = $('.spot_pack_info'),
			infoH = spot_info.height() + 12;

		if(!$this.hasClass('use')){//미획득 spot 클릭시
			if($this.hasClass('on')){
				spot.removeClass('on');
				spot_info.removeClass('on');
				$('.local_btn').css('bottom','12px')
			}else{
				spot.removeClass('on');
				$this.addClass('on');
				spot_info.addClass('on');
				$('.local_btn').css('bottom',infoH)
			}
		}else{
			spot.removeClass('on');
			spot_info.removeClass('on');
			$('.local_btn').css('bottom','12px')
		}
	});

	$(document).mouseup(function (e){ /* 닫기 */
		var spot = $('.spot');
		if(spot.has(e.target).length === 0 && $('.local_btn').has(e.target).length === 0 && $('.spot_pack_info').has(e.target).length === 0 && spot.hasClass('on')){
			spot.removeClass('on');
			$('.spot_pack_info').removeClass('on')
			$('.local_btn').css('bottom','12px')
		}
	});
}

function starBtn() { //헤더 대표 spot설정 토글 버튼
	$('.btn_head.btn_star').on('click', function(){
		$(this).toggleClass('on');
	})
}

function pwDel() { //pw 텍스트 삭제
	$('.btn_del').on('click', function(){
		$(this).prev().val('')
	});
}

function localBtn() { //내 위치 활성화
	$('.local_btn').on('click', function(){
		$('.local_btn').toggleClass('on');
		$('.my_loc').toggleClass('on');
	})
}

function moreText() { //텍스트 전체보기
	$('.btn_more').on('click', function(){
		$('.txt_area').toggleClass('on');
	})
}

$(window).on('load', function(){ // input 텍스트 색상
	if($('.text_input input').length){
		var txt_input = $('.text_input input');
		if(txt_input.val().length > 0){
			$('.text_input').addClass('on')
		}else{
			$('.text_input').removeClass('on')
		}

		txt_input.focusout(function(){
			if(txt_input.val().length > 0){
				$('.text_input').addClass('on')
			}else{
				$('.text_input').removeClass('on')
			}
		})
	}
});

function cardFlip(){ //카드 뒤집기
	$('.flip').on('click', function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on')
		}else {
			$(this).addClass('on')
		}
	});
}

function dimShow(){ /* 딤드 show */
	$('body').addClass('dim');
}
function dimHide(){ /* 딤드 hide */
	$('body').removeClass('dim');
}

function popup(){ //팝업
	$('.btn_pop').on('click', function(e){ /* 팝업열기 */
		e.preventDefault();
		var target = $(this).attr('open-pop') || e;
		$('.popup' + '.' + target).fadeIn(200);
		dimShow();
	});

	$(document).mouseup(function (e){ /* 닫기 */
		var popArea = $('.popup');
		if(popArea.has(e.target).length === 0 && $('body').hasClass('dim')){
			popArea.fadeOut(200);
			setTimeout(dimHide, 150);
		}
	});

	$('.popup .close').on('click', function(){ /* 닫기 */
		$('.popup').fadeOut(200);
		setTimeout(dimHide, 150);
	});
}

function bmtPopup(){ //바닥팝업
	$('.btn_btm_pop').on('click', function(e){ /* 팝업열기 */
		e.preventDefault();
		var target = $(this).attr('open-pop') || e;
		$('.btm_pop' + '.' + target).addClass('on');
		dimShow();
	});

	$(document).mouseup(function (e){ /* 닫기 */
		var popArea = $('.btm_pop');
		if(popArea.has(e.target).length === 0 && $('body').hasClass('dim')){
			popArea.removeClass('on');
			setTimeout(dimHide, 150);
		}
	});

	$('.btm_pop .close').on('click', function(){ /* 닫기 */
		$('.btm_pop').removeClass('on');
		setTimeout(dimHide, 150);
	});
}

function fullPopup(){ //전체팝업
	$('.btn_full_pop').on('click', function(e){ /* 팝업열기 */
		e.preventDefault();
		var target = $(this).attr('open-pop') || e;
		$('.full_pop' + '.' + target).addClass('on');
		$('body').css('overflow','hidden')
	});

	$('.full_pop .close').on('click', function(e){ /* 닫기 */
		$(this).closest($('.full_pop')).removeClass('on');
		$('body').css('overflow','');
	});
}

function userCnt(){ //참여수제한 체크영역
	$('.user_wrap input[id="form_chk"]').on('click', function(e){ /* 닫기 */
		if($(this).is(":checked") == false){
			$('.user_cnt').addClass('inactv');
			$('.user_cnt input[id="user_inpt"]').attr("disabled",true).attr('placeholder','무제한').focusout();

		}else{
			$('.user_cnt').removeClass('inactv')
			$('.user_cnt input[id="user_inpt"]').attr("disabled",false).attr('placeholder','').focus();

		}

	});

}

function pfSet() { //프로필 이미지 설정
	$('.pf_li label').on('click', function(){
		$('.btn_set a').removeClass('color_type4')
		$('.btn_set a').addClass('color_type6')
	})
}