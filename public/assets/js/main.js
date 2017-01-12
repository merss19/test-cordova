(function(){

  // -- vars
  var body             = document.body,
      html             = document.documentElement,
      linkVideo        = document.querySelector('.video-pupup'),
      linkYaGeroy      = document.querySelector('.js-popup-ya-geroy'),
      fillReport1      = document.querySelector('.js-fill-report-1'),
      payPopup         = document.querySelector('.js-pay-pupup'),
      mobMenu          = document.querySelector('.menu-mob-left'),
      layout           = document.querySelector('.layout'),
      btnCloseMobMenu  = document.querySelector('.menu-mob-left__ico-close'),
      stickyWrap       = document.querySelector('.layout__menu'),
      dateInput        = document.querySelectorAll('.input__field--date');

  // --  inject svg sprite
  SVGInjector(document.getElementById('svg-inject-me'));

  // -- http://nosir.github.io/cleave.js/

  if (!(dateInput === null)) {
    dateInput.forEach(function(el, i){
      new Cleave(el, {
          date: true,
          datePattern: ['d', 'm', 'Y']
      });
    });
  }

  // -- http://github.hubspot.com/offline/

  // --  Sticky Menu
  function stickyMenu() {
    var stickEl = document.querySelector('.layout__menu-inner'),
        stickyElTop = stickEl.offsetTop;

    var sticky = function(){
      var scrollTop = window.scrollY;
      if (stickyElTop < scrollTop + 20) {
        stickEl.classList.add('is-fixed');
      } else {
        stickEl.classList.remove('is-fixed');
      } 
    };

    var calcSideBarWidth = function() {
      stickyWrapWidth = stickyWrap.clientWidth;
      stickEl.style.width = stickyWrapWidth;
    };

    calcSideBarWidth();

    document.addEventListener('scroll', sticky, false);
    window.addEventListener('resize', calcSideBarWidth, false);
  }

  if (!(stickyWrap === null)) {stickyMenu();}

  // -- Float Labels
  document.addEventListener('keyup', function(e) {
    if (e.target.classList.contains('input__field')) {
      var val = e.target.value,
          el = e.target.parentNode;
      if (!el.classList.contains('float-label')) {
        el.classList.add('float-label');
      } else if (!val.length > 0) {
        el.classList.remove('float-label');
      }
    }
  }, false);

  // -- Burger Menu
  function burger(e) {
    if ( findMeorAncestor(e.target, 'header__ico-burger') ) {
      if (!layout.classList.contains('mob-menu-active')) {
        layout.classList.add('mob-menu-active');
      } else {
        layout.classList.remove('mob-menu-active');
      }
    }
  }

  function burgerClose(e) {
    if ( findMeorAncestor(e.target, 'menu-mob-left') ) {
      layout.classList.remove('mob-menu-active');
    }
  }

  document.addEventListener('click', burger, false);
  if (!(btnCloseMobMenu === null)) btnCloseMobMenu.addEventListener('click', burgerClose, false);

  // -- Accordion
  document.addEventListener('click', function(e) {
    if (findMeorAncestor(e.target,'accordion__header')) {
      var item = closest(e.target, 'accordion__item')
      if (!item.classList.contains('accordion__item--active')) {
        item.classList.add('accordion__item--active');
      } else {
        item.classList.remove('accordion__item--active');
      }
      e.preventDefault();
    }
  }, false);

  // --
  // DEMO
  // --

  // --  http://robinparisi.github.io/tingle/

  function lockScreen() {
    html.classList.add('lock-screen');
    body.classList.add('lock-screen');
  }

  function unLockScreen() {
    html.classList.remove('lock-screen');
    body.classList.remove('lock-screen');
  }

  var popup = new tingle.modal({
    footer: false,
    stickyFooter: false,
    cssClass: ['base-popup'],
    onOpen: function() {

      // -- DEMO
      
      var fillReport2 = document.querySelector('.js-fill-report-2'),
          fillReport3 = document.querySelector('.js-fill-report-3');

      if (!(fillReport2 === null)) {
        fillReport2.addEventListener('click', function(e){
          e.preventDefault();
          popup.close();
          popup.setContent(document.getElementById('fill-report-2').innerHTML);
          popup.open();
        }, false);
      }

      if (!(fillReport3 === null)) {
        fillReport3.addEventListener('click', function(e){
          e.preventDefault();
          popup.close();
          popup.setContent(document.getElementById('fill-report-3').innerHTML);
          popup.open();
        }, false);
      }

      // for mobile
      lockScreen();

    },
    onClose: function() {
      // for mobile
      unLockScreen();
    }
  });

  var videoPopup = new tingle.modal({
    footer: false,
    stickyFooter: false,
    cssClass: ['video-popup'],
    onOpen: function() {lockScreen();},
    onClose: function() {unLockScreen();}
  });

  var mobPopup = new tingle.modal({
    footer: false,
    stickyFooter: false,
    cssClass: ['mob-popup'],
    onOpen: function() {lockScreen();},
    onClose: function() {unLockScreen();}
  });

  if (!(linkVideo === null)) {
    linkVideo.addEventListener('click', function(e){
      e.preventDefault();
      videoPopup.open();
      videoPopup.setContent('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/E3Wq9YxqTI4" frameborder="0" allowfullscreen></iframe>');
    }, false);
  }

  if (!(linkYaGeroy === null)) {
    linkYaGeroy.addEventListener('click', function(e){
      e.preventDefault();
      mobPopup.open();
      mobPopup.setContent(document.querySelector('.entry-info__inner').innerHTML);
    }, false);
  }

  if (!(fillReport1 === null)) {
    fillReport1.addEventListener('click', function(e){
      e.preventDefault();
      popup.open();
      popup.setContent(document.getElementById('fill-report-1').innerHTML);
    }, false);
  }

  if (!(payPopup === null)) {
    payPopup.addEventListener('click', function(e){
      e.preventDefault();
      popup.open();
      popup.setContent(document.getElementById('pay-success').innerHTML);
    }, false);
  }

/*  // -- Complete Task
  document.addEventListener('change', function(e) {
    if (e.target.classList.contains('checkbox__field--btn-taks')) {
      task = closest(e.target, 'task__item')
      if (!task.classList.contains('task__item--complete')) {
        task.classList.add('task__item--complete');
      } else {
        task.classList.remove('task__item--complete');
      }
      e.preventDefault();
    }
  }, false);*/


  // -- Helpers
  function closest(el, cls) {
    while ( (el = el.parentElement) && !el.classList.contains(cls) );
    return el;
  }

  function findMeorAncestor(el, cls) {
    while ( !el.classList.contains(cls) && (el = el.parentElement) );
    return el;
  }



})();