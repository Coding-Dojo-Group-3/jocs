const mongoose = require('mongoose');
const DB = "GroupProject"


mongoose.connect(`mongodb://localhost/${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Established a connection to the database: ${DB}`))
    .catch(err => console.log('Something went wrong when connecting to the database: ', err));