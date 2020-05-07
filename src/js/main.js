$(function () {

  // прокрутка вверх страницы
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        if ($('#upbutton').is(':hidden')) {
            $('#upbutton').css({opacity : 1}).fadeIn('slow');
        }
    } else { $('#upbutton').stop(true, false).fadeOut('fast'); }
  });
  $('#upbutton').click(function() {
      $('html, body').stop().animate({scrollTop : 0}, 800);
  });
  // прокрутка до нужного места
  console.log('работаю');
  $('.information__buttons').click(function (e) { 
    e.preventDefault();
    console.log('работаю');
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 800);
  });
  // фильтрация
  $('.portfolio__categories__filter__all').click(function (e) { 
    e.preventDefault();
    var filter = $('.portfolio__categories').children();
    filter.removeClass('portfolio__categories__active');
    $('.portfolio__categories__filter__all').toggleClass('portfolio__categories__active');
    $('.portfolio__card__landing').show();
    $('.portfolio__card__magazine').show();
  });
  $('.portfolio__categories__filter__landing').click(function (e) { 
    e.preventDefault();
    $('.portfolio__card__magazine').hide();
    var filter = $('.portfolio__categories').children();
    filter.removeClass('portfolio__categories__active');
    $('.portfolio__categories__filter__landing').toggleClass('portfolio__categories__active');
    $('.portfolio__card__landing').show();
  });
  $('.portfolio__categories__filter__magazine').click(function (e) { 
    e.preventDefault();
    $('.portfolio__card__landing').hide();
    var filter = $('.portfolio__categories').children();
    filter.removeClass('portfolio__categories__active');
    $('.portfolio__categories__filter__magazine').toggleClass('portfolio__categories__active');
    $('.portfolio__card__magazine').show();
  });
  // валидация формы
  var message = $('.message'),
      closelMessageBtn = $('.message__close'),
      modalHiddenMessage = $('.message__dialog');
  jQuery(function($){
    message.mouseup(function (e){ // событие клика по веб-документу
      if (!modalHiddenMessage.is(e.target) && modalHiddenMessage.has(e.target).length === 0) { //если клик был не по нашему блоку и не по его дочерним элементам
        message.toggleClass('message--visible');// скрываем его
      }
    });
  });

  closelMessageBtn.on('click', function () {
    message.toggleClass('message--visible');
  });
  $('.form').validate({
    errorClass: "invalid",
    rules: {
      // правило-объект (блок)
      userName3: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      // строчное правило
      userPhone3: "required",
      userQuestion: "required",

    }, // сообщения
    errorElement: "div",
    messages: {
      userName3: {
        required:"Заполните поле",
        minlength: "Имя не короче двух букв",
        maxlength: "Слишком длинное имя"
      },
      userPhone3: "Заполните поле",
      userQuestion: "Напишите что вас интересует",

    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          message.toggleClass('message--visible');
        },
        error: function (response) {
          console.error('Ошибка запроса ' + response);
        }
      });
    }
  });
});