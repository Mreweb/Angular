$(function () {

  showSwal = function (type) {
    'use strict';
    if (type === 'basic2') {
      swal.fire({
        text: 'لورم ایپسوم متن ساختگی با تولید سادگی',
        confirmButtonText: 'بستن',
        confirmButtonClass: 'btn btn-danger',
      })
    } else if (type === 'title-and-text') {
      Swal.fire(
        'لورم ایپسوم؟',
        'لورم ایپسوم متن ساختگی با تولید سادگی',
        'question'
      )
    } else if (type === 'title-icon-text-footer') {
      Swal.fire({
        type: 'error',
        title: 'اوپس...',
        text: 'خطایی رخ داده است!',
        footer: '<a href>آیا سوالی دارید؟</a>'
      })
    } else if (type === 'custom-html') {
      Swal.fire({
        title: '<strong><u>مثال</u> HTML</strong>',
        icon: 'info',
        html: 'شما می توانید از <b>متن تو پُر</b> ، ' +
          '<a href="//google.com">لینک</a> ' +
          'و هر تگ HTML دیگری استفاده کنید',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'عالی!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: '<i class="fa fa-thumbs-up"></i>',
        cancelButtonAriaLabel: 'Thumbs down',
      });
      feather.replace();
    } else if (type === 'custom-position') {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'اطلاعات شما با موفقیت ذخیره شد',
        showConfirmButton: false,
        timer: 1500
      })
    } else if (type === 'passing-parameter-execute-cancel') {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger mr-2'
        },
        buttonsStyling: false,
      })

      swalWithBootstrapButtons.fire({
        title: 'آیا مطمئن هستید؟',
        text: "بعد از حذف شما قادر به بازگردانی اطلاعات نخواهید بود",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'mr-2',
        confirmButtonText: 'بله، حذف شود!',
        cancelButtonText: 'نه، لغو شود',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'حذف شد!',
            'فایل مورد نظر شما حذف شد!',
            'success'
          )
        } else if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'لغو شد',
            'شما حذف فایل را لغو کردید :)',
            'error'
          )
        }
      })
    } else if (type === 'message-with-auto-close') {
      let timerInterval
      Swal.fire({
        title: 'هشدار با قابلیت بسته شدن خودکار!',
        html: 'این هشدار بعد از <strong></strong> میلی ثانیه بسته می شود.',
        timer: 2000,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            Swal.getContent().querySelector('strong')
              .textContent = Swal.getTimerLeft()
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.timer
        ) {
          console.log('I was closed by the timer')
        }
      })
    } else if (type === 'chaining-modals') {
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'بعدی &larr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([{
          title: 'پرسش 1',
          text: 'مدال زنجیره ای هشدار شیرین'
        },
        'پرسش 2',
        'پرسش 3'
      ]).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'همه انجام شد!',
            html: 'پاسخ شما : <pre><code>' +
              JSON.stringify(result.value) +
              '</code></pre>',
            confirmButtonText: 'دوست داشتنی!'
          })
        }
      })
    } else if (type === 'dynamic-queue') {
      const ipAPI = 'https://api.ipify.org?format=json'
      Swal.queue([{
        title: 'آی پی عمومی شما',
        confirmButtonText: 'نمایش آی پی عمومی من',
        text: 'آی پی عمومی دریافت شده شما ' +
          'با درخواست AJAX',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return fetch(ipAPI)
            .then(response => response.json())
            .then(data => Swal.insertQueueStep(data.ip))
            .catch(() => {
              Swal.insertQueueStep({
                icon: 'error',
                title: 'آی پی عمومی شما در دسترس نبود'
              })
            })
        }
      }])
    } else if (type === 'mixin') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1113000
      });

      Toast.fire({
        icon: 'success',
        title: 'ثبت نام شما با موفقیت انجام شد'
      })
    }
  }

});