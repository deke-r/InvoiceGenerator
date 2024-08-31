const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://deker:Deker2468@cluster0.es0uzwa.mongodb.net/invoice_generator?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to db');
    })
    .catch((err) => {
        console.log('not connected to db');
        console.error(err);  
    });
