(function ($) {
  'use strict';
  $.contextMenu({
    selector: '#context-menu-simple',
    callback: function (key, options) {},
    items: {
      "edit": {
        name: "ویرایش",
        icon: "edit"
      },
      "cut": {
        name: "بریدن",
        icon: "cut"
      },
      copy: {
        name: "کپی",
        icon: "copy"
      },
      "paste": {
        name: "چسباندن",
        icon: "paste"
      },
      "delete": {
        name: "حذف",
        icon: "delete"
      },
      "sep1": "---------",
      "quit": {
        name: "خروج",
        icon: function () {
          return 'context-menu-icon context-menu-icon-quit';
        }
      }
    }
  });
  $.contextMenu({
    selector: '#context-menu-access',
    callback: function (key, options) {
      var m = "گزینه کلیک شده : " + key;
      window.console && console.log(m) || alert(m);
    },
    items: {
      "ویرایش": {
        name: "ویرایش",
        icon: "edit",
        accesskey: "e"
      },
      "بریدن": {
        name: "بریدن",
        icon: "cut",
        accesskey: "c"
      },
      // first unused character is taken (here: o)
      "کپی": {
        name: "کپی",
        icon: "copy",
        accesskey: "c o p y"
      },
      // words are truncated to their first letter (here: p)
      "چسباندن": {
        name: "چسباندن",
        icon: "paste",
        accesskey: "cool paste"
      },
      "حذف": {
        name: "حذف",
        icon: "delete"
      },
      "sep1": "---------",
      "خروج": {
        name: "خروج",
        icon: function ($element, key, item) {
          return 'context-menu-icon context-menu-icon-quit';
        }
      }
    }
  });
  $.contextMenu({
    selector: '#context-menu-open',
    callback: function (key, options) {
      var m = "گزینه کلیک شده : " + key;
      window.console && console.log(m) || alert(m);
    },
    items: {
      "بستن با کلیک": {
        name: "بستن با کلیک",
        icon: "delete",
        callback: function () {
          return true;
        }
      },
      "باز نگه داشتن با کلیک": {
        name: "باز نگه داشتن با کلیک",
        icon: "edit",
        callback: function () {
          return false;
        }
      }
    }
  });
  $.contextMenu({
    selector: '#context-menu-multi',
    callback: function (key, options) {
      var m = "گزینه کلیک شده : " + key;
      window.console && console.log(m) || alert(m);
    },
    items: {
      "ویرایش": {
        "name": "ویرایش",
        "icon": "edit"
      },
      "بریدن": {
        "name": "بریدن",
        "icon": "cut"
      },
      "sep1": "---------",
      "quit": {
        "name": "خروج",
        "icon": "quit"
      },
      "sep2": "---------",
      "زیر گروه 1": {
        "name": "زیر گروه 1",
        "items": {
          "زیر گروه 1-1": {
            "name": "زیر گروه 1-1"
          },
          "زیرگروه 2": {
            "name": "زیرگروه 2",
            "items": {
              "زیرگروه 1-2": {
                "name": "زیرگروه 1-2"
              },
              "زیرگروه 2-2": {
                "name": "زیرگروه 2-2"
              },
              "زیرگروه 3-2": {
                "name": "زیرگروه 3-2"
              }
            }
          },
          "زیرگروه 3": {
            "name": "زیرگروه 3"
          }
        }
      },
      "زیرگروه 4": {
        "name": "زیرگروه 4",
        "items": {
          "زیرگروه 1-4": {
            "name": "زیرگروه 1-4"
          },
          "زیرگروه 2-4": {
            "name": "زیرگروه 2-4"
          },
          "زیرگروه3-4": {
            "name": "زیرگروه3-4"
          }
        }
      }
    }
  });
  $.contextMenu({
    selector: '#context-menu-hover',
    trigger: 'hover',
    delay: 500,
    callback: function (key, options) {
      var m = "گزینه کلیک شده : " + key;
      window.console && console.log(m) || alert(m);
    },
    items: {
      "ویرایش": {
        name: "ویرایش",
        icon: "edit"
      },
      "بریدن": {
        name: "بریدن",
        icon: "cut"
      },
      "کپی": {
        name: "کپی",
        icon: "copy"
      },
      "چسباندن": {
        name: "چسباندن",
        icon: "paste"
      },
      "حذف": {
        name: "حذف",
        icon: "delete"
      },
      "sep1": "---------",
      "خروج": {
        name: "خروج",
        icon: function ($element, key, item) {
          return 'context-menu-icon context-menu-icon-quit';
        }
      }
    }
  });
  $.contextMenu({
    selector: '#context-menu-hover-autohide',
    trigger: 'hover',
    delay: 500,
    autoHide: true,
    callback: function (key, options) {
      var m = "گزینه کلیک شده : " + key;
      window.console && console.log(m) || alert(m);
    },
    items: {
      "ویرایش": {
        name: "ویرایش",
        icon: "edit"
      },
      "بریدن": {
        name: "بریدن",
        icon: "cut"
      },
      "کپی": {
        name: "کپی",
        icon: "copy"
      },
      "چسباندن": {
        name: "چسباندن",
        icon: "paste"
      },
      "حذف": {
        name: "حذف",
        icon: "delete"
      },
      "sep1": "---------",
      "خروج": {
        name: "خروج",
        icon: function ($element, key, item) {
          return 'context-menu-icon context-menu-icon-quit';
        }
      }
    }
  });
})(jQuery);