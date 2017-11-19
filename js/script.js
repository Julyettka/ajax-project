
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request.
    //.ajax() && .getJSON()
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetVal = $('#street').val();
    var cityVal = $('#city').val();
    var address = streetVal + ', ' + cityVal;
    var streetviewUrl =
    'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address;
    $greeting.text('So, do you want to live at ' + address + '?');
    $body.append('<img class="bgimg" src="' + streetviewUrl + '"> ' );

    // API call NYTimes
    var nyUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q ='
    + cityVal + '&sort=newest&api-key=37bf624c5a0f4d20b289f682205aa9c8';
    $.getJSON(nyUrl, function(data){
        $nytHeaderElem.text('What we find about ' + cityVal);
        var artciles = data.response.docs;
        artciles.forEach((article)=>{
            $nytElem.append('<li class="article"><a href="' + article.web_url + '">' +
             article.headline.main + '</a><p>'+ article.snippet +'</p></li>')
        })

    }).error(function(e){
        $nytHeaderElem.text("Opps, cannot find information")
    });
    //$nytHeaderElem.html().toUpperCase(); doesn't work()

     // API call Wiki
     var wikiRequest = setTimeout(function(){
        $wikiElem.text('Failed to get wikipedia results');
     }, 8000);

     var wikiUrl ='https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
     cityVal + '&format=json&callback=wikiCallback';
     $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function(response){
            var list = response[1];
            list.forEach((list)=>{
                var listUrl = 'http://en.wikipedia.org/wiki/' + list;
                $wikiElem.append('<li><a href="' + listUrl + '">' +
             list + '</a></li>')
            })
            clearTimeout(wikiRequest);
        }
     })

    return false;
};

$('#form-container').submit(loadData);
