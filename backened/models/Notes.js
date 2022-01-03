
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


var notesSchema = new Schema({
    title: { type: String, unique: true },
    description: { type: String },
    tagList: [{ type: String }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },

}, { timestamps: true }
);

notesSchema.plugin(uniqueValidator, { message: 'is already taken' });

notesSchema.methods.toJSONFor = function(user) {
    return {
      id: this._id,
      title: this.title,
      description: this.description,
      body: this.body,
      tagList: this.tagList,
      
      favoritesCount: this.favoritesCount,
      author: {
        username: this.author.username,
        bio: this.author.bio,
        email: this.author.email,
        image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        
      }
    };
  };

module.exports = mongoose.model('notes', notesSchema);