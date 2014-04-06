'use strict';

var request = require('request');

var stations;
var endpoint = 'http://www.bikesharetoronto.com/stations/json';

var lastupdate = null;

exports.updateStations = function() {
  console.log('updating stations');
  request.get(endpoint, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        stations = JSON.parse(body);
        if (stations.executionTime !== lastupdate) {
          // ping connected socket clients that there's new data.
          // TODO: socket pings
          console.log('got new data, pinging clients');
        }
        lastupdate = stations.executionTime;
      }
  });
};

/**
 * Get the station list.
 */
exports.stations = function(req, res) {
  res.send(stations);
};