const express = require("express");
const bodyParser = require("body-parser");
const open = require("open");

const app = express();
const port = process.env.port || 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/car", router);

//GET REQUEST
router.get("/", (req, res) => {
    res.json(cars);
});

router.get("/:id", (req, res) => {
    const carID = req.params.id;
    const currentCar = cars.find((car) => car.id == carID);
    if(currentCar) {
        res.json(currentCar);
    }else {
        res.sendStatus(404);
    }
});

//POST REQUESTS
router.post("/", (req, res) => {
    const postCar = req.body;
    const isValid = isValidCar(postCar) && !cars.find((a) => a.id == postCar.id);
    if(isValid) {
        cars.push(postCar);
        res.send(postCar);
    }else {
        res.sendStatus(500);
    }
});

//PUT REQUEST
router.put("/:id", (req, res) => {
    const carID = req.params.id;
    const currentCar = cars.find((car) => car.id ==carID);
    if(currentCar){
        const putCar = req.body;
        const isValid = isValidCar(putCar);
        if(isValid){
            currentCar.name = putCar.name;
            currentCar.make = putCar.make;
            currentCar.country = putCar.country;
            currentCar.topSpeed = putCar.topSpeed;
            res.sendStatus(204);
        }else{
            res.sendStatus(404);
        }
    }
});

//DELETE REQUEST
router.delete("/:id", (req, res) =>{
    const carID = req.params.id;
    const currentCar = cars.findIndex((car) => car.id == carID);
    if(currentCar !== -1){
        cars.splice(currentCar, 1);
        res.sendStatus(204);
    }else{
        res.sendStatus(404);
    }
});

const cars = [
    {
        id: 1,
        make: "Ferrari",
        country: "Italy",
        topSpeed: 200
    }
]

function isValidCar(car){
    return "id" in car && "make" in car && "country" in car && "topSpeed" in car;;
}

app.listen(port, (err) => {
    if (err) { console.log(err); }
    else { open(`http://localhost:${port}`) }
});
