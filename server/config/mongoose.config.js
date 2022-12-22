const mongoose = require('mongoose');
// const DB = "GroupProject"


mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Established a connection to the database`))
    .catch(err => console.log('Something went wrong when connecting to the database: ', err));
