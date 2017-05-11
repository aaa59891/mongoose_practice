const assert = require('assert');
const User = require('../src/user')

describe('Create records', () =>{
  it('saves a user', (done) =>{
    const joe = new User({ name: 'joe'});
    joe.save()
    .then(() =>{
      assert(!joe.isNew);
      done();
    });
  })
});
