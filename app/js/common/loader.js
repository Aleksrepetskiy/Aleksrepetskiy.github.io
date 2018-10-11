const $ = require('jquery');
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
                    $('.loader').css({
                        'opacity':  '0',
                        'visibility':  'hidden',
                    });
                }
                $('#loader__percents').text(percent+'%');
            }
        });
    }, 1000);
});
