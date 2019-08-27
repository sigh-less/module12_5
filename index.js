'use strict';

function getUserRepos(searchUser, maxResults) {
    // takes user input and adds to URL
    const searchURL = `https://api.github.com/users/${searchUser}/repos`;
    // actual fetch of URL
    fetch(searchURL)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson, maxResults))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
    console.log(searchURL)
}

function displayResults(responseJson, maxResults) {
    // if there are previous results, remove them
    $('#results-list').empty();
    // iterate through the articles array, stopping at the max number of results
    console.log(responseJson)
    
    for (let i = 0; i < 10; i++){
    $('#results-list').append(
        `<li><h3><p>${responseJson[i].name}</p><a href="${responseJson[i].url}">${responseJson[i].url}</a></h3></li>`
      )};

    console.log("after loop");
    //display the results section  
    $('#results').removeClass('hidden');
  };

function watchForm() {
    console.log("App loaded.")
    $('form').submit(event=> {
        event.preventDefault();
        const searchUser = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getUserRepos(searchUser)
    });
}

$(watchForm);