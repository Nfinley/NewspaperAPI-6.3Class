function ajaxQuery() {
    var apiKey = '88d7c2379a9c422e80de64853cd243b3';
    // article; begin date; end date;

    // returns: title, author, category, date, link

    var queryString = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
    var searchInput = $('#searchField').val();
    var searchData = {
        q: searchInput,
        'api-key': apiKey
    };
    var results;

    $.ajax({url: queryString, method: 'GET', data: searchData})
    .done(function(response) {
        console.log(response);
        console.log(response.response.docs[0].web_url);
        results = response.response.docs;

        for (i = 0; i < results.length; i++) {
        	var sectionDiv = $("<div>");
        	var title = $("<h3>").html(results[i].headline.main);
        	var author = $("<p>").html(results[i].byline.original);
        	var section = $("<p>").html("Section: " + results[i].section_name);
        	var time = $("<p>").html(results[i].pub_date);
        	var articleUrl = $("<a>").attr('href', results[i].web_url).html('Click here');

        	time.append(articleUrl);
        	section.append(time);
        	author.append(section);
        	title.append(author);
        	sectionDiv.append(title);
        	// append to HTML
        	$("#articles").append(sectionDiv);
        }
    });
}

$( document ).ready(function() {
    $('#searchButton').on('click', ajaxQuery);
});