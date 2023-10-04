$(function () {
	"use strict";
	// chart 1
	Highcharts.chart('chart10', {
		chart: {
			useHTML: true,
			type: 'column',
			styledMode: true
		},
		credits: {
			useHTML: true,
			enabled: false
		},
		title: {
			useHTML: true,
			useHTML: true,
			text: 'سهم بازار مرورگر، خرداد 1400'
		},
		subtitle: {
			useHTML: true,
			useHTML: true,
			text: 'منبع : <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
		},
		accessibility: {
			announceNewData: {
				useHTML: true,
				enabled: true
			}
		},
		xAxis: {
			useHTML: true,
			type: 'category'
		},
		yAxis: {
			title: {
				useHTML: true,
				text: 'درصد کل سهام بازار'
			}
		},
		legend: {
			useHTML: true,
			enabled: false
		},
		plotOptions: {
			useHTML: true,
			series: {
				useHTML: true,
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '{point.y:.1f}%'
				}
			}
		},
		tooltip: {
			useHTML: true,
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> از مجموع کل<br/>'
		},
		series: [{
			name: "مرورگر",
			colorByPoint: true,
			data: [{
				name: "کروم",
				y: 62.74,
				drilldown: "کروم"
			}, {
				name: "فایرفاکس",
				y: 10.57,
				drilldown: "فایرفاکس"
			}, {
				name: "اینترنت اکسپلورر",
				y: 7.23,
				drilldown: "اینترنت اکسپلورر"
			}, {
				name: "سافاری",
				y: 5.58,
				drilldown: "سافاری"
			}, {
				name: "مایکروسافت اج",
				y: 4.02,
				drilldown: "مایکروسافت اج"
			}, {
				name: "اپرا",
				y: 1.92,
				drilldown: "اپرا"
			}, {
				name: "دیگر",
				y: 7.62,
				drilldown: null
			}]
		}],
		drilldown: {
			series: [{
				name: "کروم",
				id: "کروم",
				data: [
					["v65.0",
						0.1
					],
					["v64.0",
						1.3
					],
					["v63.0",
						53.02
					],
					["v62.0",
						1.4
					],
					["v61.0",
						0.88
					],
					["v60.0",
						0.56
					],
					["v59.0",
						0.45
					],
					["v58.0",
						0.49
					],
					["v57.0",
						0.32
					],
					["v56.0",
						0.29
					],
					["v55.0",
						0.79
					],
					["v54.0",
						0.18
					],
					["v51.0",
						0.13
					],
					["v49.0",
						2.16
					],
					["v48.0",
						0.13
					],
					["v47.0",
						0.11
					],
					["v43.0",
						0.17
					],
					["v29.0",
						0.26
					]
				]
			}, {
				name: "فایرفاکس",
				id: "فایرفاکس",
				data: [
					["v58.0",
						1.02
					],
					["v57.0",
						7.36
					],
					["v56.0",
						0.35
					],
					["v55.0",
						0.11
					],
					["v54.0",
						0.1
					],
					["v52.0",
						0.95
					],
					["v51.0",
						0.15
					],
					["v50.0",
						0.1
					],
					["v48.0",
						0.31
					],
					["v47.0",
						0.12
					]
				]
			}, {
				name: "اینترنت اکسپلورر",
				id: "اینترنت اکسپلورر",
				data: [
					["v11.0",
						6.2
					],
					["v10.0",
						0.29
					],
					["v9.0",
						0.27
					],
					["v8.0",
						0.47
					]
				]
			}, {
				name: "سافاری",
				id: "سافاری",
				data: [
					["v11.0",
						3.39
					],
					["v10.1",
						0.96
					],
					["v10.0",
						0.36
					],
					["v9.1",
						0.54
					],
					["v9.0",
						0.13
					],
					["v5.1",
						0.2
					]
				]
			}, {
				name: "مایکروسافت اج",
				id: "مایکروسافت اج",
				data: [
					["v16",
						2.6
					],
					["v15",
						0.92
					],
					["v14",
						0.4
					],
					["v13",
						0.1
					]
				]
			}, {
				name: "اپرا",
				id: "اپرا",
				data: [
					["v50.0",
						0.96
					],
					["v49.0",
						0.82
					],
					["v12.1",
						0.14
					]
				]
			}]
		}
	});
	// chart 2
	// Build the chart
	Highcharts.chart('chart11', {
		chart: {
			useHTML: true,
			type: 'variablepie',
			styledMode: true
		},
		credits: {
			useHTML: true,
			enabled: false
		},
		title: {
			useHTML: true,
			text: 'مقایسه کشورها از نظر تراکم جمعیت و مساحت کل'
		},
		tooltip: {
			useHTML: true,
			headerFormat: '',
			pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' + 'مساحت (کیلومتر مربع) : <b>{point.y}</b><br/>' + 'تراکم جمعیت (مردم در هر کیلومتر مربع) : <b>{point.z}</b><br/>'
		},
		series: [{
			useHTML: true,
			minPointSize: 10,
			useHTML: true,
			innerSize: '20%',
			zMin: 0,
			name: 'کشور',
			data: [{
				name: 'اسپانیا',
				y: 505370,
				z: 92.9
			}, {
				name: 'فرانسه',
				y: 551500,
				z: 118.7
			}, {
				name: 'لهستان',
				y: 312685,
				z: 124.6
			}, {
				name: 'جمهوری چک',
				y: 78867,
				z: 137.5
			}, {
				name: 'ایتالیا',
				y: 301340,
				z: 201.8
			}, {
				name: 'سوییس',
				y: 41277,
				z: 214.5
			}, {
				name: 'آلمان',
				y: 357022,
				z: 235.6
			}]
		}]
	});
	// chart 3
	Highcharts.chart('chart12', {
		chart: {
			useHTML: true,
			type: 'column',
			styledMode: true
		},
		credits: {
			useHTML: true,
			enabled: false
		},
		title: {
			useHTML: true,
			text: 'میانگین بارندگی ماهانه'
		},
		subtitle: {
			useHTML: true,
			text: 'منبع : WorldClimate.com'
		},
		legend: {
			rtl: true
		},
		xAxis: {
			useHTML: true,
			categories: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
			crosshair: true
		},
		yAxis: {
			useHTML: true,
			min: 0,
			title: {
				useHTML: true,
				text: 'بارندگی (میلی متر)'
			}
		},
		tooltip: {
			useHTML: true,
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} میلی متر</b></td></tr>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [{
			name: 'تهران',
			data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
		}, {
			name: 'توکیو',
			data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
		}, {
			name: 'لندن',
			data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
		}, {
			name: 'برلین',
			data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
		}]
	});
	// Build the chart
	Highcharts.chart('chart13', {
		chart: {
			useHTML: true,
			type: 'bar',
			styledMode: true
		},
		credits: {
			useHTML: true,
			enabled: false
		},
		title: {
			useHTML: true,
			text: 'نمودار ستونی انباشته'
		},
		tooltip: {
			useHTML: true
		},
		xAxis: {
			useHTML: true,
			categories: ['سیب', 'پرتقال', 'گلابی', 'گریپ فروت', 'موز']
		},
		yAxis: {
			useHTML: true,
			min: 0,
			title: {
				useHTML: true,
				text: 'مصرف کل میوه'
			}
		},
		legend: {
			useHTML: true,
			rtl: true,
			reversed: true
		},
		plotOptions: {
			useHTML: true,
			series: {
				useHTML: true,
				stacking: 'normal'
			}
		},
		series: [{
			name: 'رضا',
			data: [5, 3, 4, 7, 2]
		}, {
			name: 'پریسا',
			data: [2, 2, 3, 2, 1]
		}, {
			name: 'ساناز',
			data: [3, 4, 4, 2, 5]
		}]
	});
	// chart 5
	Highcharts.chart('chart14', {
		chart: {
			type: 'column',
			useHTML: true,
			styledMode: true
		},
		credits: {
			useHTML: true,
			enabled: false
		},
		title: {
			useHTML: true,
			text: 'نمودار ستونی انباشته شده'
		},
		xAxis: {
			useHTML: true,
			categories: ['سیب', 'پرتقال', 'گلابی', 'گریپ فروت', 'موز']
		},
		yAxis: {
			useHTML: true,
			min: 0,
			title: {
				useHTML: true,
				text: 'مصرف کل میوه'
			},
			stackLabels: {
				enabled: true,
				style: {
					useHTML: true,
					fontWeight: 'bold',
					color: ( // theme
						Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'gray'
				}
			}
		},
		legend: {
			useHTML: true,
			align: 'right',
			rtl: true,
			x: -30,
			verticalAlign: 'top',
			y: 25,
			floating: true,
			backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
			borderColor: '#CCC',
			borderWidth: 1,
			shadow: false
		},
		tooltip: {
			useHTML: true,
			headerFormat: '<b>{point.x}</b><br/>',
			pointFormat: '{series.name}: {point.y}<br/>مجموع : {point.stackTotal}'
		},
		plotOptions: {
			column: {
				stacking: 'normal',
				dataLabels: {
					enabled: true
				}
			}
		},
		series: [{
			name: 'رضا',
			data: [5, 3, 4, 7, 2]
		}, {
			name: 'پریسا',
			data: [2, 2, 3, 2, 1]
		}, {
			name: 'ساناز',
			data: [3, 4, 4, 2, 5]
		}]
	});
	// chart 6
	Highcharts.chart('chart15', {
		chart: {
			useHTML: true,
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie',
			styledMode: true
		},
		credits: {
			enabled: false
		},
		title: {
			useHTML: true,
			text: 'سهم بازار مرورگر در اردیبهشت 1400'
		},
		legend: {
			rtl: true
		},
		tooltip: {
			useHTML: true,
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		accessibility: {
			useHTML: true,
			point: {
				useHTML: true,
				valueSuffix: '%'
			}
		},
		plotOptions: {
			useHTML: true,
			direction: 'rtl',
			pie: {
				useHTML: true,
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					useHTML: true,
					enabled: false
				},
				useHTML: true,
				showInLegend: true
			}
		},
		series: [{
			useHTML: true,
			name: 'برند ها',
			colorByPoint: true,
			data: [{
				useHTML: true,
				name: 'کروم',
				y: 61.41,
				sliced: true,
				selected: true
			}, {
				name: 'اینترنت اکسپلورر',
				y: 11.84
			}, {
				name: 'فایرفاکس',
				y: 10.85
			}, {
				name: 'مایکروسافت اج',
				y: 4.67
			}, {
				name: 'سافاری',
				y: 4.18
			}, {
				name: 'دیگر',
				y: 7.05
			}]
		}]
	});
});