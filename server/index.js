const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listen on: http//127.0.0.0:${port}`));
