$(function() {
    chrome.runtime.sendMessage({method: "getCurrentUserInfo"}, function(response) {
        if (!$.isEmptyObject(response)) {
            $('.name').attr('href', 'http://vk.com/id' + response.id);
            $('.name').text(response.first_name + ' ' + response.last_name);
            $('.avatar').css("background-image", "url(" + response.photo_max + ")");
            $('.user-auth').hide();
        } else {
            $('.user-description').hide();
        }
    });

    $('.logout').click(function() {
        chrome.runtime.sendMessage({method: "logout"}, function(response) {
            location.reload();
        });
    });

    $('.auth').click(function() {
        chrome.runtime.sendMessage({method: "auth"}, function(response) {
            location.reload();
        });
    });

    $("#slider").slider({
      range: true,
        min: 14,
        max: 80,
        values: [14, 80],
        slide: function(event, ui) {
            $(".age-value").html(ui.values[0] + " - " + ui.values[1] + " лет");
            chrome.runtime.sendMessage({method: "changeAgeBounds", lowerbound: ui.values[0], upperbound: ui.values[1]});
        }
    });
    $(".age-value").html($( "#slider").slider("values", 0) + " - " + $("#slider").slider("values", 1) + " лет");

    chrome.runtime.sendMessage({method: "getDefaultState"}, function(response) {
        $('.chart-state :nth-child(' + (+response + 1) + ')').prop('selected', true);
    });

    $('.chart-state').change(function() {
        chrome.runtime.sendMessage({method: "changeDefaultState", stateIndex: $(".chart-state").prop('selectedIndex')}, function(response) {});
    });
});
