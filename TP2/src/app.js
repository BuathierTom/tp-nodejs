const app = require('./routes/index');
const port = 3000;
const { connectTodB } = require('./services/db/connection');

startServer()

function startServer() {
    connectTodB();
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}