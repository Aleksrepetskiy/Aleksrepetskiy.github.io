const $ = require('jquery');
// const waterJs = require('./common/water.js');
const loaderJs = require('./common/loader.js');
const sliderJs = require('./common/slider.js');
const articleJs = require('./common/article.js');

/*Проверка длины path в svg*/
function TotalLength() {
    var path = document.querySelector('#check');
    var len = Math.round(path.getTotalLength() );
    console.log('Длина ' + len);
}
// TotalLength();
/*Проверка длины path в svg*/

$(document).ready(function() {

    $("#hamburger").click(function() {
        $(this).toggleClass("active");
        $('#menu').toggleClass("active");
    });

    $("#autorization").click(function() {
        $(this).hide();
        $('.flipper').addClass("active");
    });

    $("#index").click(function() {
        $('.flipper').removeClass("active");
        $("#autorization").show();
    });
});
var parallax = (function() {
    var bg = document.querySelector('.hero__bg');
    var user = document.querySelector('.user');
    var sectionText = document.querySelector('.section__title img');
    return {
        move: function (block, windowScroll, strafeAmount ) {
            var strafe = windowScroll/-strafeAmount + '%';
            var transformString = 'translate3d(0,'+ strafe +', 0)';
            var style = block.style;
            style.transform = transformString;
            style.webkitTransform = transformString;
        },
        init: function (wScroll) {
            this.move(bg, wScroll, 45);
            this.move(sectionText, wScroll, 15);
            this.move(user, wScroll, 4);
        }
    }
}());

window.onscroll = function () {
    var wScroll = window.pageYOffset;
    parallax.init(wScroll);
}
// $(window).scroll(function () {
//     var wScroll = $(window).scrollTop();
//     (function () {
//
//         var
//             bg = $('.hero__bg'),
//             sectionText = $('.section__title__pic'),
//             user = $('.user');
//
//             slideIt(bg, wScroll/45);
//             slideIt(sectionText, wScroll/15);
//             slideIt(user, wScroll/3);
//
//         function slideIt(block, strafeAmount) {
//             var strafe = -strafeAmount+'%',
//                 transformString = 'translate3d(0,'+strafe +',0)';
//             block.css({
//                 'transform' : transformString
//             });
//         }
//
//     }());
// });

// /**
//  * @module preloader
//  */
// export default (() => {
//     /**
//      * @namespace
//      * @property {boolean} waiting
//      * @property {jQuery} $context
//      * @type {{waiting: boolean, $context: (*|jQuery|HTMLElement)}}
//      */
//     let _params = {
//         waiting: false,
//         $context: $(document)
//     };
//     /**
//      * Supported formats
//      */
//     let extensions = ['jpg', 'png', 'gif'];
//     /**
//      * @param {object} params
//      * @param {number} params.waiting - When passing a parameter, the script will wait for the
//      * event "preloader:continue" on the document object before start preloading media.
//      */
//     let init = params => {
//         $('html, body').css('overflow', 'hidden');
//         let preloader = Object.assign(_params, params);
//         preloader.$el = $('.preloader');
//         preloader.$percents = preloader.$el.find('.preloader__percents');
//         preloader.$spinner = preloader.$el.find('.preloader__spinner');
//         if (preloader.waiting) {
//             preloader.$context.one('preloader:continue', () => loading(preloader));
//         } else {
//             loading(preloader);
//         }
//     };
//     /**
//      * Get media sources
//      * @param {object} preloader
//      * @returns {Array} Array with paths
//      */
//     let getPaths = preloader => {
//         let paths = preloader.$context.find('*').map((index, element) => {
//             let background = $(element).css('background-image');
//             let path = '';
//             if (background !== 'none') {
//                 path = background.replace('url("', '').replace('")', '');
//             }
//             if ($(element).is('img')) {
//                 path = $(element).attr('src');
//             }
//             if (path && path.indexOf('data:') !== 0) return path;
//         });
//         return lodashUniq(paths);
//     };
//     /**
//      * Preloading media
//      * @param {object} preloader
//      */
//     let loading = (preloader) => {
//         preloader.$spinner.fadeIn();
//         preloader.paths = getPaths(preloader);
//         preloader.current = 0;
//         preloader.total = preloader.paths.length;
//         if (!preloader.paths.length && !preloader.waiting) {
//             unsetPreloader(preloader);
//         }
//         preloader.paths.forEach(path => {
//             let pathExtension = path.substring(path.lastIndexOf('.') + 1);
//             let images = extensions.indexOf(pathExtension) !== -1;
//             if (images) {
//                 let fakeElement = $('<img>');
//                 fakeElement.on('load', () => {
//                     preloader.current++;
//                     setPercents(preloader);
//                 });
//                 fakeElement.attr('src', path);
//             } else {
//                 preloader.total--;
//             }
//         });
//     };
//     /**
//      * Update indicator percents
//      * @param {object} preloader
//      */
//     let setPercents = preloader => {
//         let percents = Math.ceil(preloader.current / preloader.total * 100);
//         preloader.$percents.text(`${percents}%`);
//         if (percents == 100) {
//             unsetPreloader(preloader);
//         }
//     };
//     /**
//      * Hide preloader
//      * @param {object} preloader
//      */
//     let unsetPreloader = preloader => {
//         preloader.$el.fadeOut();
//         $('html, body').css('overflow', 'visible');
//     };
//     return {
//         init: init
//     };
// })();

var blur = (function () {
    var wrapper = document.querySelector('.js-blur-wr'),
        form    = document.querySelector('.js-blur-form'),
        block   = document.querySelector('.js-blur');
    return {
        set: function () {
            var
                blockHeight = block.offsetHeight,
                blockWidth = block.offsetWidth,
                posTop = -wrapper.offsetTop,
                blurCss = form.style,
                wr = wrapper.offsetHeight,
                blockHeigh2 = posTop-wr/2;
                blurCss.width = blockWidth + 'px';
                blurCss.height = blockHeight + 'px';
                blurCss.transform = 'translate(-50%,' + blockHeigh2 + 'px)';
                blurCss.webkitTransform = 'translate(-50%,' + blockHeigh2 + 'px)';
                blurCss.mozTransform = 'translate(-50%,' + blockHeigh2 + 'px)';
            // blurCss.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
            // blurCss.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';

        }

    }
}());

window.onresize = function () {
    blur.set();
}
window.onload = function() {
  blur.set();
};
