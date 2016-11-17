/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-inlinesvg-svg-touchevents-webaudio-domprefixes-hasevent-mq-setclasses !*/
!function(e,t,n){function o(e,t){return typeof e===t}function i(){var e,t,n,i,s,a,r;for(var f in u)if(u.hasOwnProperty(f)){if(e=[],t=u[f],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=o(t.fn,"function")?t.fn():t.fn,s=0;s<e.length;s++)a=e[s],r=a.split("."),1===r.length?Modernizr[r[0]]=i:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=i),l.push((i?"":"no-")+r.join("-"))}}function s(e){var t=c.className,n=Modernizr._config.classPrefix||"";if(p&&(t=t.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),p?c.className.baseVal=t:c.className=t)}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):p?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function r(){var e=t.body;return e||(e=a(p?"svg":"body"),e.fake=!0),e}function f(e,n,o,i){var s,f,l,u,d="modernizr",p=a("div"),v=r();if(parseInt(o,10))for(;o--;)l=a("div"),l.id=i?i[o]:d+(o+1),p.appendChild(l);return s=a("style"),s.type="text/css",s.id="s"+d,(v.fake?v:p).appendChild(s),v.appendChild(p),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(t.createTextNode(e)),p.id=d,v.fake&&(v.style.background="",v.style.overflow="hidden",u=c.style.overflow,c.style.overflow="hidden",c.appendChild(v)),f=n(p,e),v.fake?(v.parentNode.removeChild(v),c.style.overflow=u,c.offsetHeight):p.parentNode.removeChild(p),!!f}var l=[],u=[],d={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){u.push({name:e,fn:t,options:n})},addAsyncTest:function(e){u.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr,Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),Modernizr.addTest("webaudio",function(){var t="webkitAudioContext"in e,n="AudioContext"in e;return Modernizr._config.usePrefixes?t||n:n});var c=t.documentElement,p="svg"===c.nodeName.toLowerCase(),v="Moz O ms Webkit",m=d._config.usePrefixes?v.toLowerCase().split(" "):[];d._domPrefixes=m;var h=function(){function e(e,t){var i;return e?(t&&"string"!=typeof t||(t=a(t||"div")),e="on"+e,i=e in t,!i&&o&&(t.setAttribute||(t=a("div")),t.setAttribute(e,""),i="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),i):!1}var o=!("onblur"in t.documentElement);return e}();d.hasEvent=h,Modernizr.addTest("inlinesvg",function(){var e=a("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var g=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=g;var w=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return f("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();d.mq=w;var y=d.testStyles=f;Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var o=["@media (",g.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");y(o,function(e){n=9===e.offsetTop})}return n}),i(),s(l),delete d.addTest,delete d.addAsyncTest;for(var b=0;b<Modernizr._q.length;b++)Modernizr._q[b]();e.Modernizr=Modernizr}(window,document);
/**
 * SVGInjector v1.1.3-RC - Fast, caching, dynamic inline SVG DOM injection library
 * https://github.com/iconic/SVGInjector
 *
 * Copyright (c) 2014 Waybury <hello@waybury.com>
 * @license MIT
 */
!function(t,e){"use strict";function r(t){t=t.split(" ");for(var e={},r=t.length,n=[];r--;)e.hasOwnProperty(t[r])||(e[t[r]]=1,n.unshift(t[r]));return n.join(" ")}var n="file:"===t.location.protocol,i=e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"),o=Array.prototype.forEach||function(t,e){if(void 0===this||null===this||"function"!=typeof t)throw new TypeError;var r,n=this.length>>>0;for(r=0;n>r;++r)r in this&&t.call(e,this[r],r,this)},a={},l=0,s=[],u=[],c={},f=function(t){return t.cloneNode(!0)},p=function(t,e){u[t]=u[t]||[],u[t].push(e)},d=function(t){for(var e=0,r=u[t].length;r>e;e++)!function(e){setTimeout(function(){u[t][e](f(a[t]))},0)}(e)},v=function(e,r){if(void 0!==a[e])a[e]instanceof SVGSVGElement?r(f(a[e])):p(e,r);else{if(!t.XMLHttpRequest)return r("Browser does not support XMLHttpRequest"),!1;a[e]={},p(e,r);var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4===i.readyState){if(404===i.status||null===i.responseXML)return r("Unable to load SVG file: "+e),n&&r("Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver."),r(),!1;if(!(200===i.status||n&&0===i.status))return r("There was a problem injecting the SVG: "+i.status+" "+i.statusText),!1;if(i.responseXML instanceof Document)a[e]=i.responseXML.documentElement;else if(DOMParser&&DOMParser instanceof Function){var t;try{var o=new DOMParser;t=o.parseFromString(i.responseText,"text/xml")}catch(l){t=void 0}if(!t||t.getElementsByTagName("parsererror").length)return r("Unable to parse SVG file: "+e),!1;a[e]=t.documentElement}d(e)}},i.open("GET",e),i.overrideMimeType&&i.overrideMimeType("text/xml"),i.send()}},h=function(e,n,a,u){var f=e.getAttribute("data-src")||e.getAttribute("src");if(!/\.svg/i.test(f))return void u("Attempted to inject a file with a non-svg extension: "+f);if(!i){var p=e.getAttribute("data-fallback")||e.getAttribute("data-png");return void(p?(e.setAttribute("src",p),u(null)):a?(e.setAttribute("src",a+"/"+f.split("/").pop().replace(".svg",".png")),u(null)):u("This browser does not support SVG and no PNG fallback was defined."))}-1===s.indexOf(e)&&(s.push(e),e.setAttribute("src",""),v(f,function(i){if("undefined"==typeof i||"string"==typeof i)return u(i),!1;var a=e.getAttribute("id");a&&i.setAttribute("id",a);var p=e.getAttribute("title");p&&i.setAttribute("title",p);var d=[].concat(i.getAttribute("class")||[],"injected-svg",e.getAttribute("class")||[]).join(" ");i.setAttribute("class",r(d));var v=e.getAttribute("style");v&&i.setAttribute("style",v);var h=[].filter.call(e.attributes,function(t){return/^data-\w[\w\-]*$/.test(t.name)});o.call(h,function(t){t.name&&t.value&&i.setAttribute(t.name,t.value)});for(var g,b=i.querySelectorAll("defs clipPath[id]"),y=0,m=b.length;m>y;y++){g=b[y].id+"-"+l;for(var A=i.querySelectorAll('[clip-path*="'+b[y].id+'"]'),w=0,S=A.length;S>w;w++)A[w].setAttribute("clip-path","url(#"+g+")");b[y].id=g}for(var x,j=i.querySelectorAll("defs mask[id]"),T=0,G=j.length;G>T;T++){x=j[T].id+"-"+l;for(var M=i.querySelectorAll('[mask*="'+j[T].id+'"]'),q=0,V=M.length;V>q;q++)M[q].setAttribute("mask","url(#"+x+")");j[T].id=x}i.removeAttribute("xmlns:a");for(var k,E,O=i.querySelectorAll("script"),L=[],P=0,X=O.length;X>P;P++)E=O[P].getAttribute("type"),E&&"application/ecmascript"!==E&&"application/javascript"!==E||(k=O[P].innerText||O[P].textContent,L.push(k),i.removeChild(O[P]));if(L.length>0&&("always"===n||"once"===n&&!c[f])){for(var F=0,N=L.length;N>F;F++)new Function(L[F])(t);c[f]=!0}var C=i.querySelectorAll("style");o.call(C,function(t){t.textContent+=""}),e.parentNode.replaceChild(i,e),delete s[s.indexOf(e)],e=null,l++,u(i)}))},g=function(t,e,r){e=e||{};var n=e.evalScripts||"always",i=e.pngFallback||!1,a=e.each;if(void 0!==t.length){var l=0;o.call(t,function(e){h(e,n,i,function(e){a&&"function"==typeof a&&a(e),r&&t.length===++l&&r(l)})})}else t?h(t,n,i,function(e){a&&"function"==typeof a&&a(e),r&&r(1),t=null}):r&&r(0)};"object"==typeof module&&"object"==typeof module.exports?module.exports=exports=g:"function"==typeof define&&define.amd?define(function(){return g}):"object"==typeof t&&(t.SVGInjector=g)}(window,document);
/*!
 * tingle.js
 * @author  robin_parisi
 * @version 0.8.2
 * @url
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.tingle = factory();
    }
}(this, function() {

    /* ----------------------------------------------------------- */
    /* == modal */
    /* ----------------------------------------------------------- */

    var transitionEvent = whichTransitionEvent();

    /**
     * Modal constructor
     */
    function Modal(options) {
        this.modal;
        this.modalCloseBtn;
        this.modalWrapper;
        this.modalBox;
        this.modalBoxContent
        this.modalBoxFooter;
        this.modalContent;
        var defaults = {
            onClose: null,
            onOpen: null,
            stickyFooter: false,
            footer: false,
            cssClass: []
        }

        // extends config
        this.opts = extend({}, defaults, options);

        // init modal
        this.init();

    }

    /**
     * Init modal
     */
    Modal.prototype.init = function() {
        if (this.modal) {
            return;
        }

        _build.call(this);
        _bindEvents.call(this);

        // insert modal in dom
        document.body.insertBefore(this.modal, document.body.firstChild);

        if (this.opts.footer) {
            this.addFooter();
        }
    };


    /**
     * Destroy modal: unbind events and remove from dom
     */
    Modal.prototype.destroy = function() {
        if (this.modal === null) {
            return;
        }
        _unbindEvents.call(this);

        // remove modal from dom
        this.modal.parentNode.removeChild(this.modal);

        this.modal = null;
    };


    /**
     * Open modal
     */
    Modal.prototype.open = function(options) {

        if (this.modal.style.removeProperty) {
            this.modal.style.removeProperty('display');
        } else {
            this.modal.style.removeAttribute('display');
        }


        // prevent double scroll
        document.body.classList.add('tingle-enabled');

        // sticky footer
        this.setStickyFooter(this.opts.stickyFooter);

        // show modal
        this.modal.classList.add('tingle-modal--visible');

        // onOpen event
        var self = this;

        if (transitionEvent) {
            this.modal.addEventListener(transitionEvent, function handler() {
                if (typeof self.opts.onOpen === 'function') {
                    self.opts.onOpen.call(self);
                }

                // detach event after transition end (so it doesn't fire multiple onOpen)
                self.modal.removeEventListener(transitionEvent, handler, false);

            }, false);
        }

        // check if modal is bigger than screen height
        _checkOverflow.call(this);

    };

    /**
     * Close modal
     */
    Modal.prototype.close = function(e) {

        this.modal.style.display = 'none';
        document.body.classList.remove('tingle-enabled');

        this.modal.classList.remove('tingle-modal--visible');

        // on close callback
        if (typeof this.opts.onClose === "function") {
            this.opts.onClose.call(this);
        }
    };

    /**
     * Set content
     */
    Modal.prototype.setContent = function(content) {
        // check type of content : String or Node
        if (typeof content === 'string') {
            this.modalBoxContent.innerHTML = content;
        } else {
            this.modalBoxContent.innerHTML = "";
            this.modalBoxContent.appendChild(content);
        }
    };

    Modal.prototype.getContent = function() {
        return this.modalBoxContent;
    };

    Modal.prototype.addFooter = function() {
        // add footer to modal
        _buildFooter.call(this);
    }

    Modal.prototype.setFooterContent = function(content) {
        // set footer content
        this.modalBoxFooter.innerHTML = content;
    };

    Modal.prototype.getFooterContent = function() {
        return this.modalBoxFooter;
    };

    Modal.prototype.setStickyFooter = function(isSticky) {

        // if the modal is smaller than the viewport height, we don't need sticky
        if (!this.isOverflow()) {
            isSticky = false;
        }

        if (isSticky) {
            if (this.modalBox.contains(this.modalBoxFooter)) {
                this.modalBox.removeChild(this.modalBoxFooter);
                this.modal.appendChild(this.modalBoxFooter);
                this.modalBoxFooter.classList.add('tingle-modal-box__footer--sticky');
                _recalculateFooterPosition.call(this);
                this.modalBoxContent.style['padding-bottom'] = this.modalBoxFooter.clientHeight + 20 + 'px';
                bind(this.modalBoxFooter, 'click', _catchEvent);
            }
        } else if (this.modalBoxFooter) {
            if (!this.modalBox.contains(this.modalBoxFooter)) {
                this.modal.removeChild(this.modalBoxFooter);
                this.modalBox.appendChild(this.modalBoxFooter);
                this.modalBoxFooter.style.width = 'auto';
                this.modalBoxFooter.style.left = '';
                this.modalBoxContent.style['padding-bottom'] = '';
                this.modalBoxFooter.classList.remove('tingle-modal-box__footer--sticky');
            }
        }
    }

    Modal.prototype.addFooterBtn = function(label, cssClass, callback) {
        var btn = document.createElement("button");

        // set label
        btn.innerHTML = label;

        // bind callback
        btn.addEventListener('click', callback);

        if (typeof cssClass === 'string' && cssClass.length) {
            // add classes to btn
            cssClass.split(" ").forEach(function(item) {
                btn.classList.add(item);
            });
        }

        this.modalBoxFooter.appendChild(btn);

        return btn;
    }

    Modal.prototype.resize = function() {
        console.warn('Resize is deprecated and will be removed in version 1.0');
    };


    Modal.prototype.isOverflow = function() {
        var viewportHeight = window.innerHeight;
        var modalHeight = this.modalBox.clientHeight;

        var isOverflow = modalHeight < viewportHeight ? false : true;
        return isOverflow;
    }


    /* ----------------------------------------------------------- */
    /* == private methods */
    /* ----------------------------------------------------------- */


    function _checkOverflow() {
        // only if the modal is currently shown
        if (this.modal.classList.contains('tingle-modal--visible')) {
            if (this.isOverflow()) {
                this.modal.classList.add('tingle-modal--overflow');
            } else {
                this.modal.classList.remove('tingle-modal--overflow');
            }

            // TODO: remove offset
            //_offset.call(this);
            if (!this.isOverflow() && this.opts.stickyFooter) {
                this.setStickyFooter(false);
            } else if (this.isOverflow() && this.opts.stickyFooter) {
                _recalculateFooterPosition.call(this);
                this.setStickyFooter(true);
            }
        }
    };

    function _recalculateFooterPosition() {
        if (!this.modalBoxFooter) {
            return;
        }
        this.modalBoxFooter.style.width = this.modalBox.clientWidth + 'px';
        this.modalBoxFooter.style.left = this.modalBox.offsetLeft + 'px';
    }

    function _build() {
        this.modal = create('div', 'tingle-modal');
        this.modal.style.display = 'none';

        // custom class
        this.opts.cssClass.forEach(function(item) {
            if (typeof item === 'string') {
                this.modal.classList.add(item);
            }
        }, this);

        this.modalCloseBtn = create('button', 'tingle-modal__close');
        this.modalCloseBtn.innerHTML = '×';

        this.modalBox = create('div', 'tingle-modal-box');
        this.modalBoxContent = create('div', 'tingle-modal-box__content');
        this.modalBox.appendChild(this.modalBoxContent);

        this.modal.appendChild(this.modalCloseBtn);
        this.modal.appendChild(this.modalBox);

    };

    function _buildFooter() {
        this.modalBoxFooter = create('div', 'tingle-modal-box__footer');
        this.modalBox.appendChild(this.modalBoxFooter);
    }

    function _bindEvents() {
        bind(this.modalCloseBtn, 'click', this.close.bind(this));
        bind(this.modal, 'click', this.close.bind(this));
        bind(this.modalBox, 'click', _catchEvent);
        window.addEventListener('resize', _checkOverflow.bind(this));
    };

    /**
     * Avoid closing the modal when a click is trigger inside
     */
    function _catchEvent(e) {
        e.stopPropagation();
    };

    function _unbindEvents() {
        unbind(this.modalCloseBtn, 'click', this.close.bind(this));
        unbind(this.modal, 'click', this.close.bind(this));
        unbind(this.modalBox, 'click', _catchEvent);

    };

    /* ----------------------------------------------------------- */
    /* == confirm */
    /* ----------------------------------------------------------- */

    // coming soon

    /* ----------------------------------------------------------- */
    /* == alert */
    /* ----------------------------------------------------------- */

    // coming soon

    /* ----------------------------------------------------------- */
    /* == helpers */
    /* ----------------------------------------------------------- */

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
        return arguments[0];
    }

    function isNodeList(el) {
        return (typeof el.length != 'undefined' && typeof el.item != 'undefined');
    }

    function bind(el, event, callback) {

        if (isNodeList(el)) {
            [].forEach.call(el, function(el) {
                el.addEventListener(event, callback);
            })
        } else {
            el.addEventListener(event, callback);
        }
    }

    function unbind(el, event, callback) {
        if (isNodeList(el)) {
            [].forEach.call(el, function(el) {
                el.removeEventListener(event, callback);
            })
        } else {
            el.removeEventListener(event, callback);
        }
    }

    function create(element, cssClass) {
        var element = document.createElement(element);
        if (cssClass) {
            element.classList.add(cssClass);
        }
        return element;
    }

    function whichTransitionEvent() {
        var t;
        var el = document.createElement('tingle-test-transition');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        }

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

    /* ----------------------------------------------------------- */
    /* == return */
    /* ----------------------------------------------------------- */

    return {
        modal: Modal
    };

}));
