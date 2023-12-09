$('#navigation a').on('click', function(e) {
  e.preventDefault();
  var hash = this.hash;
  $('html, body').animate({
    scrollTop: $(this.hash).offset().top
  }, 1000);
});


$('.toggler, .nav-content a:not(#dropdown-link)').on('click', function(){
  $('.toggler').toggleClass('change');
  $('.nav-content').slideToggle();
  $('#dropdown-menu').slideUp();
  $('.menu-overlay').toggle();
});

$('.nav-content .dropdown').on('click', function(){
  $('#dropdown-menu').slideToggle();
});

$('.menu-overlay').on('click', function(){
  $('.toggler').removeClass('change');
  $('.nav-content').slideUp();
  $('#dropdown-menu').slideUp();
  $('.menu-overlay').hide();
});

$("#contact input, #contact textarea").on('focusout', function(){

  var text_val = $(this).val();
  if (text_val === "") {
    $(this).removeClass('has-value');
  } else {
    $(this).addClass('has-value');
  }

});

document.addEventListener("DOMContentLoaded", function() {
  var slidesContainer = document.querySelector('.slides-container');
  var slides = document.querySelectorAll('.slide');
  var currentIndex = 0;
  var intervalId;
  var isMouseOver = false;

  // Función para mostrar el próximo slide y ocultar los demás
  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlideVisibility();
  }

  // Función para mostrar el slide anterior y ocultar los demás
  function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlideVisibility();
  }

  // Función para actualizar la visibilidad de los slides
  function updateSlideVisibility() {
    var transformValue = -currentIndex * 100 + '%';
    slidesContainer.style.transform = 'translateX(' + transformValue + ')';
  }

  // Funciones para pausar/reanudar el deslizamiento automático
  function handleMouseEnter() {
    isMouseOver = true;
    clearInterval(intervalId);
  }

  function handleMouseLeave() {
    isMouseOver = false;
    startAutoSlide();
  }

  function startAutoSlide() {
    if (!isMouseOver) {
      intervalId = setInterval(showNextSlide, 6000);
    }
  }

  // Agrega eventos de mouse para pausar/reanudar el deslizamiento automático
  slidesContainer.addEventListener('mouseenter', handleMouseEnter);
  slidesContainer.addEventListener('mouseleave', handleMouseLeave);

  // Inicia el deslizamiento automático
  startAutoSlide();

  // Funciones para botones de control manual
  window.prevSlide = showPrevSlide;
  window.nextSlide = showNextSlide;
});

$(function () {
  // Get the form.
  var form = $("#form");

  // Get the messages div.
  var formMessages = $("#form-messages");

  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: $(form).attr("action"),
      data: formData
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass("error");
        $(formMessages).addClass("success");

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $("#name").val("");
        $("#email").val("");
        $("#message").val("");
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass("success");
        $(formMessages).addClass("error");

        // Set the message text.
        if (data.responseText !== "") {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            "Oops! An error occured and your message could not be sent."
          );
        }
      });
  });
});