$(document).ready(function () {
  $(document).ready(function () {
    const $errorContainer = $(".error-message");
    $errorContainer.hide();

    const showError = function (message) {
      $errorContainer.html("&#9888; " + message + " &#9888;");
      $errorContainer.slideDown();
    };

    const hideError = function () {
      $errorContainer.slideUp();
    };

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const createTweetElement = function (tweet) {
      const $tweet = `
      <article class="tweet">
        <header>
        <div class="left-side">
          <img class="avatar" src="${escape(tweet.user.avatars)}" />
          <h2 class="name">${escape(tweet.user.name)}</h2>
        </div>
        <div class="right-side">
          <span class="handle">${escape(tweet.user.handle)}</span>
        </div>
        </header>
        <div class="content">
          ${escape(tweet.content.text)}
        </div>
        <footer>
          <span class="timestamp">${escape(
            timeago.format(tweet.created_at)
          )}</span>
          <div class="icons">
            <i class="fa fa-flag"></i>
            <i class="fa fa-retweet"></i>
            <i class="fa fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
      return $tweet;
    };

    const renderTweets = function (tweets) {
      for (let tweet of tweets) {
        const $tweet = createTweetElement(tweet);
        $(".tweets-container").prepend($tweet);
      }
    };

    const loadTweets = function () {
      $.ajax({
        url: "/tweets",
        method: "GET",
        dataType: "json",
        success: function (data) {
          renderTweets(data);
        },
        error: function (error) {
          console.error("Error fetching tweets:", error);
        },
      });
    };

    const $form = $(".tweet-form");
    $form.submit(function (event) {
      event.preventDefault();
      hideError();
      const tweetContent = $("#tweet-text").val();
      if (!tweetContent) {
        showError("Tweet content cannot be empty.");
        return;
      }
      if (tweetContent.length > 140) {
        showError("Tweet content exceeds the character limit.");
        return;
      }
      const formData = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
        success: function () {
          loadTweets();
          $("#tweet-text").val("");
        },
        error: function (error) {
          console.error("Error posting the tweet", error);
        },
      });
    });

    loadTweets();
  });
});
