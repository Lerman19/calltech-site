$(document).ready(function () {
  $("#contactForm").submit(function (event) {
    //event.preventDefault();
    var formData = {
      type: "contact",
      name: $("#name").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      message: $("#message").val(),
    };

    $.ajax({
      type: "POST",
      url: "email.php",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
      $("#name").val("");
      $("#email").val("");
      $("#phone").val("");
      $("#message").val("");

      // Alert the user that the message was sent
      alert("Your message has been sent!");
    });

    //event.preventDefault();
  });
});
