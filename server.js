const express = require('express');
const bodyParser = require('body-parser'); 
const PORT = 5000;

const app = express();

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());

const productRoutes = require('./routes/products.js');

const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.ucbyb.mongodb.net/tddAppDB?retryWrites=true&w=majority', 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true  
    }
)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT);

console.log(`Running on Port ${PORT}`);