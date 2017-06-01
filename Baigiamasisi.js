var animationElements = $('.skill-progress');
var animationNumberContent = $('.number-content');
var win = $(window);
var acc = $('.accordion');

win.on('scroll', check_if_in_view);
win.on('scroll resize', check_if_in_view);
win.trigger('scroll');

var acc = document.getElementsByClassName("accordion");
var i;



$.ajax({
    type: "GET",
    dataType: "json",
    url: "Baigiamasis.json",
    success: function(data){
        applyValues($("#first-subscription"), data[0]);
        applyValues($("#second-subscription"), data[1]);
        applyValues($("#third-subscription"), data[2]);
    }
});
console.log("Baigiamasis.json")

function applyValues(dom, json){
    dom.find(".subscription-price").text(json.price);
    dom.find(".subscription-period").text(json.period);
    dom.find(".pricing-name").text(json.name);
    dom.find(".first-line").text(json.setup);
    dom.find(".second-line").text(json.websites);
    dom.find(".third-line").text(json.storage);
    dom.find(".fourth-line").text(json.bandwidth);
    dom.find(".fifth-line").text(json.support);
    dom.find(".sixth-line").text(json.subdomains);
}

$.each(acc,function(){
    var el = $(this);
    el.on("click", setAccordionsInactive);
    syncAccordion(this);
});


function toggleView(el){
    this.classList.toggle("active");
    syncAccordion(this);
}

function setAccordionsInactive(){
    var el = this
    $.each(acc,function(){
        if(el != this){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
        syncAccordion(this);
    });
}

function syncAccordion(el){
    var isActive = el.classList.contains("active");
    var panel = el.nextElementSibling;
    if(isActive){
        panel.style.maxHeight = panel.scrollHeight + "px";
    }else{
        panel.style.maxHeight = null;
    }
}

function check_if_in_view() {
    var windowHeight = win.height();
    var windowWidth = win.width();
    var windowTopPosition = win.scrollTop();
    var windowBottomPosition = (windowTopPosition + windowHeight);

    $.each(animationElements, function() {
        var el = $(this);
        var elementHeight = el.outerHeight();
        var elementTopPosition = el.offset().top;
        var elementBottomPosition = (elementTopPosition + elementHeight);

        if (((elementBottomPosition >= windowTopPosition) &&
            (elementTopPosition <= windowBottomPosition)) ||
            windowWidth < 960) {
            var pb = $(this).find(".skill-progress-bar");
            var val = pb.attr("aria-valuenow");
            pb.css("width", val + "%");
            var name = $(this).find(".pb-name");
            name.css("left", "0%");
            var pbVal = $(this).find(".pb-val");
            jQuery({ Counter: pbVal.text().slice(0,-1) }).animate({ Counter: val }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                    pbVal.text(Math.ceil(this.Counter) + "%");
                }
            });

        } else {
            var pb = $(this).find(".skill-progress-bar");
            pb.css("width", "0%");
            var name = $(this).find(".pb-name");
            name.css("left", "-25%");
            var pbVal = $(this).find(".pb-val");
            pbVal.text("0%");
        }
    });

    $.each(animationNumberContent, function() {
        var el = $(this);
        var elementHeight = el.outerHeight();
        var elementTopPosition = el.offset().top;
        var elementBottomPosition = (elementTopPosition + elementHeight);

        if (((elementBottomPosition >= windowTopPosition) &&
            (elementTopPosition <= windowBottomPosition)) ||
            windowWidth < 960) {

            $(this).css("bottom", "0px");
            $(this).css("opacity", "1");

            var noVal = $(this).find(".number-value");
            var targetVal = noVal.attr("data-val");

            jQuery({ Counter: noVal.text()}).animate({ Counter: targetVal}, {
                duration: 3000,
                easing: 'swing',
                step: function () {
                    noVal.text(Math.ceil(this.Counter));
                },
                complete: function(){
                    if(noVal.text() != targetVal){
                        noVal.text(targetVal);
                    }
                }
            });

        } else {
            $(this).css("bottom", "100px");
            $(this).css("opacity", "0");

            var noVal = $(this).find(".number-value");
            noVal.text("0");
        }
    });
}

//function send() {
//  var formEelm=$('#mySuperForm');
//var name = formElm.find('input['name=name']').val();
//var surName = formElm.find('input['name=surName']').val();

//var obj = {
//  name: name,
//surName: surName;
//};

//$post('www.google.lt', obj, function(data,status) {

//})
//}

$("#contact-form").submit(function(){
    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var message = $("#message").val();
    $.post("http://example.com/path/to/model", {
            name: name,
            email: email,
            subject: subject,
            message: message
        },
        function(){
            alert( "Handler for .submit() called." );
        },'json');
    event.preventDefault();
});

// MAP
function initMap() {
    var uluru = {lat: 55.7240304, lng: 21.1249861};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}



//DROPDOWN

$('ul.nav li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});

//SCROLL TO TOP
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//TOP NAV

var num = 38;

$(window).bind('scroll', function () {
    if ($(window).scrollTop() > num) {
        $('#myNavbar').addClass('fixed');
    } else {
        $('#myNavbar').removeClass('fixed');
    }
});