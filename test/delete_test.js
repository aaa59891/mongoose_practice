const assert = require('assert');
const User = require('../src/user');

describe('Delete a user', () => {
  let joe;
  beforeEach((done) =>{
    joe = new User({name: 'joe'});
    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) =>{
    joe.remove()
      .then(() => User.findOne({name: joe.name}))
      .then((user) => {
        assert(user === null)
        done();
      });
  });

  it('class method remove', (done) =>{
    // Remove a bunch of records with some given criteria
    User.remove({name: joe.name})
      .then(() => User.findOne({name: joe.name}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({name: joe.name})
      .then(() => User.findOne({name: joe.name}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({name: joe.name}))
      .then((user) => {
        assert(user === null);
        done();
      });
  })

});
