$(document).ready(function() {
  // console.log('ready!');

  $('#tweet-text').on('input', function() {
    let remaining = Number($('.counter').text());
    const charCount = this.value.length;

    remaining = 140 - charCount;
    $('.counter').text(remaining);

    if (remaining < 0) {
      $(' .counter').addClass('error');
    } else {
      $(' .counter').removeClass('error');
    }
  });
});

