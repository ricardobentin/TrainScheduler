# TrainScheduler

In the Add Train section, an admin can enter in a train name, destination, time that the train first departs, and the frequency of departure. Once the user hits submit, the data will be added to a real-time firebase database and I have used the "child-added" listener to the firebase database to understand when a new data set is available and if it is to retrieve it and print it to the page in the Current Train Schedule area.

The Current Train Schedule Area allows users to see data that they entered when the added the train such as its name, destination and frequency. However, in this section there are also 2 calculated fields "Next Arrival" and "Minutes Away" that are calculated using moment.js to understand what time it is now, what time the train should arrive based on when its first departure was and its frequency and finally telling the user how many minutes away the next departure is by knowing the current time and the time to the next train's departure.

Link to project: http://ricardobentin.github.io/TrainScheduler

Happy commuting!
