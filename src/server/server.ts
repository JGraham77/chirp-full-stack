import * as express from 'express';
import * as path from 'path';
import routes from './routes';

const app = express ();
app.use(express.json());
app.use(express.static('public'));

app.use('/api', routes);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")));

app.listen(3000, () => console.log("Surf's up at port 3000!"));