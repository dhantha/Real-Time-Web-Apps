var expect = require('expect');
var {generateMesseges, generateLocationMessages} = require('./message.js')

describe('generateMesseges', () => {
  it('should generate correct message object', () => {
      var from = 'Dhantha'
      var text = 'This is generate test'
      var message = generateMesseges(from,text);

      expect(typeof message.createdAt).toBe('number');
      expect(message).toMatchObject({from,text});
  });
});

describe('generateLocationMesseges', () => {
  it('should generate correct location object', () => {
    var from = 'Dhantha';
    var lat = 1;
    var lng = 1;
    var url = 'https://www.google.com/maps/q?1,1';

    var message = generateLocationMessages(from, lat, lng);
    expect(message).toMatchObject({from, url});

  });
});
