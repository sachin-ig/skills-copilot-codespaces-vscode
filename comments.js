// Create web server

// import modules
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

// set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up port
const port = 3000;

// set up server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// set up routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/comments', (req, res) => {
    // read comments.json
    fs.readFile(__dirname + '/comments.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // parse the data
            const comments = JSON.parse(data);
            // add new comment to comments array
            comments.push({
                name: req.body.name,
                comment: req.body.comment
            });
            // write new comments to comments.json
            fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 2), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('New comment added');
                }
            });
        }
    });
    // redirect to index.html
    res.redirect('/');
}); 