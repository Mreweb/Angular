(function ($) {
  'use strict';
  $.validator.setDefaults({
    submitHandler: function () {
      alert("ثبت شد !");
    }
  });
  $(function () {
    // validate the comment form when it is submitted
    $("#commentForm").validate({
      errorPlacement: function (label, element) {
        label.addClass('mt-2 text-danger');
        label.insertAfter(element);
      },
      highlight: function (element, errorClass) {
        $(element).parent().addClass('has-danger')
        $(element).addClass('form-control-danger')
      }
    });
    // validate signup form on keyup and submit
    $("#signupForm").validate({
      rules: {
        firstname: "required",
        lastname: "required",
        username: {
          required: true,
          minlength: 2
        },
        password: {
          required: true,
          minlength: 5
        },
        confirm_password: {
          required: true,
          minlength: 5,
          equalTo: "#password"
        },
        email: {
          required: true,
          email: true
        },
        topic: {
          required: "#newsletter:checked",
          minlength: 2
        },
        agree: "required"
      },
      messages: {
        firstname: "لطفا نام خود را وارد کنید",
        lastname: "لطفا نام خانوادگی خود را وارد کنید",
        username: {
          required: "لطفا نام کاربری خود را وارد کنید",
          minlength: "نام کاربری شما می بایست حداقل 2 کاراکتر باشد"
        },
        password: {
          required: "لطفا رمز عبور خود را وارد کنید",
          minlength: "رمز عبور شما نباید 5 کاراکتر باشد"
        },
        confirm_password: {
          required: "لطفا رمز عبور خود را وارد کنید",
          minlength: "رمز عبور شما نباید از 5 کاراکتر باشد",
          equalTo: "لطفا رمز عبور خود را وارد کنید"
        },
        email: "لطفا ایمیل خود را وارد کنید",
        agree: "لطفا گزینه موافقت با قوانین را تیک بزنید",
        topic: "لطفا حداقل 2 موضوع را انتخاب کنید"
      },
      errorPlacement: function (label, element) {
        label.addClass('mt-2 text-danger');
        label.insertAfter(element);
      },
      highlight: function (element, errorClass) {
        $(element).parent().addClass('has-danger')
        $(element).addClass('form-control-danger')
      }
    });
    // propose username by combining first- and lastname
    $("#username").focus(function () {
      var firstname = $("#firstname").val();
      var lastname = $("#lastname").val();
      if (firstname && lastname && !this.value) {
        this.value = firstname + "." + lastname;
      }
    });
    //code to hide topic selection, disable for demo
    var newsletter = $("#newsletter");
    // newsletter topics are optional, hide at first
    var inital = newsletter.is(":checked");
    var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
    var topicInputs = topics.find("input").attr("disabled", !inital);
    // show when newsletter is checked
    newsletter.on("click", function () {
      topics[this.checked ? "removeClass" : "addClass"]("gray");
      topicInputs.attr("disabled", !this.checked);
    });
  });
})(jQuery);