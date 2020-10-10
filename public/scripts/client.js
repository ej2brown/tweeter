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

    const renderedTweet = `
    <article class="tweet">
      <h3>
        <img src="${avatars}"> 
        ${name} 
        <span class="handle">${handle}</span>
      </h3>
      <p>${escape(text)}</p>
      <footer>
        <span>${moment(created_at).fromNow()}</span>
        <span class="tweet-icons">
          <i class="far fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="far fa-thumbs-up"></i>
      </footer>
    </article>
    `;
    return renderedTweet;
  };

  const tweetIsValid = () => {
    const charCount = $('#tweet-text').val().length;
    if (charCount === 0) {
      $('#error').slideDown('slow', function() {
        $('#error').show().text('Nothing to say? You gotta type in something!');
        $('#error').prepend('<i class="fa fa-exclamation-triangle"></i>');
      });
      return false;
    }
    if (charCount > 140) {
      $('#error').slideDown('slow', function() {
        $('#error').show().text('Woah, slow down! Only include 140 characters.');
        $('#error').prepend('<i class="fa fa-exclamation-triangle"></i>');
      });
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
        data: $(this).serialize(), // this = event.target
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
