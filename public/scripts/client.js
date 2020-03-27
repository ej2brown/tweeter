/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {
// takes places rendered tweets  the page by calling itself right after
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
          const errorMessage =
          `<div class="error">
          <h1>Whoops, something went wrong!</h1>
          </div> `;
          $('#tweet-container').append(errorMessage);
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
    $('#tweet-container').append(markupArray.reverse().join(''));
  };

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // fetches tweet object and renders it
  const createTweetElement = function(objTweet) {
    const {name, avatars, handle} = objTweet.user;
    const {text} = objTweet.content;
    let {created_at} = objTweet;
    created_at = new Date(created_at).toString().slice(0, 25);
    const renderedTweet = `
    <article class="tweet">
    <h3><img src="${avatars}"> ${name} 
    <span class="handle">${handle}</span></h3>
    <p>${escape(text)}</p>
    <footer><span>${created_at}</span><span class="tweet-icons">
    <span>&#9873</span><span>&#128257</span><span>&#9829</span></span>
    </footer>
    </article>
    `;
    return renderedTweet;
  };


  $('.new-tweet-form').submit(function(event) {
    event.preventDefault();
    $('.error').hide();
    if ($('#tweet-text').val().length !== 0) {
      if ($('#tweet-text').val().length <= 140) {
        $.ajax({
          url: '/tweets/',
          type: 'POST',
          data: $(this).serialize(),
        })
            .then(() => {
              console.log('went through .then');
              loadTweets();
            })
            .catch(() => {
              console.log('went through .catch');
              $('#error').show().text('Whoops, something went wrong!');
            });
      }
    }


    if ($('#tweet-text').val().length === 0) {
      console.log('went through ===0');

      $('#error').show().text('Nothing to say? You gotta type in something!');
    }

    if ($('#tweet-text').val().length > 140) {
      console.log('went through length >140');

      $('#error').show().text('Woah, slow down! Include only 140 characters.');
    }
  });

  $('#hidden').hide();
  $('#toggle').click(function() {
    $('.new-tweet-container').slideToggle('slow', function() {
    });
  });
});
