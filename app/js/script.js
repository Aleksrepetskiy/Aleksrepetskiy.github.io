const $ = require('jquery');
// const waterJs = require('./common/water.js');
const loaderJs = require('./common/loader.js');

$(document).ready(function() {
    setTimeout(function () {
        $(function() {
            var arr = [];
            $('*').each(function() {
                var $this = $(this),
                bg = $this.css('background-image'),
                img = $this.is('img');
                if (bg != 'none') {
                    var path = bg.replace('url("', '').replace('")', '');
                    arr.push(path);
                }

                if (img) {
                    var path = $this.attr('src');
                    if (path) {
                        arr.push(path);
                    }
                }
            })
            var currentAm = 1;
            for (var i = 0; i < arr.length; i++) {
                var image = $('<img>', {
                    attr: {
                        src: arr[i]
                    }
                });

                image.on('load',function() {
                    setPercets(arr.length, currentAm);
                    currentAm++;
                });
            }

            function setPercets(total, current) {
                var percent = Math.ceil(current / total * 100);
                if (percent >= 100){
                    $('.wrapper').css('display', 'block');
                    // $('.loader').css({
                    //     'opacity':  '0',
                    //     'visibility':  'hidden',
                    // });

                }
                $('.loader-bar').css({
                    'width' : percent + '%'
                }).text(percent+'%');
            }
        });
    }, 1000);

});

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
