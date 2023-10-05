jQuery(document).ready(function() {

    function changeClimate(climate) {
        const baseVideoPath = './assets/video/';
        const baseAudioPath = './assets/audio/';
        console.log(climate);
        var video = $("#video-bg");
        video.children('source').each(function(){
            console.log($(this))
            let type = $(this)[0].type;
            let newPath = baseVideoPath + climate + "/" + climate + "-bg"
            if(type.includes('webm')){
                newPath += ".webm"
            } else if (type.includes('mp4')){
                newPath += ".mp4"
            }
            console.log(newPath);
            $(this)[0].src = newPath;
        });
        console.log(video);
        video[0].load();
        video[0].play();
    }

    // $(".vehicle-tile.closed").click(function (e) { 
    //     e.preventDefault();
    //     $(this).removeClass('closed');
    //     $(this).addClass('open');
    //     $(".climate-navigation-wrapper").addClass('active');
    //     $(".vehicle-content-wrapper").addClass('active');
    // });

    $(".close-button").click(function (e) { 
        e.preventDefault();
        $(".vehicle-tile.open").addClass('closed');
        $(".vehicle-tile.open").removeClass('open');
        
        $(".climate-navigation-wrapper").removeClass('active');

        $(".vehicle-content-wrapper").removeClass('active');
        $('.vehicle-content-wrapper').removeClass('climate-active');
        $('.vehicle-content-wrapper').removeClass('static');

        $('.hotspot-content-wrapper').addClass('closed');
        $('.fa-xmark').removeClass('fa-xmark').addClass('fa-location-dot')

    });

    $(".climate-button").click(function (e) {
        e.preventDefault();
        $('.hotspot').remove();
        var climate = $(this)[0].id.split('-')[0];
        var currentVehicle = $(".vehicle-tile.open")[0].id.split('-')[0];

        const baseVideoPath = './assets/video/' + currentVehicle + '/' + climate + '/';

        $('.vehicle-content-wrapper').removeClass(["altitude", "cold", "dry", "hot", "wet", "wind"]).addClass(climate);
        $('.vehicle-content-wrapper').addClass('climate-active');
        // $('.vehicle-content-wrapper').addClass(climate);
        $('.vehicle-content-wrapper').removeClass('static');

        var video = $("#video-bg");
        video.children('source').each(function(){
            let type = $(this)[0].type;
            let newPath = baseVideoPath + climate + "-bg";
            if(type.includes('webm')){
                newPath += ".webm";
            } else if (type.includes('mp4')){
                newPath += ".mp4";
            }
            $(this)[0].src = newPath;
        });
        video[0].load();
        video[0].play();

        // if("hot" == climate || "cold" == climate || "altitude" == climate){
        //     $('.vehicle-content-wrapper').addClass('static');
        // }

        $.getJSON("./assets/text/hotspots.json",
            function (data) {
                hotspotContentList = data[currentVehicle].climate[climate];
                $.each(hotspotContentList, function(key, value){
                    let hotspot_id = key;
                    let hotspot_title = value.title;
                    let hotspot_text = value.text;
                    let new_hotspot = $("<div/>", {
                        "class": 'hotspot',
                        id: hotspot_id,
                    });
                    $("<button class='hotspot-button'><i class='fa-solid fa-location-dot'></i></button>").appendTo(new_hotspot);
                    let new_hotspot_content_wrapper = $("<div/>",{
                        class: 'hotspot-content-wrapper closed'
                    })
                    $("<h2/>",{
                        text: hotspot_title
                    }).appendTo(new_hotspot_content_wrapper);
                    $("<p/>",{
                        text: hotspot_text
                    }).appendTo(new_hotspot_content_wrapper);

                    $(new_hotspot_content_wrapper).appendTo(new_hotspot);

                    $(new_hotspot).appendTo(".hotspot-container");
                    
                });
                $(".hotspot").on("click",".hotspot-button", function(){
                    e.preventDefault();
                    $(".hotspot-content-wrapper").not($(this).next()).addClass('closed');
                    $(this).next().toggleClass('closed');
                    
                    $('i.fa-xmark').not($(this)[0].childNodes[0]).toggleClass('fa-location-dot fa-xmark');
                    let hotspot_icon = $(this)[0].childNodes[0];
                    $(hotspot_icon).toggleClass('fa-location-dot fa-xmark');
                });
            }
        );
    });

    $(".hotspot-button").click(function (e) { 
        e.preventDefault();
        $(this).next().toggleClass('closed');

        let hotspot_icon = $(this)[0].childNodes[0];
        $(hotspot_icon).toggleClass('fa-location-dot fa-xmark');
    });

    
});