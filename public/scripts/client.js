/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {

  const loadTweets = () => {
    $.ajax({
      url: '/tweets/',
      type: 'GET',
      dataType: 'JSON'
    })
      .then(response => {
        formatRenderTweets(response);
      })
      .catch(() => {
        const errorMessage =
          `<div class="error">
          <h1>Whoops, something went wrong!</h1>
          </div> `;
        $('#tweet-container').append(errorMessage);
      })
  
  }

  loadTweets();

  const formatRenderTweets = function (tweets) {
    const markupArray = [];
    // loops through tweets
    for (const tweet of tweets) {
      console.log(tweet);
      // calls createTweetElement for each tweet
      markupArray.push(createTweetElement(tweet));
    }
    
    // takes return value and appends it to the tweets container
    $('#tweets-container').empty();
    $('#tweet-container').append(markupArray.reverse().join(''));
    
  }
  
  
  const createTweetElement = function (objTweet) {
    const { name, avatars, handle } = objTweet.user;
    const { text } = objTweet.content;
    let { created_at } = objTweet;
    created_at = new Date(created_at).toString().slice(0,25)
    let renderedTweet = `
    <article class="tweet">
    <h3><img src="${avatars}"> ${name} <span class="handle">${handle}</span></h3>
    <p>${text}</p>
    <footer><span>${created_at}</span><span class="tweet-icons"> <span>&#9873</span><span>&#128257</span><span>&#9829</span></span></footer>
    </article>
    `
    // ${escape(JSON.stringify(tweet))} 
    return renderedTweet

  }


  $('.new-tweet-form').submit(function (event) {
    event.preventDefault();
    $('.error').hide();
    if ($('#tweet-text').val().length !== 0 && $('#tweet-text').val().length <= 140) {
     console.log('went through')
      $.ajax({
        url: '/tweets/',
        type: 'POST',
        data: $(this).serialize(),
      })
        .then(() => {
          console.log('went through .then')
          loadTweets();
        })
        .catch(() => {
          console.log('went through .catch')
          const errorMessage =
            `<div class="error">
            <h1>Whoops, something went wrong!</h1>
            </div> `;
          $('#tweet-container').append(errorMessage);
        })
    }


    if ($('#tweet-text').val().length === 0) {
      console.log('went through ===0')

      $(".error").show().text("Nothing to say? You gotta type in something!");
    }

    if ($('#tweet-text').val().length > 140) {
      console.log('went through length >140')

      $(".error").show().text("Woah, slow down there! Include only 140 characters ");
    }
  });

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
$("#hiddem").hide();
  $("#toggle").click(function () {
    $(".new-tweet-container").slideToggle("slow", function () {
    });
  });

});
