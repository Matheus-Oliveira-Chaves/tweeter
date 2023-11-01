$(document).ready(function () { 
  $(document).ready(function () { 
    const $errorContainer = $(".error-message"); 
    $errorContainer.hide(); 

    // Function to display the error message
    const showError = function (message) {
      $errorContainer.html("&#9888; " + message + " &#9888;"); // Displaying the error message with an icon
      $errorContainer.slideDown(); 
    };

    // Function to hide the error message
    const hideError = function () {
      $errorContainer.slideUp(); 
    };

    // Function to escape insecure text
    const escape = function (str) {
      let div = document.createElement("div"); // Creating a new div element
      div.appendChild(document.createTextNode(str)); // Appending the escaped text to the div
      return div.innerHTML; // Returning the escaped HTML
    };

    // Function to create a new tweet element
    const createTweetElement = function (tweet) {
      const $tweet = `
      <article class="tweet">
      <header>
        <div class="left-side">
          <img class="avatar" src="${tweet.user.avatars}" />
          <h2 class="name">${tweet.user.name}</h2>
        </div>
        <div class="right-side">
          <span class="handle">${tweet.user.handle}</span>
        </div>
      </header>
      <div class="content">
        ${escape(tweet.content.text)}
      </div>
      <footer>
        <span class="timestamp">${timeago.format(tweet.created_at)}</span>
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

    // Function to render tweets on the page
    const renderTweets = function (tweets) {
      $(".tweets-container").empty(); // Clearing the existing tweets container
      for (let tweet of tweets) {
        const $tweet = createTweetElement(tweet); // Creating the tweet element using the data
        $(".tweets-container").prepend($tweet); // Prepending the tweet to the tweets container
      }
    };

    // Function to load tweets from the server
    const loadTweets = function () {
      $.ajax({
        url: "/tweets",
        method: "GET",
        dataType: "json",
        success: function (data) {
          renderTweets(data); // Rendering the fetched tweets using the renderTweets function
        },
        error: function (error) {
          console.error("Error fetching tweets:", error); // Logging the error when fetching tweets
        },
      });
    };

    const $form = $(".tweet-form"); // Selecting the tweet form
    // Event listener for form submission
    $form.submit(function (event) {
      event.preventDefault(); // Preventing the default form submission behavior (reload page)
      hideError(); // Hiding the error container
      const tweetContent = $("#tweet-text").val(); // Getting the value of the tweet text area
      if (!tweetContent) {
        showError("Tweet content cannot be empty."); 
        return;
      }
      if (tweetContent.length > 140) {
        showError("Tweet content exceeds the character limit."); 
        return;
      }
      const formData = $(this).serialize(); 
      // Sending the new tweet data to the server
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
        success: function () {
          loadTweets(); // Reloading the tweets after successful submission
          $("#tweet-text").val(""); // Clearing the tweet text area
          $(".counter").text("140"); // Resetting the character counter
        },
        error: function (error) {
          console.error("Error posting the tweet", error); // Logging the error when posting the tweet
        },
      });
    });

    loadTweets(); // Initial loading of tweets on page load
  });
});
