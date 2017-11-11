// Smooth scrolling on navbar click
(function($) {
  "use strict";

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 20)
        }, 1000);
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#navbarResponsive',
    offset: 45
  });

})(jQuery); // End of use strict



function configurePageFromJson(){

    $.getJSON( "js/index.json", function( data ) {
        // Configure email
        $(".contact_email").attr("href", "mailto:" + data.contact_email);

        configureCarousel(data);
        configureMeetings(data);
    });
}

function configureMeetings(data){
	var meeting_template = "<p><b>#{name}s</b>: #{day}, #{time}, #{location}</p>";
	
	for(var i = 0; i < data.current_term_meetings.length; i++){
		var meeting = data.current_term_meetings[i];
		var meeting_div = meeting_template.replace("#{name}", meeting.name);
		meeting_div = meeting_div.replace("#{day}", meeting.day_of_week);
		meeting_div = meeting_div.replace("#{time}", meeting.time);
		meeting_div = meeting_div.replace("#{location}", meeting.location);
		$(meeting_div).appendTo("#meetings-wrapper");
	}
	
	$("#meetings-header").html(data.current_term_letter + ' Term ' + data.current_term_year + ' Schedule:');
}

function configureCarousel(data){
	var image_template = "<div class=\"carousel-item #{active}\"><img class=\"d-block w-100\" src=\"#{src}\" id=\"carousel-item-#{id_num}\"></div>";
	
	for(var i = 0; i < data.carousel_images.length; i++){
		var c_image = data.carousel_images[i];
		var c_image_div = image_template.replace("#{src}", c_image.src);
		c_image_div = c_image_div.replace("#{id_num}", i);
		if(i == data.carousel_active){
			c_image_div = c_image_div.replace("#{active}", "active");
		} else {
			c_image_div = c_image_div.replace("#{active}", "");
		}
		$(c_image_div).appendTo("#carousel-inner-div");
	}
}


window.onload = configurePageFromJson;