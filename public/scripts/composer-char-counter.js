$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    // This event handler listens for any input in the tweet text area

    const textLength = $(this).val().length;
    // Calculates the length of the text currently entered in the tweet text area

    const remainingCharacters = 140 - textLength;
    const counter = $(this).closest(".new-tweet").find(".counter");
    // Finds the counter element within the nearest ancestor with the class 'new-tweet'

    counter.text(remainingCharacters);
    // Updates the text content of the counter element with the value of remainingCharacters

    if (remainingCharacters < 0) {
      // Checks if the remaining character count is less than 0
      counter.addClass("counter-exceeded");
      // If the character limit is exceeded, it adds a CSS class 'counter-exceeded' to the counter element
    } else {
      counter.removeClass("counter-exceeded");
      // If the character limit is not exceeded, it removes the CSS class 'counter-exceeded' from the counter element
    }
  });
});

