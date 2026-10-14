// This script handles the mobile navigation menu toggle and smooth scrolling for anchor links
$(document).ready(
    function(){
        // when menu opens
        $(".menu-icon").click(
            function(){
                $("nav div").css("display", "block");
                $(".menu-icon").hide();
                $(".menu-close-icon").show();
            }
        );
        
        // when menu closes
        $(".menu-close-icon").click(
            function(){
                $("nav div").hide();
                $(".menu-close-icon").hide();
                $(".menu-icon").show();
            }
        );
        
        // animate when menu closes
        $('nav div a').on(
            'click',

            function(){
                $("nav div").hide();
                $(".menu-close-icon").hide();
                $(".menu-icon").show();
                
                var elem = $(this).attr("href");
                
                $('html, body').animate(
                    {
                        scrollTop: $(elem).offset().top - 70
                    },
                    
                    'slow'
                );
            }
        );
    }
);
