/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {
  const renderTweets = function (tweets) {
    const markupArray = [];
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      markupArray.push(createTweetElement(tweet));
    }
    // takes return value and appends it to the tweets container
    $('#tweets-container').empty();
    $('#tweet-container').append(markupArray.reverse().join(''));

  }


  const createTweetElement = function (tweet) {
    let renderedTweet = `
    <article class="tweet">
      ${escape(JSON.stringify(tweet))} 
    </article>
  `
    return renderedTweet

  }

  // renderTweets(data);

  // $(document).ready(() => {
  //   //send/POST request to the server 
  //   $('.button').submit(function (event) {
  //     event.preventDefault()
  //     $.ajax('clients.js', { method: 'POST' })
  //       .then(function (tweetList) {
  //         console.log('Success: ', tweetList);
  //         $button.replaceWith.serialize(tweetList);
  //       })
  //   })
  // })

  const loadTweets = () => {
    $.ajax({
      url: '/tweets/',
      type: 'GET',
      dataType: 'json',
      success: response => {
        renderTweets(response);
      }
    })

  }

  loadTweets();

  //POST the text data to '/tweets/ route
  $('.new-tweet-form').submit(function (event) {
    event.preventDefault();

    if ($('#tweet-text').val().length !== 0 && $('#tweet-text').val().length <= 140) {
      $.ajax({
        url: '/tweets/',
        type: 'POST',
        data: $(this).serialize(),
        success: () => {
          console.log('worked');
          loadTweets();
        }
      })
    }
    .catch(err) {
      document.getElementById("demo").innerHTML = err.message;
    }
    
    if ($('#tweet-text').val().length === 0) {
      alert('Error: No content');
    }
    if ($('#tweet-text').val().length > 140) {
      alert('Error: Too long (more than 140)');
    }
    console.log('==========', event);
  });

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

});
