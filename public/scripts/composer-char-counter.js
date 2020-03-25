$(document).ready(function () {
  console.log('ready!');

  $("#tweet-text").on("input", function () {
    
    let remaining = Number($('.counter').text());
    console.log('remaining count', remaining);
    
    let charCount = this.value.length;
    console.log('text count', charCount);
    
    remaining = 140 - charCount;
    $('.counter').text(remaining);
    console.log('remaining is: ', remaining);
    
    if (remaining < 0) {
      console.log('under')
      $(" .counter").addClass("error"); 
    } else {
      $(" .counter").removeClass("error");  
    }
  });
})

