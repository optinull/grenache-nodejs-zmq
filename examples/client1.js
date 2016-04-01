'use strict'

var _ = require('lodash')
var Base = require('grenache-nodejs-base')
var Client = require('./../lib/Client')

var link = new Base.Link({
  grape: 'ws://127.0.0.1:30001'
})
link.start()

var client = new Client(link, {})
var service = client.listen('req', 'tcp://127.0.0.1:5000')

setInterval(function() {
  client.grape.announce('test', service.port, {}, () => {
    console.log('announced')
  })
}, 1000)

service.on('request', (rid, type, payload, handler) => {
  console.log('HERE', rid, type, payload)
  handler.reply('world')
})
