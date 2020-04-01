/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {
  // takes places rendered tweets the page by calling itself right after
  const loadTweets = () => {
    $.ajax({
      url: '/tweets/',
      type: 'GET',
      dataType: 'JSON',
    })
        .then((response) => {
          formatRenderTweets(response);
        })
        .catch(() => {
          $('#error').show().text('Whoops, something went wrong!');
        });
  };

  loadTweets();


  // appends an formated array into the tweet container
  const formatRenderTweets = function(tweets) {
    const markupArray = [];
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      markupArray.push(createTweetElement(tweet));
    }

    // appends value to the tweets container reverse chronological order
    $('#tweets-container').empty();
    $('#tweet-container').html(markupArray.reverse().join(''));
  };

  const escape = function(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // fetches tweet object and renders it
  const createTweetElement = function(objTweet) {
    const {name, avatars, handle} = objTweet.user;
    const {text} = objTweet.content;
    const {created_at} = objTweet;
    const createdDay = new Date(created_at).toString().slice(3, 15);
    const createdTime = new Date(created_at).toString().slice(16, 25);

    const renderedTweet = `
    <article class="tweet">
      <h3><img src="${avatars}"> ${name} 
        <span class="handle">${handle}</span></h3>
      <p>${escape(text)}</p>
      <footer><span>${createdDay} at ${createdTime}</span>
        <span class="tweet-icons">
        <span>&#9873</span><span>&#128257</span><span>&#9829</span></span>
      </footer>
    </article>
    `;
    return renderedTweet;
  };

  const tweetIsValid = () => {
    const charCount = $('#tweet-text').val().length;
    if (charCount === 0) {
      $('#error').show().text('Nothing to say? You gotta type in something!');
      return false;
    }
    if (charCount > 140) {
      $('#error').show().text('Woah, slow down! Only include 140 characters.');
      return false;
    }
    return true;
  };

  $('.new-tweet-form').submit(function(event) {
    event.preventDefault();
    $('#error').hide();
    if (tweetIsValid()) {
      $.ajax({
        url: '/tweets/',
        type: 'POST',
        data: $(this).serialize(),
      })
          .then(() => {
            $('.new-tweet-container').slideToggle('slow', function() {
              loadTweets();
            });
          })
          .catch(() => {
            $('#error').show().text('Whoops, something went wrong!');
          });
    }
  });

  $('#hidden').hide();
  $('#toggle').click(function() {
    $('.new-tweet-container').slideToggle('slow', function() {
    });
  });
});
