# TrainScheduler

In the Add Train section, an admin can enter in a train name, destination, time that the train first departs, and the frequency of departure. Once the user hits submit, the data will be added to a real-time firebase database and I have used the "child-added" listener to the firebase database to understand when a new data set is available and if it is to retrieve it and print it to the page in the Current Train Schedule area.

The Current Train Schedule Area allows users to see data that they entered when the added the train such as its name, destination and frequency. However, in this section there are also 2 calculated fields "Next Arrival" and "Minutes Away" that are calculated using moment.js to understand what time it is now, what time the train should arrive based on when its first departure was and its frequency and finally telling the user how many minutes away the next departure is by knowing the current time and the time to the next train's departure.

Users can also sign in to the application via Google Sign-In.

Link to project: http://ricardobentin.github.io/TrainScheduler

Challenges: Google Authorization

How I overcame the challenges:
After reading the documentation and not getting far, I watched a video online that showed me how to run a function named login at page load via:

```javascript
window.onload = login;
```
Once I understood this, all I had to do was wrap my entire application around a function called app() and then pass user and call the function app() if someone successfully logs in. 

```javascript
//google authentication
function login() {
    //newLogin checks if a user exists, if it does the login happened and passes user to app function
    function newLogin(user) {
        if (user) {
            //login happened
            console.log("Sign In Successful")
            app(user);
        }
        //if a user does not exist, then we need to force the user to sign in via google
        else {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }

    }
    //this is a firebase listener for whenenver the "State" of a login changes
    firebase.auth().onAuthStateChanged(newLogin);
}
//function to log a user out
$("#logout").on("click", function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("Sign Out Successful");
    }).catch(function (error) {
        // An error happened.
        console.log("ERROR: Sign Out Failed");
    });
});
```
Notice that in the if statement for the newLogin function, if the user has logged in, then after "Sign In Sucessful" is logged in console, the function app is run with user as an argument that gets passed via the newLogin function. This will call app and let the user use the website. The user will not be able to do anything else on the site without logging in first.


Happy commuting!
