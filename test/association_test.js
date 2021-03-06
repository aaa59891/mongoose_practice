const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations test', () =>{
  let joe, blogPost, comment;

  beforeEach((done) =>{
      joe = new User({name: 'joe'});
      blogPost = new BlogPost({title: 'JS is great', content: "blog post content"});
      comment = new Comment({content: "comment content"});

      joe.blogPosts.push(blogPost);
      blogPost.comments.push(comment);
      comment.user = joe;

      Promise.all([joe.save(), blogPost.save(), comment.save()])
        .then(() => done());
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({name: 'joe'})
      .populate('blogPosts') // field name
      .then((user) =>{
        assert(user.blogPosts[0].title === 'JS is great');
        done();
      })
  });

  it('saves a full relation tree', (done) => {
    User.findOne({name: 'joe'})
      .populate({
        path: 'blogPosts',
        populate: {
            path: 'comments',
            model: 'comment',
            populate:{
              path: 'user',
              model: 'user'
            }
        }
      })
      .then((user) =>{
        assert(user.name === joe.name );
        assert(user.blogPosts[0].title === blogPost.title);
        assert(user.blogPosts[0].comments[0].content === comment.content);
        assert(user.blogPosts[0].comments[0].user.name === joe.name);
        done();
      });
  });
});
