var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username: { type: 'string', required: true },
    email: { type: 'string', lowercase: true, required: true, unique: true, trim:true, match: /@/},
    bio: { type: String },
    image: {type: String }

}, { timestamps: true });


// pre save hook
userSchema.pre('save', async function (next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    } next();
});


// To verify password 
userSchema.methods.verifyPassword = async function (password) {
    try {
        var result =  await bcrypt.compare(password, this.password);
        return result;
      } catch (err) {
        return err;
    }
};

// Generate token to authenticate the user
userSchema.methods.signToken = async function () {
    var payload = { userId: this._id, email: this.email };
    try {
        var token = await jwt.sign(payload, "thisisasecreat");
        return token;
    } catch (err) {
        throw err;
    }
}

userSchema.methods.userJSON = function(token) {
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        token: token,
    }
}

module.exports = mongoose.model('User', userSchema);