'use strict';

var History = require('./history.model');
var axios = require('axios');

const config = {
  cx: process.env.GS_CX,
  key: process.env.GS_KEY
};

exports.search = function(req, res) {
  const endpoint = 'https://www.googleapis.com/customsearch/v1';
  let query = req.params.query;
  let offset = req.query.offset;

  let params = {
    searchType: 'image',
    key: config.key,
    cx: config.cx,
    q: query
  };

  if (offset) {
    params.start = offset + 1;
  }

  History.create({term: unescape(query)});

  axios.get(endpoint, {
    params
  }).then(response => {
    let results = response.data.items
      .map(item => {
        return {
          url: item.link,
          snippet: item.snippet,
          thumbnail: item.image.thumbnailLink,
          context: item.image.contextLink
        };
      });
    return res.status(200).json(results);
  }).catch(err => {
    let message = {error: {message: 'Please, try later'}};
    return res.status(err.status).json(message);
  });
};

exports.latest = function(req, res) {
  History.find({}, {_id: false, updatedAt: false})
    .sort({createdAt: -1}).exec()
    .then(terms => {
      let results = terms.map(term => {
        return {
          term: term.term,
          when: term.createdAt
        };
      });
      return res.status(200).json(results);
    })
    .catch(() => {
      let message = {error: {message: 'Please, try later'}};
      return res.status(500).json(message);
    });
};
