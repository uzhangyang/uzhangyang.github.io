jQuery(document).ready(function($) {
    "use strict";
    watch($('.pace-progress'), 'width', function() {
        if (this.style.width > 99 + '%') {
            Pace.stop();
        };
    });
    
    
    /* ---------------------------------------------------------------------- */
    /* ------------------ SHUFFLE JS / PUBLICATION  ------------------------- */
    /* ---------------------------------------------------------------------- */
    
    var $mygrid = $('#mygrid');
    $mygrid.shuffle({
        itemSelector: '.publication_item',
        speed: 500
    });
    /* reshuffle when user clicks a filter item */
    $('#filter a').on('click', function (e) {
        e.preventDefault();
        // get group name from clicked item
        var groupName = $(this).attr('data-group');
        // reshuffle grid
        $mygrid.shuffle('shuffle', groupName);
    });
    $('#filtertag a').on('click', function (e) {
        e.preventDefault();
        // get group name from clicked item
        var groupNametag = $(this).attr('data-group-tag');
        // reshuffle grid
        $mygrid.shuffle('shuffle', groupNametag);
    });
    $mygrid.shuffle('shuffle', 'all');
    //sorting fonction
    $('.desc').on('click', function () {
        var sort = "date-publication",
            opts = {
                reverse: true,
                by: function ($el) {
                    return $el.data('date-publication');
                }
            }

        // Filter elements
        $mygrid.shuffle('sort', opts);
    });
    $('.asc').on('click', function () {
        var sort = "date-publication",
            opts = {
                reverse: false,
                by: function ($el) {
                    return $el.data('date-publication');
                }
            }

        // Filter elements
        $mygrid.shuffle('sort', opts);
    });

    
    $(document).ready(function(){
        
    var $divField = $('.divField');
    var $divField2 = $('.divField2');

    $divField.hide();
    $divField2.hide();

        $(".bibtex").click(function () {
           $divField.slideToggle();

           if ($divField2[0].style.display != "none") {
               $divField2.slideToggle();
           }
        })

        $(".res").click(function () {
            $divField2.slideToggle();

            if ($divField[0].style.display != "none") {
                $divField.slideToggle();
            }
        })
    });

    
    /* ---------------------------------------------------------------------- */
    /* -------------------------- RESEARCH SLIDER --------------------------- */
    /* ---------------------------------------------------------------------- */
    
    // Variables
    var currentSlide = 1,
        currentDate = $('.slide-wrapper .active').data("date"),
        slideName = $('div.slide'),
        totalSlides = slideName.length,
        slideCounter = $('.slide-counter'),
        sliderDate = $('.slide-date'),
        btnNext = $('a#btn-next'),
        btnPrev = $('a#btn-prev'),
        addSlide = $('a#add-slide');

    slideCounter.text(currentSlide + ' / ' + totalSlides);
    sliderDate.html('<span class="research-date-label"><i class="far fa-calendar-alt"></i>&emsp;Research Date : </span>' + currentDate);
    // Slide Transitions
    function btnTransition(button, direction) {
        $(button).on('click', function() {

            if (button === btnNext && currentSlide >= totalSlides) {
                currentSlide = 1;
            } else if (button === btnPrev && currentSlide === 1) {
                currentSlide = totalSlides;
            } else {
                direction();
            };
            currentDate = $(slideName).eq(currentSlide - 1).data("date");
            slideName.filter('.active').animate({
                opacity: 0,
                left: -40
            }, 400, function() {
                $(this)
                    .removeClass('active')
                    .css('left', 0);
                $(slideName)
                    .eq(currentSlide - 1)
                    .css({
                        'opacity': 0,
                        'left': 40
                    })
                    .addClass('active')
                    .animate({
                        opacity: 1,
                        left: 0
                    }, 400);
            });

            slideCounter.text(currentSlide + ' / ' + totalSlides);
            sliderDate.html('<span class="research-date-label"><i class="far fa-calendar-alt"></i>&emsp;Research Date : </span>' + currentDate);
        });
    };
    
    // Slide forward
    btnTransition(btnNext, function() {
        currentSlide++;
    });
    
    // Slide Backwards
    btnTransition(btnPrev, function() {
        currentSlide--;
    });
    
    
    /* ---------------------------------------------------------------------- */
    /* ------------------------- NEWS / RECENT ACTIVITY --------------------- */
    /* ---------------------------------------------------------------------- */
    $("#marquee").marquee();
    
    
    /* ---------------------------------------------------------------------- */
    /* --------------------------- MAGNIFIC POPUP --------------------------- */
    /* ---------------------------------------------------------------------- */
    
    $('.open_popup').magnificPopup({
        type: 'inline',
        midClick: true,
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        }
    });
    
    /* ---------------------------------------------------------------------- */
    /* ----------------------------- RESEARCH ------------------------------- */
    /* ---------------------------------------------------------------------- */
    
    $('.bar-percentage[data-percentage]').each(function() {
        var progress = $(this);
        var percentage = Math.ceil($(this).attr('data-percentage'));
        progress.text(percentage + '%');
        progress.siblings().children().css('width', percentage + '%');
    });
    
    
    /* ---------------------------------------------------------------------- */
    /* --------------------- SCROLL REINITIALISATION ------------------------ */
    /* ---------------------------------------------------------------------- */

    jQuery('.jspPane').bind('resize', function(e) {
        var pane = $('div.hs-content-wrapper > article')
        pane.jScrollPane({
            verticalGutter: 0,
            hideFocus: false,
            contentWidth: '0px'
        });
        var api = pane.data('jsp');
        api.reinitialise();

    });
    
    
    /* ---------------------------------------------------------------------- */
    /* ---------------------- ABOUT SECTION TOGGLE CARD --------------------- */
    /* ---------------------------------------------------------------------- */
    
    var menu_trigger = $("[data-card-front]");
    var back_trigger = $("[data-card-back]");

    menu_trigger.on('click', function() {
        $(".about-card").toggleClass("show-menu");
    });

    back_trigger.on('click', function() {
        $(".about-card").toggleClass("show-menu");
    });

    
    /* ---------------------------------------------------------------------- */
    /* ------------------------------- CONTACT ------------------------------ */
    /* ---------------------------------------------------------------------- */
    
    $("#submit_btn").on('click', function() {
        //get input field values
        var user_name = $('input[name=name]').val();
        var user_subject = $('input[name=subject]').val();
        var user_email = $('input[name=email]').val();
        var user_message = $('textarea[name=message]').val();

        var proceed = true;
        if (user_name == "") {
            $('input[name=name]').css('border-color', 'red');
            proceed = false;
        }
        if (user_subject == "") {
            $('input[name=subject]').css('border-color', 'red');
            proceed = false;
        }
        if (user_email == "") {
            $('input[name=email]').css('border-color', 'red');
            proceed = false;
        }
        if (user_message == "") {
            $('textarea[name=message]').css('border-color', 'red');
            proceed = false;
        }
        if (proceed) {
            //data to be sent to server
            var post_data = {
                'userName': user_name,
                'userSubject': user_subject,
                'userEmail': user_email,
                'userMessage': user_message
            };
            var output;
            //Ajax post data to server
            $.post('php/contact.php', post_data, function(response) {

                //load json data from server and output message     
                if (response.type == 'error') {
                    output = '<div class="error">' + response.text + '</div>';
                } else {
                    output = '<div class="success">' + response.text + '</div>';

                    //reset values in all input fields
                    $('#contact_form input').val('');
                    $('#contact_form textarea').val('');
                }

                $("#result").hide().html(output).slideDown().delay(4000).slideUp();
            }, 'json');

        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").on('keyup', function() {
        $("#contact_form input, #contact_form textarea").css('border-color', '');
        $("#result").slideUp();
    });
    
    
    /* ---------------------------------------------------------------------- */
    /* --------------------------- PLACEHOLDER ------------------------------ */
    /* ---------------------------------------------------------------------- */
    
    $('input, textarea').placeholder();
    
    
    /* ---------------------------------------------------------------------- */
    /* --------------------------- RESPONSIVE SIDEBAR ----------------------- */
    /* ---------------------------------------------------------------------- */
    
    var content = $('.hs-menu nav').contents();
    $('#my-panel').jScrollPane();
    $(window).bind("load resize", function() {
        if ($(window).width() <= 755) {
            $('#my-link').panelslider({
                side: 'left',
                clickClose: false,
                duration: 200
            });
            content.appendTo('#my-panel');
        } else {
            $.panelslider.close();
            content.appendTo('.hs-menu nav');
        }
        jQuery('.jspPane').bind('resize', function(e) {
            var pane = $('div.hs-content-wrapper > article')
            pane.jScrollPane({
                verticalGutter: 0,
                hideFocus: false,
                contentWidth: '0px'
            });
            var api = pane.data('jsp');
            api.reinitialise();
        });
    });
    
    
    /* ---------------------------------------------------------------------- */
    /* ------------------------------- RESIZE TAB --------------------------- */
    /* ---------------------------------------------------------------------- */
    
    
    
    /* ---------------------------------------------------------------------- */
    /* ---------------------- NAVIGATION ARROW KEYBOARD -------------------- */
    /* ---------------------------------------------------------------------- */
    
    $("body").on('keydown', function(e) {
        if (e.keyCode == 37) { // left
            $(".previous-page").click();
        } else if (e.keyCode == 39) { // right
            $(".next-page").click();;
        }
    });

    
    /* ---------------------------------------------------------------------- */
    /* ---------------------------- GOOGLE MAPS ----------------------------- */
    /* ---------------------------------------------------------------------- */
    
    $(".map-location").on('click', function() {
        //set your google maps parameters
        var latitude = 47.414470,
            longitude = 8.549526,
            map_zoom = 14;

        //google map custom marker icon - .png fallback for IE11
        var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
        var marker_url = (is_internetExplorer11) ? 'images/gmaps/cd-icon-location.png' : 'images/gmaps/cd-icon-location.svg';

        //define the basic color of your map, plus a value for saturation and brightness
        var main_color = '#2d313f',
            saturation_value = -20,
            brightness_value = 5;

        //we define here the style of the map
        var style = [{
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "stylers": [{
                "hue": "#00aaff"
            }, {
                "saturation": -100
            }, {
                "gamma": 2.15
            }, {
                "lightness": 12
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "lightness": 24
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "lightness": 57
            }]
        }]

        //set google map options
        var map_options = {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: map_zoom,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: style
            }
            //inizialize the map
        var map = new google.maps.Map(document.getElementById('google-container'), map_options);
        //add a custom marker to the map                
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            visible: true,
            icon: marker_url
        });

        //add custom buttons for the zoom-in/zoom-out on the map
        function CustomZoomControl(controlDiv, map) {
            //grap the zoom elements from the DOM and insert them in the map 
            var controlUIzoomIn = document.getElementById('cd-zoom-in'),
                controlUIzoomOut = document.getElementById('cd-zoom-out');
            controlDiv.appendChild(controlUIzoomIn);
            controlDiv.appendChild(controlUIzoomOut);

            // Setup the click event listeners and zoom-in or out according to the clicked element
            google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
                map.setZoom(map.getZoom() + 1)
            });
            google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
                map.setZoom(map.getZoom() - 1)
            });
        }

        var zoomControlDiv = document.createElement('div');
        var zoomControl = new CustomZoomControl(zoomControlDiv, map);

        //insert the zoom div on the top left of the map
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
    });


    /* ---------------------------------------------------------------------- */
    /* ---------------------- FIX OLD SAFARI BUGS  -------------------------- */
    /* ---------------------------------------------------------------------- */
    
    

});


$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip(); 
});

    /* ---------------------------------------------------------------------- */
    /* -------------------------- DROPDOWN FILTER  -------------------------- */
    /* ---------------------------------------------------------------------- */

     (function ($) {
        var cards = $(".card-drop"),
            toggler = cards.find(".toggle"),
            links = cards.find("ul>li>a"),
            li = links.parent("li"),
            count = links.length,
            width = links.outerWidth();
        links.parent("li").each(function (i) {
            $(this).css("z-index", count - i)
        });
        links.each(function () {
            $(this).css("box-shadow", "none")
        });

        function setClosed() {
            li.each(function (index) {
                $(this).css("top", index * 0).css("width", width - index * 0).css("margin-left", index * 2 / 2)
            });
            li.addClass("closed");
            toggler.removeClass("active")
        }
        setClosed();
        toggler.on("mousedown",
            function () {
                var $this = $(this);
                if ($this.is(".active")) {
                    setClosed();
                    links.each(function () {
                        $(this).css("box-shadow", "none")
                    })
                } else {
                    $this.addClass("active");
                    li.removeClass("closed");
                    links.each(function () {
                        $(this).css("box-shadow", "0px 1px 3px rgba(0, 0, 0, 0.1)")
                    });
                    li.each(function (index) {
                        $(this).css("top", 40 * (index + 1)).css("width", "100%").css("margin-left", "0px")
                    })
                }
            });
        links.on("click", function (e) {
            var $this = $(this),
                label = $this.data("label");
            li.removeClass("active");
            if ($this.parent("li").is("active")) $this.parent("li").removeClass("active");
            else $this.parent("li").addClass("active");
            toggler.children("span").text(label);
            links.each(function () {
                $(this).css("box-shadow", "none")
            });
            setClosed();
            e.preventDefault
        })


        var cardstag = $(".card-drop-tag"),
            togglertag = cardstag.find(".toggle"),
            linkstag = cardstag.find("ul>li>a"),
            litag = linkstag.parent("li"),
            counttag = linkstag.length,
            widthtag = linkstag.outerWidth();
        linkstag.parent("li").each(function (i) {
            $(this).css("z-index", counttag - i)
        });
        linkstag.each(function () {
            $(this).css("box-shadow", "none")
        });

        function setClosedtag() {
            litag.each(function (index) {
                $(this).css("top", index * 0).css("width", widthtag - index * 0).css("margin-left", index * 2 / 2)
            });
            litag.addClass("closed");
            togglertag.removeClass("active")
        }
        setClosedtag();
        togglertag.on("mousedown",
            function () {
                var $this = $(this);
                if ($this.is(".active")) {
                    setClosedtag();
                    linkstag.each(function () {
                        $(this).css("box-shadow", "none")
                    })
                } else {
                    $this.addClass("active");
                    litag.removeClass("closed");
                    linkstag.each(function () {
                        $(this).css("box-shadow", "0px 1px 3px rgba(0, 0, 0, 0.1)")
                    });
                    litag.each(function (index) {
                        $(this).css("top", 40 * (index + 1)).css("width", "100%").css("margin-left", "0px")
                    })
                }
            });
        linkstag.on("click", function (e) {
            var $this = $(this),
                labeltag = $this.data("label");
            litag.removeClass("active");
            if ($this.parent("li").is("active")) $this.parent("li").removeClass("active");
            else $this.parent("li").addClass("active");
            togglertag.children("span").text(labeltag);
            linkstag.each(function () {
                $(this).css("box-shadow", "none")
            });
            setClosedtag();
            e.preventDefault
        })
    })(jQuery);
