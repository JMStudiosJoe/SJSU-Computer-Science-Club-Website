var offset; // The number of pixels from the top of the screen to the top of the tabs navigation bar. Used to determine when the bar should become fixed.
$(window).resize(function () { setOffset(); }); // The offset is reset every time the screen resizes, since the logo and fonts change size..

function scrollTo(id) { // Added in proper scrolling to tool.
    $('html, body').animate({
        scrollTop: $(id).offset().top - 50
    }, 1000);
}

function setOffset() { // Resetting the offset to get the pixels from the top of the screen to the top of the tabs navigation bar.
    var off = $("#tabsnav").offset().top;
    if (off != 0)
        offset = off;
}

function up(speed) { // Scroll to the offset. If at the offset, then scroll to the absolute top. If at the absolute top, scroll to offset.
    var amount = offset;
    if ($(window).scrollTop() <= offset)
        amount = 0;
    if ($(window).scrollTop() == 0)
        amount = offset;
    $("html, body").animate({
        scrollTop: amount
    }, speed);
    setOffset();
}

window.onscroll = function() { // Theck to see if the user has scrolled below the offset; if yes, then change the tab navigation to fixed, else make it relative again.
    if ($(window).scrollTop() > offset)
        $("#tabsnav").css({
            "position": "fixed",
            "top": "0",
            "left": "0",
            "z-index": "2",
            "width": $("#tabsnav").width() + "px",
            "margin-left": (($(window).width() - $("#tabsnav").width()) / 2) + "px"
        });
    else
        $("#tabsnav").removeAttr("style");
};

firebase.initializeApp({ // Initialization to use Firebase.
    apiKey: "AIzaSyC8yFGv6OUWan61bsVanCajkkBCN_wZwx4",
    authDomain: "sjsu-cs-club-website.firebaseapp.com",
    databaseURL: "https://sjsu-cs-club-website.firebaseio.com",
    storageBucket: "sjsu-cs-club-website.appspot.com",
});

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam)
            return sParameterName[1] === undefined ? true : sParameterName[1];
    }
    return "";
};

$(document).ready(function(){
    if (getUrlParameter('sub') == "true")
        Materialize.toast("Thank you for contacting us! We'll get back to you as soon as we can!", 10000, 'rounded');
});

/* =============== The Jquery Way of Loading Posts ================
firebase.database().ref('posts').on('value', function(snapshot) {
    var data = snapshot.val();
    var text;
    for (key in data) {
        text = "";
        for (post in data[key])
            text += '<br><br><div class="card z-depth-4"><div class="card-image"><img src="' + data[key][post].image + '"></div><div class="card-content"><h4 class="grey-text text-darken-4">' + data[key][post].title + '</h4><span class="card-title grey-text text-darken-4"><h5>' + data[key][post].summary + '</h5></span><p class="grey-text text-darken-4 flow-text">' + (new Date(post.eventTime).toLocaleString()) + '</p></div><div class="card-action"><h5 class="grey-text text-darken-4"><a target="_blank" href="https://www.google.com/maps/search/' + data[key][post].address + '">' + data[key][post].address + '</a></h5><p class="grey-text text-darken-4 flow-text">' + data[key][post].body + '</p></div></div>';
        $("#r" + key).html(text);
    }
});
*/

function loadTutors() { // Loads the tutors into the website.
    firebase.database().ref('tutors').on('value', function (snapshot) {
        var data = snapshot.val();
        var text = "";
        for (tutor in data)
            text += '<br><br><div class="card z-depth-4"><div class="card-image"><img src="' + data[tutor].image + '"></div><div class="card-content"><h4 class="grey-text text-darken-4">' + data[tutor].fname + " " + data[tutor].lname + '</h4><span class="card-title grey-text text-darken-4"><h5>' + data[tutor].title + '</h5></span></div><div class="card-action"><h5 class="grey-text text-darken-4"><a target="_blank" href="mailto:' + data[tutor].email + '">' + data[tutor].email + '</a></h5><p class="grey-text text-darken-4 flow-text">' + data[tutor].bio + '</p></div></div>';
        $("#rtutors").html(text);
        cleanUp(); // Cleans up the posts after all the posts and tutors are loaded.
    });
}

function cleanUp() { // Clean all posts to remove all the empty and invalid data sections.
    var del;
    $(".card-image").each(function(index) {
        if($(this).children('img').attr("src").indexOf("empty") == 0)
            $(this).hide();
    }); //All images that are empty are removed
    $(".card-content").each(function (index) {
        del = 0;
        if ($(this).children('h4').html() == "") {
            $(this).children('h4').hide();
            del++;
        }
        if ($(this).children('h5').html() == "") {
            $(this).children('h5').hide();
            del++;
        }
        if ($(this).children('p').html() == "") {
            $(this).children('p').hide();
            del++;
        }
        if (del > 2)
            $(this).hide();
    }); //Delete the card content if all elements have nothing
    $(".card-action").each(function (index) {
        del = 0;
        if ($(this).children('h5').children('a').attr("href") == "#") {
            del++;
            $(this).children('h5').hide();
        }
        if ($(this).children('p').html() == "") {
            del++;
            $(this).children('p').hide();
        }
        if (del > 1)
            $(this).hide();
    }); //Delete the card action if all elements have invalid data
    $(document.links).filter(function () {
        return this.hostname != window.location.hostname;
    }).attr('target', '_blank'); // All links that don't refer to the website will be opened in a new tab.
    addDisqus();
}

function addDisqus() {
    /*
    var disqus_config = function () {
        this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
    (function() {
        var d = document, s = d.createElement('script');
        s.src = 'http://sjsucsclub.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
    addFullCalendar();
}

function addFullCalendar() {
    $('#calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyAVUgKw_a2ObOmApl0qcNMmE0pKmK91fgs',
        events: 'sjsu.csclubpresident@gmail.com',
        eventClick: function (event) {
            console.log(event);
            Materialize.toast(event.title+", at "+event.location+" from "+moment(event.start._i).format("hh:mm:ss a")+" to "+moment(event.end._i).format("hh:mm:ss a")+".", 10000, 'rounded');
            if(event.description != undefined)
                Materialize.toast("<a href='" + event.url + "' target='_blank'>More Details: " + event.description + "</a>", 10000, 'rounded');
            else
                Materialize.toast("<a href='" + event.url + "' target='_blank'>More Details</a>", 10000, 'rounded');
            return false;
        },
        editable: false,
        handleWindowResize: true,
        displayEventTime: true,
        header: true,
        defaultView: 'agendaWeek',
        allDayText: 'All Day Events',
        columnFormat: {
            week: 'ddd'
        }
    });
    window.setInterval(function () {
        $('#calendar').fullCalendar('refetchEvents');
    }, 1000);
}

/*=================================================================================
Canvas Background Animation - DO NOT TOUCH!!!
=================================================================================*/

var animate = true;
var canvas = document.getElementById('draw');
var ctx = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H + 300;

var colors = [{
    r: 242,
    g: 231,
    b: 82
}, {
    r: 90,
    g: 26,
    b: 122
}, {
    r: 227,
    g: 205,
    b: 59
}, {
    r: 244,
    g: 240,
    b: 38
}, {
    r: 240,
    g: 219,
    b: 79
}, {
    r: 66,
    g: 26,
    b: 122
}, {
    r: 103,
    g: 0,
    b: 255
}, {
    r: 90,
    g: 10,
    b: 255
}, {
    r: 177,
    g: 122,
    b: 230
}, {
    r: 240,
    g: 209,
    b: 108
}];

window.requestAnimFrame = function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(c) {
            window.setTimeout(c, 1000 / 60);
        }
    );
}();

var squares = [];
var lastRender = Date.now();
var lastCreate = Date.now();

function render() {
    if (animate) {
        var timeDelta = new Date().getTime() - lastRender;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (Date.now() - lastCreate >= 112) {
            var sze = randr(20, 50);
            var color = colors[Math.floor(Math.random() * colors.length)];
            squares.push({
                width: sze,
                height: sze,
                vel: randr(50, 100), //pixs per second
                x: randr(-sze + 10, canvas.width - 10),
                y: randr(10, canvas.height - 10),
                age: 1,
                r: color.r,
                g: color.g,
                b: color.b
            });
            lastCreate = Date.now();
        }
        for (var i = 0; i < squares.length; i++) {
            var sq = squares[i];
            ctx.fillStyle = ["rgba(", sq.r, ", ", sq.g, ", ", sq.b, ",", (sq.age / 600), ")"].join("");
            ctx.fillRect(sq.x, sq.y, sq.width, sq.height);
            sq.y -= sq.vel / 1000 * timeDelta;
            sq.age++;
            if (sq.y + sq.height < 0) {
                squares.splice(i, 1);
                i--;
            }
        }
        lastRender = new Date().getTime();
    }
}

function randr(min, max) {
    return Math.random() * (max - min) + min;
}

function resize() {
    var he = window.innerHeight;
    var wi = window.innerWidth;
    canvas.height = he + 300;
    canvas.width = wi;
    if (window.devicePixelRatio == 2) {
        canvas.width = wi * 2;
        canvas.height = (he + 300) * 2;
        canvas.style.height = he + 300;
        canvas.style.width = wi;
        ctx.scale(2, 2);
    }
    if (wi < 975) {
        canvas.height = 0;
        canvas.width = 0;
    }
}

window.onresize = resize;
resize();

function toggleanim() {
    animate = !animate;
    lastRender = new Date().getTime();
}

(function loop() {
    requestAnimFrame(loop);
    render();
})();