(function () {

    'use strict';

    $('document').ready(startApp);

    function startApp() {
        // HEADER
        var linksScroll = $('.link-scroll');

        linksScroll.on('click', scrollTo);

        function scrollTo(e) {
            e.preventDefault();

            var target = $(this);
            var destination = target.data('to');

            if (!destination) { return; }

            $('html, body').animate({
                scrollTop: $('#' + destination).position().top + 'px'
            }, 400);
        }

        // SLIDER
        var sliderContainer = $('.slider-items');
        var dotsContainer = $('.slider-dots');
        var arrowsContainer = $('.slider-arrows');

        initSlider();

        function initSlider() {
            var currentIndexTarget = 0;
            var items = sliderContainer.find('li');

            // SLIDER HEIGTH
            var sliderHeight = items.first().height();

            $.each(items, function(key, item) {
                if ($(item).height() > sliderHeight) {
                    sliderHeight = $(item).height();
                }
            });

            sliderContainer.height(sliderHeight);

            // SLIDER WIDTH
            var sliderWitdh = sliderContainer.width();
            sliderContainer.find('li').width(sliderWitdh);
            sliderContainer.find('ul').width(sliderWitdh * items.length);

            // DOTS
            dotsContainer.on('click', 'span', startDotsNavigation);

            function startDotsNavigation() {
                var target = $(this);

                restartDots(target.index());
                navigateTo(target.index());
            }

            // ARROWS
            arrowsContainer.on('click', 'span', startArrowsNavigation);

            function startArrowsNavigation() {
                var target = $(this);

                if (target.hasClass('next-slider')) {
                    currentIndexTarget = (currentIndexTarget + 1 > items.length - 1) ? 0 : currentIndexTarget + 1;
                } else {
                    currentIndexTarget = (currentIndexTarget - 1 < 0) ? items.length - 1 : currentIndexTarget - 1;
                }

                restartDots(currentIndexTarget);
                navigateTo(currentIndexTarget);
            }

            // PRIVATE
            function navigateTo(index) {
                currentIndexTarget = index;

                var leftPosition = sliderContainer.find('li').eq(index).position().left;

                sliderContainer.find('ul').animate({
                    left: '-' + leftPosition + 'px'
                }, 400);
            }

            function restartDots(index) {
                dotsContainer.find('.active').removeClass('active');
                dotsContainer.find('span').eq(index).addClass('active');
            }
        }
    }

}());
