const User = require('./User');
const Note = require('./Note');

User.hasMany(Note, {
    foreignKey: 'user_id',
});

Note.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Note };