$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const charCount = $(this).val().length;
    const counter = $('.counter');
    $('.counter').text(140 - charCount);
    if (charCount > 140) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#545149');
    }
  });
});
