const waterJs = require('./common/water.js');
const $ = require('jquery');

// const hamburgerContainer = document.getElementById('hamburger');
// hamburgerContainer.click(function () {
//     console.log('click');
// });

$(document).ready(function(){

  $("#hamburger").click(function(){
    $(this).toggleClass("active");
    $('#menu').toggleClass("active");
  });

  $("#autorization").click(function(){
    $(this).hide();
    $('.flipper').addClass("active");
  });

  $("#index").click(function(){
    $('.flipper').removeClass("active");
    $("#autorization").show();
  });
});

/**
 * @module preloader
 */
export default (() => {
    /**
     * @namespace
     * @property {boolean} waiting
     * @property {jQuery} $context
     * @type {{waiting: boolean, $context: (*|jQuery|HTMLElement)}}
     */
    let _params = {
        waiting: false,
        $context: $(document)
    };
    /**
     * Supported formats
     */
    let extensions = ['jpg', 'png', 'gif'];
    /**
     * @param {object} params
     * @param {number} params.waiting - When passing a parameter, the script will wait for the
     * event "preloader:continue" on the document object before start preloading media.
     */
    let init = params => {
        $('html, body').css('overflow', 'hidden');
        let preloader = Object.assign(_params, params);
        preloader.$el = $('.preloader');
        preloader.$percents = preloader.$el.find('.preloader__percents');
        preloader.$spinner = preloader.$el.find('.preloader__spinner');
        if (preloader.waiting) {
            preloader.$context.one('preloader:continue', () => loading(preloader));
        } else {
            loading(preloader);
        }
    };
    /**
     * Get media sources
     * @param {object} preloader
     * @returns {Array} Array with paths
     */
    let getPaths = preloader => {
        let paths = preloader.$context.find('*').map((index, element) => {
            let background = $(element).css('background-image');
            let path = '';
            if (background !== 'none') {
                path = background.replace('url("', '').replace('")', '');
            }
            if ($(element).is('img')) {
                path = $(element).attr('src');
            }
            if (path && path.indexOf('data:') !== 0) return path;
        });
        return lodashUniq(paths);
    };
    /**
     * Preloading media
     * @param {object} preloader
     */
    let loading = (preloader) => {
        preloader.$spinner.fadeIn();
        preloader.paths = getPaths(preloader);
        preloader.current = 0;
        preloader.total = preloader.paths.length;
        if (!preloader.paths.length && !preloader.waiting) {
            unsetPreloader(preloader);
        }
        preloader.paths.forEach(path => {
            let pathExtension = path.substring(path.lastIndexOf('.') + 1);
            let images = extensions.indexOf(pathExtension) !== -1;
            if (images) {
                let fakeElement = $('<img>');
                fakeElement.on('load', () => {
                    preloader.current++;
                    setPercents(preloader);
                });
                fakeElement.attr('src', path);
            } else {
                preloader.total--;
            }
        });
    };
    /**
     * Update indicator percents
     * @param {object} preloader
     */
    let setPercents = preloader => {
        let percents = Math.ceil(preloader.current / preloader.total * 100);
        preloader.$percents.text(`${percents}%`);
        if (percents == 100) {
            unsetPreloader(preloader);
        }
    };
    /**
     * Hide preloader
     * @param {object} preloader
     */
    let unsetPreloader = preloader => {
        preloader.$el.fadeOut();
        $('html, body').css('overflow', 'visible');
    };
    return {
        init: init
    };
})();
