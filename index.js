const { app, dotenv, morgan, bodyParser, helmet, xss, cors } = require('./app/services/imports');

dotenv.config();
const config = require('./app/config/config');
const responseHandler = require('./app/middlewares/response-handler');
// const { jobApplication } = require('./app/controllers');

// Define env values
dotenv.config();
console.log(process.env.PORT);

// Database connection
require('./db_connection');


// ✅ Enable CORS
app.use(cors({
  origin: "*", // Allow all origins (change "*" to your frontend URL for better security)
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// Response handler middleware
app.use(responseHandler());

// Log the HTTP requests
app.use(morgan('tiny'));

// Using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Adding Helmet to enhance API security
app.use(helmet());

// Sanitize request data to prevent XSS attacks
app.use(xss());

// app.get("/", (req, res) => {
//   res.json({ message: "Hello world From Backend" });
// });

// Load API routes
const router = require('./app/routes/__index');
app.use('/', router);

// Sample API endpoint
// app.get('/auth/demo', (req, res) => {
//   res.created({ msg: 'Request successful', statusCode: 200 });
// });

// app.get('/jobApply/:id?', jobApplication.getJobApplication)


// Start the server
const port = config.port;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
