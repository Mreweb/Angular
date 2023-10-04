(function ($) {
  showSuccessToast = function () {
    'use strict';
    resetToastPosition();
    $.toast({
      heading: 'موفق',
      text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم .',
      showHideTransition: 'slide',
      icon: 'success',
      loaderBg: '#f96868',
      position: 'top-left'
    })
  };
  showInfoToast = function () {
    'use strict';
    resetToastPosition();
    $.toast({
      heading: 'اطلاع',
      text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم .',
      showHideTransition: 'slide',
      icon: 'info',
      loaderBg: '#46c35f',
      position: 'top-left'
    })
  };
  showWarningToast = function () {
    'use strict';
    resetToastPosition();
    $.toast({
      heading: 'هشدار',
      text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم .',
      showHideTransition: 'slide',
      icon: 'warning',
      loaderBg: '#57c7d4',
      position: 'top-left'
    })
  };
  showDangerToast = function () {
    'use strict';
    resetToastPosition();
    $.toast({
      heading: 'خطر',
      text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم .',
      showHideTransition: 'slide',
      icon: 'error',
      loaderBg: '#f2a654',
      position: 'top-left'
    })
  };
  showToastPosition = function (position) {
    'use strict';
    resetToastPosition();
    $.toast({
      heading: 'موقعیت',
      text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم .',
      position: String(position),
      icon: 'info',
      stack: false,
      loaderBg: '#f96868'
    })
  }
  showToastInCustomPosition = function () {
    'use strict';
    resetToastPosition();
    $.toast({
      heading: 'موقعیت دلخوا',
      text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم .',
      icon: 'info',
      position: {
        left: 120,
        top: 120
      },
      stack: false,
      loaderBg: '#f96868'
    })
  }
  resetToastPosition = function () {
    $('.jq-toast-wrap').removeClass('bottom-left bottom-right top-left top-right mid-center'); // to remove previous position class
    $(".jq-toast-wrap").css({
      "top": "",
      "left": "",
      "bottom": "",
      "right": ""
    }); //to remove previous position style
  }
})(jQuery);