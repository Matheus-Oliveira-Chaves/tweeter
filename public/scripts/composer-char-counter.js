$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    const textLength = $(this).val().length;
    const remainingCharacters = 140 - textLength;
    const counter = $(this).closest(".new-tweet").find(".counter");

    counter.text(remainingCharacters);

    if (remainingCharacters < 0) {
      counter.addClass("counter-exceeded");
    } else {
      counter.removeClass("counter-exceeded");
    }
  });
});
