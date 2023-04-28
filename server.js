import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Cards from './dbCards.js';

//App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
	'mongodb+srv://mohamedHussein:Ugbaad1234@cluster0.0rybzl2.mongodb.net/tinderdb?retryWrites=true&w=majority';
//MiddleWares
app.use(express.json());
app.use(cors());
//DB Config
mongoose.connect(connection_url);
//API Endpoints
app.get('/', (req, res) =>
	res.status(200).send('Hello I am The Server and I am running')
);
app.post('/tinder/cards', (req, res) => {
	const dbCard = req.body;
	Cards.create(dbCard).then((onfulfilled, onrejected) => {
		if (onrejected) {
			res.status(500).send(err);
		} else {
			res.status(200).send(onfulfilled);
		}
	});
});

app.get('/tinder/cards', (req, res) => {
	Cards.find().then((onfulfilled, onrejected) => {
		if (onrejected) {
			res.status(500).send(err);
		} else {
			res.status(200).send(onfulfilled);
		}
	});
});
//Listener
app.listen(port, () => console.log('App is listening on localhost: ' + port));
