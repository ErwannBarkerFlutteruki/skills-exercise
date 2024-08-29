# Skills Assessment task

This task comes with a mock API and WebSocket server that represents a snapshot of some live football events we offer betting on at Sky Bet.

The challenge is to build a lightweight application to display the events returned by the API and enable users to browse for more details and betting opportunities.

API documentation (sportsbook): https://hub.docker.com/r/sbgtechtest/api/

## The Task

We realise everyone has different levels of skill and experience when it comes to development so we have listed different levels of tasks below for you to choose from. If you do not have the time or the knowledge to complete them all then that's ok, we just want to see how you approach the problem and get a feel for how you code.

> We have structured the test below with what we consider to be a sensible way of building up the application iteratively and sequentially. You are free to work on as many or as few of the subtasks (and in any order) that you feel showcases your capabilities best

### Task One

Using the provided WebSocket API:
1. Build an application which displays the currently live Football events. An example of making this request is shown below.
2. Add an option to show the primary market for each of the events
   1. The primary market should also result in the odds showing for any outcomes linked to the market
3. Add a feature to toggle the odds display between fractional and decimal (this should apply globally to any place in the app where odds are shown)

```javascript
// The WebSocket API responds to several different actions: getEvent, getMarket, getOutcome and getLiveEvents
// To fetch all the currently live events (without primary markets) you can do something similar to the below
// NB. All payloads to the WebSocket API should be stringified
websocket.send(JSON.stringify({type: "getLiveEvents", primaryMarkets: false}));
```

### Task Two

1. Add a feature to allow users to browse for full details for one of the events (this may be a new page or some other mechanic)
    1. Use as much of the detail in the Event response as possible to inform the user of meta data such as event type, start time and scores
2. Event responses sent via the WebSocket only include an array of IDs for the markets it includes. Use the Event payload to build further queries to the API so you can show a list of all the markets available for the event.
3. Markets similarly contain an array of IDs for outcomes. Use this data to initially show the outcomes for the first ten markets only.
   1. Markets should be sorted by displayOrder (ascending) and then name.
4. Add the ability to load the outcomes for a market on demand (on skybet.com this happens when the market's accordion is clicked)
5. Use the `displayable` status to filter events, markets and outcomes which should not be shown to the user

### Task Three

1. Use the ability to subscribe to updates for events, outcomes and markets of interest. Handle these updates so that the UI correctly reflects any changes to data currently being displayed on the page.
   1. Use the included images to help understand what `status.suspended` implies for the User.
   2. Consider how the different levels of subscription affect the data received via the WebSocket.
2. On the overview page, instead of showing all events in one list, group them by their `linkedEventTypeName` property. A missing value should cause the grouping to fall back to the `typeName` property.
    1. Additionally, anywhere you are displaying full details of an event, where possible use the `linkedEventTypeName` to highlight the competition the event belongs to.
3. Add support for displaying markets with different types (i.e. `win-draw-win` and `correct-score`) with more appropriate layouts. (See the [live website](https://m.skybet.com) for inspiration.)
4. Allow the user to click on outcomes to add them to a bet slip. The bet slip should display enough information about the selected outcome for the user to be able to see the event name, market name, outcome name and odds.
5. Manage WebSocket subscriptions to allow the bet slip to listen for updates to selected outcomes and markets as and when they change, and invalidate selections as appropriate.

## Languages

This is a "client side" focused test so the end deliverable should be viewable as a standard website. You will be coding in Javascript using the React and typescript libraries.

## Review Criteria

At a high level we will be looking for:
* Good understanding of the tasks undertaken and content presented in a clear, understandable format
* Well structured code
* High quality code that uses relevant design patterns
* Appropriate unit tests
* Security best practices applied
* Good understanding of errors and how to handle them


## Getting Started
install your dependencies in the root dir
```
# run the websocket API using docker compose in the root folder
yarn start

```
In a different terminal, you now need to run the React code
```
cd client;
yarn start; #this will run in dev mode, updating the website when a file save is detected
```
See package.json in client directory for more useful commands, such as running tests.

If you're not getting any data from the websocket, you may need to run `yarn start` from the root directory, this will need to be re-ran per code change.
### System Requirements

* Docker
* ASDF (see .tools-version file for correct version of JS to)

### Running the API and Websocket Server

The WebSocket Server will be available on `ws://localhost:8889` and you can test this is working by subscribing to all outcome updates:

```javascript
// In your browser's console add the following one line at a time
const w = new WebSocket("ws://localhost:8889");
w.addEventListener("message", m => console.log(JSON.parse(m.data)));
w.send(JSON.stringify({type: "subscribe", keys: ["o.*"]}));
w.send(JSON.stringify({type: "getLiveEvents", primaryMarkets: false }));
```
