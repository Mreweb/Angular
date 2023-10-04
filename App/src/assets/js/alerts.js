(function ($) {
  showSwal = function (type) {
    'use strict';
    if (type === 'basic') {
      swal({
        text: 'این یک پیغام ساده است !',
        button: {
          text: "باشه",
          value: true,
          visible: true,
          className: "btn btn-primary"
        }
      })

    } else if (type === 'title-and-text') {
      swal({
        title: 'این پیغام را بخوانید !',
        text: 'روی دکمه باشه کلیک کنید تا هشدار بسته شود',
        button: {
          text: "باشه",
          value: true,
          visible: true,
          className: "btn btn-primary"
        }
      })

    } else if (type === 'success-message') {
      swal({
        title: 'تبریک می گم !',
        text: 'شما پاسخ صحیح داده اید',
        icon: 'success',
        button: {
          text: "ادامه",
          value: true,
          visible: true,
          className: "btn btn-primary"
        }
      })

    } else if (type === 'auto-close') {
      swal({
        title: 'هشدار با قابلیت بسته شدن خودکار !',
        text: 'این پیغام بعد از 2 ثانیه بسته خواهد شد',
        timer: 2000,
        button: false
      }).then(
        function () {},
        // handling the promise rejection
        function (dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer')
          }
        }
      )
    } else if (type === 'warning-message-and-cancel') {
      swal({
        title: 'آیا مطمئن هستید ؟',
        text: "شما برای حذف این مطلب اطمینان دارید ؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3f51b5',
        cancelButtonColor: '#ff4081',
        confirmButtonText: 'Great ',
        buttons: {
          cancel: {
            text: "لغو",
            value: null,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
          confirm: {
            text: "تایید",
            value: true,
            visible: true,
            className: "btn btn-primary",
            closeModal: true
          }
        }
      })

    } else if (type === 'custom-html') {
      swal({
        content: {
          element: "input",
          attributes: {
            placeholder: "رمز عبور خود را وارد کنید",
            type: "password",
            class: 'form-control'
          },
        },
        button: {
          text: "نایید",
          value: true,
          visible: true,
          className: "btn btn-primary"
        }
      })
    }
  }

})(jQuery);