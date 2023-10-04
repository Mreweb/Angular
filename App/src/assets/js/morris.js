$(function () {
  'use strict';
  if ($('#morris-line-example').length) {
    Morris.Line({
      element: 'morris-line-example',
      lineColors: ['#63CF72', '#F36368', '#76C1FA', '#FABA66'],
      data: [{
          y: '1394',
          a: 100,
          b: 150
        },
        {
          y: '1395',
          a: 75,
          b: 65
        },
        {
          y: '1396',
          a: 50,
          b: 40
        },
        {
          y: '1397',
          a: 75,
          b: 65
        },
        {
          y: '1398',
          a: 50,
          b: 40
        },
        {
          y: '1399',
          a: 75,
          b: 65
        },
        {
          y: '1400',
          a: 100,
          b: 90
        }
      ],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['سری الف', 'سری ب']
    });
  }
  if ($('#morris-area-example').length) {
    Morris.Area({
      element: 'morris-area-example',
      lineColors: ['#76C1FA', '#F36368', '#63CF72', '#FABA66'],
      data: [{
          y: '1394',
          a: 100,
          b: 90
        },
        {
          y: '1395',
          a: 75,
          b: 105
        },
        {
          y: '1396',
          a: 50,
          b: 40
        },
        {
          y: '1397',
          a: 75,
          b: 65
        },
        {
          y: '1398',
          a: 50,
          b: 40
        },
        {
          y: '1399',
          a: 75,
          b: 65
        },
        {
          y: '1400',
          a: 100,
          b: 90
        }
      ],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['سری الف', 'سری ب']
    });
  }
  if ($("#morris-bar-example").length) {
    Morris.Bar({
      element: 'morris-bar-example',
      barColors: ['#63CF72', '#F36368', '#76C1FA', '#FABA66'],
      data: [{
          y: '1394',
          a: 100,
          b: 90
        },
        {
          y: '1395',
          a: 75,
          b: 65
        },
        {
          y: '1396',
          a: 50,
          b: 40
        },
        {
          y: '1397',
          a: 75,
          b: 65
        },
        {
          y: '1398',
          a: 50,
          b: 40
        },
        {
          y: '1399',
          a: 75,
          b: 65
        },
        {
          y: '1400',
          a: 100,
          b: 90
        }
      ],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['سری الف', 'سری ب']
    });
  }
  if ($("#morris-donut-example").length) {
    Morris.Donut({
      element: 'morris-donut-example',
      colors: ['#76C1FA', '#F36368', '#63CF72', '#FABA66'],
      data: [{
          label: "فروش اینترنتی",
          value: 12
        },
        {
          label: "فروش در فروشگاه",
          value: 30
        },
        {
          label: "فروش چندگانه",
          value: 20
        }
      ]
    });
  }
  if ($('#morris-dashboard-taget').length) {
    Morris.Area({
      element: 'morris-dashboard-taget',
      parseTime: false,
      lineColors: ['#76C1FA', '#F36368', '#63CF72', '#FABA66'],
      data: [{
          y: 'فروردین',
          Revenue: 190,
          Target: 170
        },
        {
          y: 'اردیبهشت',
          Revenue: 60,
          Target: 90
        },
        {
          y: 'خرداد',
          Revenue: 100,
          Target: 120
        },
        {
          y: 'تیر',
          Revenue: 150,
          Target: 140
        },
        {
          y: 'مرداد',
          Revenue: 130,
          Target: 170
        },
        {
          y: 'شهریور',
          Revenue: 200,
          Target: 160
        },
        {
          y: 'مهر',
          Revenue: 150,
          Target: 180
        },
        {
          y: 'آبان',
          Revenue: 170,
          Target: 180
        },
        {
          y: 'آذر',
          Revenue: 140,
          Target: 90
        }
      ],
      xkey: 'y',
      ykeys: ['هدف', 'درآمد'],
      labels: ['هدف ماهیانه', 'درآمد ماهیانه'],
      hideHover: 'auto',
      behaveLikeLine: true,
      resize: true,
      axes: 'x'
    });
  }
});