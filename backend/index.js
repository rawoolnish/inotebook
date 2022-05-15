require('./db');
const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());


//Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));





app.listen(port, () => {
    console.log(`iNotebook is listenning on the port http://localhost:${port}`)
})