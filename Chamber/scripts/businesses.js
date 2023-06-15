$(document).ready(function() {
    // Load the data from JSON file
    $.getJSON('data.json', function(data) {
      // Iterate over each business in the JSON data
      $.each(data.businesses, function(index, business) {
        // Create a list item for each business in the list view
        var listItem = $('<li>').addClass(index % 2 === 0 ? 'even' : 'odd');
        
        // Create a span for the business information
        var infoSpan = $('<span>').addClass('business-info').append(
          $('<span>').addClass('business-name').text(business.name + ':'),
          $('<span>').addClass('business-address').text(business.address),
          $('<span>').addClass('business-phone').text(business.phone),
          $('<span>').addClass('business-website').append(
            $('<a>').attr('href', business.website).text(business.website)
          )
        );
        
        // Append the span to the list item
        listItem.append(infoSpan);
        
        // Append the list item to the business list
        $('#businessList').append(listItem);
        
        // Create a card for each business in the icon view
        var card = $('<div>').addClass('join-card icon-view');
    
        // Create a div for the business details
        var detailsDiv = $('<div>').addClass('business-details');
    
        // Create an image element for the business
        var image = $('<img>').attr('src', business.image).attr('alt', business.name);
        detailsDiv.append(image);
    
        // Create a paragraph for the business information
        var infoPara = $('<p>').html(
            '<b>' + business.name + '</b>' + ':' + '<br>' + '<br>' +
            business.address + '<br>' +
            business.phone + '<br>' +
            'Membership Level: ' + business.membershipLevel + '<br>' +
            '<a href="' + business.website + '">Webstite</a>'
        );
        detailsDiv.append(infoPara);
    
        // Append the details div to the card
        card.append(detailsDiv);
    
        // Add a click event listener to the card
        card.on('click', function() {
          // Toggle the display of the business details
          detailsDiv.toggle();
        });
    
        // Append the card to the icon view
        $('#businessIcons').append(card);
      });
    });
  
    // View toggle functionality
    $('#listViewBtn').addClass('active');
    $('.icon-view').hide();
  
    $('#listViewBtn').click(function() {
      $(this).addClass('active');
      $('#iconViewBtn').removeClass('active');
      $('.list-view').show();
      $('.icon-view').hide();
    });
  
    $('#iconViewBtn').click(function() {
      $(this).addClass('active');
      $('#listViewBtn').removeClass('active');
      $('.list-view').hide();
      $('.icon-view').show();
    });
  });