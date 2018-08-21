window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

// resize and determine whether to center vertical (absolute) 
// or stick to top (relative)
function resize(selector) {
  var div = $(selector).height();
  var win = $(window).height();

  if (div > win ) {
    $("#text-container").removeClass('center');
  } else {
    $("#text-container").addClass('center');
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // download popup
  let html = `<div id="popup-container">
    <div id="popup-bg"></div>
    <div id="popup">
      <p>Thanks for your interest :)</p>
      <p>Enter your email and we'll send you the font!</p>
			<form class="subscribe-form">
					<br>
					<div class="subscribe-form-el">
							<input class="subscribe-form-input" type="text" placeholder="First name" name="firstname" value="">
							<input class="subscribe-form-input" type="text" placeholder="Last name" name="lastname" value="">
							<input class="subscribe-form-input" type="text" placeholder="your@email.com" name="email" value="">
					</div>
					<input class="subscribe-form-submit" type="submit" value="Submit">
					<br><br>
					<div class="subscribe-form-feedback"></div>
			</form>
    </div>
  </div>`
  $("main").append($(html));
  $("#popup-container").hide();

  // download btn
  $("#download").click(function() {
    $("#popup-container").show();
  });
  $("#popup-bg").click(function() {
    $("#popup-container").hide();
  });

  // Main textarea
  text = $("#text");

  // set font color or bw depending on browser
  if (isFirefox || isEdge) {
    text.css("font-family", "brand-new-roman");
    $("#about-header").css("font-family", "brand-new-roman");
  } else {
    text.css("font-family", "brand-new-roman-bw");
    $("#about-header").css("font-family", "brand-new-roman-bw");
    $("#color-warning").show();
  }

  // change text depending on mobile/desktop
  if (window.mobilecheck()) {
    text.attr("placeholder", "type here");
  } else {
    text.attr("placeholder", "Is this the\nAmerican Dream?");
  }

  // auto grow the text box to fit text
  text.autogrow();

  // each time a value is changed in the text box...
  text.each(function() {
    var elem = $(this);
   
    // Save current value of element
    elem.data('oldVal', elem.val());
   
    // Look for changes in the value
    events_str = "propertychange change click keyup input paste";
    elem.bind(events_str, function(event){
      resize('#text');
      // If value has changed...
      if (elem.data('oldVal') != elem.val()) {
        // Updated stored value
        elem.data('oldVal', elem.val());
        // Do action
        url_string = encodeURIComponent(elem.val())
        window.history.replaceState({ foo: "bar" }, 'Title', '/c/' + url_string);
      }
    });
  });


  const subscribe_url = '/subscribe';
  const subscribe_form = $(".subscribe-form");
  const subscribe_feedback_selector = '.subscribe-form-feedback';
  const subscribe_submit_selector = '.subscribe-form-submit';

  subscribe_newsletter(
    subscribe_url, 
    subscribe_form, 
    subscribe_feedback_selector,
    subscribe_submit_selector);
})

window.onload = function() {
  // trigger autogrow
  text = $("#text");
  text.html(text.html()+"!");
  text.trigger($.Event("keydown"));
  text.html(text.html().slice(0, -1));

  // trigger resize func
  resize('#text');
};
