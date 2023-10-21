/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function(tweet) {
    const $tweet = `
      <article class="tweet">
        <header>
          <img class="avatar" src="${tweet.user.avatars}" />
          <h2 class="name">${tweet.user.name}</h2>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <div class="content">
          ${tweet.content.text}
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

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').append($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        renderTweets(data);
      },
      error: function(error) {
        console.error('Error fetching tweets:', error);
      }
    });
  };
  

  const $form = $('.tweet-form');
  $form.submit(function(event) {
    event.preventDefault();
    const tweetContent = $('#tweet-text').val();
    if (!tweetContent) {
      alert('Tweet content cannot be empty.');
      return;
    }
    if (tweetContent.length > 140) {
      alert('Tweet content exceeds the character limit.');
      return;
    }
    const formData = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: formData,
      success: function() {
        // Do something after the tweet is successfully posted
        console.log('Tweet was successfully posted!');
        loadTweets();
        // You may want to reload the tweets here if needed
        // or you can handle the new tweet insertion in a different way
      },
      error: function(error) {
        // Handle error if the tweet post request fails
        console.error('Error posting the tweet', error);
      }
    });
  });
  loadTweets(); 
});










// $(document).ready(function() {

// const data =[]

  
  

// // Function to create a tweet element
// const createTweetElement = function(tweetData) {
//   const $tweet = $(`
//   <article class="tweet">
//   <header>
//   <img src="${tweetData.user.avatars}" alt="User Avatar">
//   <h3 class="user-name">${tweetData.user.name}</h3>
//   <span class="user-handle">${tweetData.user.handle}</span>
//   </header>
//   <p class="tweet-content">${tweetData.content.text}</p>
//   <footer>
//   <span class="tweet-timestamp">${timeago.format(tweetData.created_at)}</span>
//   <div class="tweet-actions">
//   <i class="far fa-flag"></i>
//           <i class="far fa-heart"></i>
//           <i class="fas fa-retweet"></i>
//         </div>
//       </footer>
//     </article>
//   `);

//   return $tweet;
// };
// // Function to render tweets
// const renderTweets = function(tweets) {
// for (let tweet of tweets) {
//   const $tweet = createTweetElement(tweet);
//   $('#tweets-container').append($tweet);
// }
// };

// renderTweets(data);

// const loadTweets = function() {
//   $.ajax({
//     url: '/tweets',
//     method: 'GET',
//     dataType: 'json',
//     success: function(data) {
//       renderTweets(data);
//     },
//     error: function(error) {
//       console.error('Error fetching tweets:', error);
//     }
//   });
// };

// loadTweets();
// // Event listener for form submission
// $('form').submit(function(event) {
//   event.preventDefault(); // Prevent the default form submission

//   const serializedData = $(this).serialize(); // Serialize the form data

//   // AJAX POST request to send the serialized data to the server
//   $.ajax({
//     url: '/tweets',
//     method: 'POST',
//     data: serializedData
//   })
//     .done(function(response) {
//       // Handle the successful response
//       console.log('Data sent to the server successfully!', response);
//       console.log('data', data);
//     })
//     .fail(function(error) {
//       // Handle any errors that occur
//       console.error('Error sending data to the server!', error);
//     });
// });
// });

