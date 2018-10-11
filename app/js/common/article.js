const $ = require('jquery');
$(window).scroll(function () {
    var
        wScroll     = $(window).scrollTop(),
        menu        = $('.static .articles-menu'),
        sidebar     = $('.static .blog__menu'),
        stickyStart = sidebar.offset().top,
        menuClone   = menu.clone(),
        fixSidebar  = $('.fixed .blog__menu')
        if(wScroll>=stickyStart) {
            if(!fixSidebar.find('.articles-menu').length) {
                fixSidebar.append(menuClone);
                menu.hide();
            }
        }else {
            fixSidebar.find('.articles-menu').remove();
            menu.show();
        }

})
