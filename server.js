const express =  require("express");
const bodyParser = require('body-parser');
const res = require("express/lib/response");
const winston = require('winston');
const {format} = require('winston');
const app = express();
const jwt = require("jsonwebtoken");
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// Define the secret for the JWT
const jwtSecret = 'my_secret_key';

// Define the users that are allowed to access the calculator
const users = [
  {
    id: 1,
    username: 'user1',
    password: 'password1'
  },
  {
    id: 2,
    username: 'user2',
    password: 'password2'
  }
];



// Configure passport to use JWT authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  const user = users.find(user => user.id === payload.sub);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
});

passport.use('jwt', jwtStrategy);



const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    defaultMeta: { service: 'user-service'},
    transports: [
        new winston.transports.File({filename: "error.log", level: "error"}),
        new winston.transports.File({filename: "file.log"}),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
}







function add (n1, n2) {
    return n1 + n2;
}

function subtract (n1, n2) {
    return n1 - n2;
}

function multiply (n1, n2) {
    return n1 * n2;
}

function divide (n1, n2) {
    return n1/n2;
}

app.use(bodyParser.json());

app.get("/add", passport.authenticate('jwt', { session: false }), (req, res) => {
    try{
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error ("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        if (n1 === NaN || n2 === NaN) {
            console.log();
            logger.error("Parsing Error");
            throw new Error("Parsing Error");
        }

        console.log("Parameters '+n1+' and '+n2+' received for addition");
        logger.info("Parameters '+n1+' and '+n2+' received for addition");

        const result = add(n1,n2);
        res.status(200).json({statuscocde:200, data: result }); 

    } catch(error) { 
        console.error(error);
        res.status(500).json({statuscocde:500, msg: error.toString() });
      }
})

app.get("/subtract", (req, res) => {
    try{
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error ("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        if (n1 === NaN || n2 === NaN) {
            console.log();
            logger.error("Parsing Error");
            throw new Error("Parsing Error");
        }

        console.log("Parameters '+n1+' and '+n2+' received for subtraction");
        logger.info("Parameters '+n1+' and '+n2+' received for subtraction");

        const result = subtract(n1,n2);
        res.status(200).json({statuscocde:200, data: result }); 
        
    } catch(error) { 
        console.error(error);
        res.status(500).json({statuscocde:500, msg: error.toString() });
      }
})


app.get("/multiply", (req, res) => {
    try{
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error ("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        if (n1 === NaN || n2 === NaN) {
            console.log();
            logger.error("Parsing Error");
            throw new Error("Parsing Error");
        }

        console.log("Parameters '+n1+' and '+n2+' received for multiplication");
        logger.info("Parameters '+n1+' and '+n2+' received for multiplication");

        const result = multiply(n1,n2);
        res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error);
        res.status(500).json({statuscocde:500, msg: error.toString() });
      }
})

app.get("/divide", (req, res) => {
    try{
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error ("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        if (n2==0) {
            logger.error("n2 cannot be 0");
            throw new Error("n2 cannot be 0");
        }

        if (n1 === NaN || n2 === NaN) {
            console.log();
            logger.error("Parsing Error");
            throw new Error("Parsing Error");
        }

        console.log("Parameters '+n1+' and '+n2+' received for division");
        logger.info("Parameters '+n1+' and '+n2+' received for division");
        
        const result = divide(n1,n2);
        res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error);
        res.status(500).json({statuscocde:500, msg: error.toString() });
      }
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      const payload = { sub: user.id };
      const token = jwt.sign(payload, jwtSecret);
      res.send({ token: token });
    } else {
      res.status(401).send('Unauthorized');
    }
});

const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port " +port);
})