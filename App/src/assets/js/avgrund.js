(function ($) {
  'use strict';
  $(function () {
    $('#show').avgrund({
      height: 500,
      holderClass: 'custom',
      showClose: true,
      showCloseText: 'x',
      onBlurContainer: '.container-scroller',
      template: '<p>برای وارد شدن به حساب توییتر یا فیسبوک ما روی دکمه مورد نظر کلیک کرده و برای بسته شدن این پنجره روی آیکون ضربدر کلیک کنید و یا دکمه Esc روی کیبورد را بزنید .</p>' +
        '<div>' +
        '<a href="http://twitter.com/YourAccount target="_blank" class="twitter btn btn-twitter btn-block">Twitter</a>' +
        '<a href="http://dribbble.com/YourAccount" target="_blank" class="facebook btn btn-facebook btn-block">Face Book</a>' +
        '</div>' +
        '<div class="text-center mt-4">' +
        '<a href="#" target="_blank" class="btn btn-success ml-2">باشه !</a>' +
        '<a href="#" target="_blank" class="btn btn-light">لغو</a>' +
        '</div>'
    });
  })
})(jQuery);