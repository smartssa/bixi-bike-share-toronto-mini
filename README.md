bixi-bike-share-toronto-mini
============================

You can view a live demo here (Currently broken, needs SSL for location to work now): http://bikes.darrylclarke.com/

a miniaturized, real-time-ish, bike share toronto (formerly bixi) utility app.

More useful, less features. Less is more.

* Geo-sorted list of bike stations
* Favourites on top (currently stored as cookies)
* Live updates handled by a socket connection
* Node.js server handles the updates from Bike Share so we don't hammer it

Built with angular, node.js, socket.io and some other things.

TODO:
* Add socket.io for realtime data change notifications
* Clean up the layout a bit
* Add Tests
* Add more awesomeness.
