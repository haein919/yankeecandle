// yankeecandle.js

(function($){
 // jQuery start
 var viewBox = $('#viewBox');
 var viewImg = viewBox.find('.view_area'); 
 var viewLi = viewImg.find('li'); 
 var permission = true; 

 var indicator = viewBox.find('.view_indicator'); 
 var indiLi = indicator.find('li'); 

// 마지막 광고 이미지 복제 후 맨 앞에 붙여넣는 기능
 var viewImgLast = viewLi.eq(-1).clone(); // viewImg(ul) 안에 여러 li들 중 마지막[eq(-1)] li를 복사
 viewImg.prepend(viewImgLast); 
 var noviewLi = viewImg.find('li'); 
 viewImg.css({ 'margin-left':-100 + '%', 'width': noviewLi.length * 100 +'%' }); 
 noviewLi.css({ 'width': (100/ noviewLi.length) + '%' });

// 슬라이드 버튼 동작 기능
 var viewBtn = viewBox.find('.view_btn'); 
 var nextBtn = viewBtn.children('button').eq(0); 
 var prevBtn = viewBtn.children('button').eq(1); 

 var slideN = 0; 
 var timed = 3000; 
 indiLi.eq(slideN).addClass('action'); 

// 다음 버튼 클릭
 nextBtn.on('click', function(e){ // next버튼 클릭하면 아래 함수를 수행
   e.preventDefault(); 
   if(permission){
     permission = false; 
     if(slideN >= viewLi.length-1){
       slideN = -1; 
       viewImg.stop().css({ 'left': slideN * -100 + '%' }); 
     }
     slideN +=1;
     viewImg.stop().animate({ 'left' : slideN * -100 + '%' }) 
       setTimeout(function(){ // 시간제어
         permission = true;
       },100); 
     indiLi.eq(slideN).siblings().removeClass('action'); // 선택된 이미지에 해당하는 indicator에 색 변화주고 나머지 indicator들은 색변화 되지 않도록 처리
     indiLi.eq(slideN).addClass('action'); // 선택된 이미지에 해당하는 indicator에 색 변화주기
   }
 });

// 이전 버튼 클릭
 prevBtn.on('click', function(e){
   e.preventDefault();
   if(permission){
     permission = false; 
     slideN -=1;  
     viewImg.stop().animate({ 'left': slideN * -100 + '%' }, function(){ 
       if(slideN <= -1){ 
         slideN = viewLi.length-1; 
         viewImg.stop().css({ 'left': slideN * -100 + '%' }); 
       }
       setTimeout(function(){ // 시간제어 기능
         permission = true;
       },100); 
     });
     indiLi.eq(slideN).siblings().removeClass('action'); 
     indiLi.eq(slideN).addClass('action'); 
   }
 });

// indicator 버튼 기능
 indiLi.on('click', function(e){ 
   e.preventDefault();
   var its = $(this); 
   var slideN = its.index(); 
   viewImg.stop().animate({ 'left': slideN * -100 + '%' }); 
   indiLi.eq(slideN).siblings().removeClass('action'); 
   indiLi.eq(slideN).addClass('action');  
 })
// indicator 포커스 기능
 indiLi.children('a').on('focus', function(e){ 
   e.preventDefault(); 
   var its = $(this); 
   slideN = its.parent().index(); 
   viewImg.stop().animate({'left':slideN * -100 + '%'}); 
   indiLi.eq(slideN).siblings().removeClass('action');  
   indiLi.eq(slideN).addClass('action'); 
 });

// 자동 슬라이드 기능
 var startInterval; 
 var start = function(){ 
   startInterval = setInterval(function(){ 
     nextBtn.trigger('click'); 
   },timed); 
 };
 start(); 
 var stop = function(){ 
   clearInterval(startInterval); 
 };

// 이미지에 마우스 올렸을 경우 정지
 viewBox.on({'mouseenter': stop, 'mouseleave':start}); 
 //viewBox에 mouseenter와 mouseleave기능 실행 --> mouseenter(마우스오버)이면 위에 설정한 stop 함수 기능 실행, mouseleave(해당영역 벗어남)이면 start 함수 실행

 // jQuery end
})(jQuery);
