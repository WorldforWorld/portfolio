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
  $('.information__buttons').click(function (e) { 
    e.preventDefault();
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
      shortcard = $('.shortcard'),
      closelMessageBtn = $('.message__close'),
      modalHiddenMessage = $('.message__dialog'),
      modalHiddenShortcard = $('.shortcard__dialog');
  jQuery(function($){
    message.mouseup(function (e){ // событие клика по веб-документу
      if (!modalHiddenMessage.is(e.target) && modalHiddenMessage.has(e.target).length === 0) { //если клик был не по нашему блоку и не по его дочерним элементам
        message.toggleClass('message--visible');// скрываем его
      }
    });
  });
  jQuery(function($){
    $('div#bmc').mouseup(function (e){ // событие клика по веб-документу
      if (!modalHiddenShortcard.is(e.target) && modalHiddenShortcard.has(e.target).length === 0) { //если клик был не по нашему блоку и не по его дочерним элементам
        $('div#bmc').toggleClass('shortcard--visible');// скрываем его
      }
    });
  });
  jQuery(function($){
    $('div#repair').mouseup(function (e){ // событие клика по веб-документу
      if (!modalHiddenShortcard.is(e.target) && modalHiddenShortcard.has(e.target).length === 0) { //если клик был не по нашему блоку и не по его дочерним элементам
        $('div#repair').toggleClass('shortcard--visible');// скрываем его
      }
    });
  });
  jQuery(function($){
    $('div#witcher').mouseup(function (e){ // событие клика по веб-документу
      if (!modalHiddenShortcard.is(e.target) && modalHiddenShortcard.has(e.target).length === 0) { //если клик был не по нашему блоку и не по его дочерним элементам
        $('div#witcher').toggleClass('shortcard--visible');// скрываем его
      }
    });
  });

  closelMessageBtn.on('click', function () {
    message.toggleClass('message--visible');
  });
  var modalShortcard = $('a.bmc-sales'),
      modalRepair = $('a.repair-design'),
      modalWitcher = $('a.modal-witcher');
  modalShortcard.on('click', function (e) {
    e.preventDefault()
    $('div#bmc').toggleClass('shortcard--visible');
  });
  modalRepair.on('click', function (e) {
    e.preventDefault()
    $('div#repair').toggleClass('shortcard--visible');
  });
  modalWitcher.on('click', function (e) {
    e.preventDefault()
    $('div#witcher').toggleClass('shortcard--visible');
  });
  $('button#bmc-close').on('click', function (e) {
    e.preventDefault()
    $('div#bmc').toggleClass('shortcard--visible');
  });
  $('button#repair-close').on('click', function (e) {
    e.preventDefault()
    $('div#repair').toggleClass('shortcard--visible');
  });
  $('button#witcher-close').on('click', function (e) {
    e.preventDefault()
    $('div#witcher').toggleClass('shortcard--visible');
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
          ym(65865238,'reachGoal','form');
        },
        error: function (response) {
          console.error('Ошибка запроса ' + response);
        }
      });
    }
  });
});