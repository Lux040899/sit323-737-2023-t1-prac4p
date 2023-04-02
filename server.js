const express =  require("express");
const res = require("express/lib/response");
const winston = require('winston');
const {format} = require('winston');
const app = express();

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

const add = (n1, n2) => {
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
app.get("/add", (req, res) => {
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


const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port " +port);
})