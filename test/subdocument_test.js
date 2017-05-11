const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) =>{
    const joe = new User({
      name: 'joe',
      posts: [{title: 'PostTitle'}]
    });

    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      })
  });

  it('Can add subdocument to an existing record', (done) => {
    const joe = new User({
      name: 'joe',
      posts: []
    });
    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        user.posts.push({title: 'New Post'});
        return user.save();
      })
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'joe',
      posts: [{title: 'New title'}]
    });

    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        // just remove this instance, did not apply to database
        return user.save();
      })
      .then(() => User.findOne({name: 'joe'}))
      .then((user) =>{
        assert(user.posts.length === 0);
        done();
      });
  });
});
