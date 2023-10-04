(function ($) {
  'use strict';
  $(function () {
    if ($('#calendar').length) {
      $('#calendar').fullCalendar({
        header: {
          right: 'prev,next today',
          center: 'title',
          left: 'month,basicWeek,basicDay'
        },
        defaultDate: '2021-07-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [{
            title: 'رویداد روزانه',
            start: '2021-07-08'
          },
          {
            title: 'رویداد بلند',
            start: '2021-07-01',
            end: '2021-07-07'
          },
          {
            id: 999,
            title: 'رویداد تکراری',
            start: '2021-07-09T16:00:00'
          },
          {
            id: 999,
            title: 'رویداد تکراری',
            start: '2021-07-16T16:00:00'
          },
          {
            title: 'کنفرانس',
            start: '2021-07-11',
            end: '2021-07-13'
          },
          {
            title: 'جلسه',
            start: '2021-07-12T10:30:00',
            end: '2021-07-12T12:30:00'
          },
          {
            title: 'ناهار',
            start: '2021-07-12T12:00:00'
          },
          {
            title: 'جلسه',
            start: '2021-07-12T14:30:00'
          },
          {
            title: 'ساعت استراحت',
            start: '2021-07-12T17:30:00'
          },
          {
            title: 'شام',
            start: '2021-07-12T20:00:00'
          },
          {
            title: 'جشن تولد',
            start: '2021-07-13T07:00:00'
          },
          {
            title: 'لینک گوگل',
            url: 'http://google.com/',
            start: '2021-07-28'
          }
        ]
      })
    }
  });
})(jQuery);