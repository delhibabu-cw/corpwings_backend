require('dotenv').config();
const { express, bodyParser, helmet, xss, morgan, cors } = require('./app/services/imports');
const app = express();


const { port } = require('./app/config/config');
const responseHandler = require('./app/middlewares/response-handler');

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());
app.use(xss());
app.use(responseHandler());

// Database connection
require('./db_connection');

// Test route
app.use('/demo', (req, res) => {
    return res.json({ msg: `Port successfully running on ${port}` });
});

// Routes
const rout = require('./app/routes/__index');
app.use('/api', rout);

// Start server
app.listen(port, () => {
    console.log(`Port successfully running on ${port}`);
});
