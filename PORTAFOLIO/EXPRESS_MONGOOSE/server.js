const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.set("debug", true);

require("dotenv").config();
const mongoUrl = process.env.MONGO_URI;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) =>
    console.error("Error connecting to MongoDB Atlas:", error)
  );

// Modelos de Mongoose
const Team = mongoose.model(
  "Team",
  new mongoose.Schema({
    name: String,
    nationality: String,
    url: String,
  })
);

const Driver = mongoose.model(
  "Driver",
  new mongoose.Schema({
    num: Number,
    code: String,
    forename: String,
    surname: String,
    dob: Date,
    nationality: String,
    url: String,
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null }, // Permitir null
  })
);


const loadCSVData = () => {
  fs.createReadStream(path.join(__dirname, "views", "f1_2023.csv"))
    .pipe(csv())
    .on("data", async (row) => {
      try {
        let team = null;
        if (row.team !== "N/A") {
          team = await Team.findOne({ name: row.team });
          if (!team) {
            team = new Team({ name: row.team });
            await team.save();
          }
        }

        const driver = new Driver({
          num: row.num,
          code: row.code,
          forename: row.forename,
          surname: row.surname,
          dob: new Date(row.dob),
          nationality: row.nationality,
          url: row.url,
          team: team ? team._id : null,
        });

        await driver.save();
      } catch (error) {
        console.error("Error processing row:", row, error);
      }
    })
    .on("end", () => {
      console.log("CSV data loaded successfully.");
    });
};

app.use(async (req, res, next) => {
  try {
    const teams = await Team.find({});
    const drivers = await Driver.find({}).populate("team");
    res.locals.teams = teams;
    res.locals.drivers = drivers;
    res.locals.countries = [
      { code: "ENG", label: "England" },
      { code: "SPA", label: "Spain" },
      { code: "GER", label: "Germany" },
      { code: "FRA", label: "France" },
      { code: "MEX", label: "Mexico" },
      { code: "AUS", label: "Australia" },
      { code: "FIN", label: "Finland" },
      { code: "NET", label: "Netherlands" },
      { code: "CAN", label: "Canada" },
      { code: "MON", label: "Monaco" },
      { code: "THA", label: "Thailand" },
      { code: "JAP", label: "Japan" },
      { code: "CHI", label: "China" },
      { code: "USA", label: "USA" },
      { code: "DEN", label: "Denmark" },
    ];
    next();
  } catch (error) {
    console.error("Error loading data:", error);
    next(error);
  }
});

app.post("/driver", async (req, res) => {
  try {
    // Validar si el equipo es válido
    const teamName = req.body.team;
    let team = null;

    if (teamName && teamName !== "N/A") {
      team = await Team.findOne({ name: teamName });
      if (!team) {
        console.error("Equipo no encontrado:", teamName);
        throw new Error("Invalid team ID or name");
      }
    }

    const newDriver = new Driver({
      num: req.body.num,
      code: req.body.code,
      forename: req.body.forename,
      surname: req.body.surname,
      dob: new Date(req.body.dob),
      nationality: req.body.nationality,
      url: req.body.url,
      team: team ? team._id : null, // Si no hay equipo, asigna `null`
    });

    await newDriver.save();
    console.log("Driver saved successfully:", newDriver);
    res.redirect("/");
  } catch (error) {
    console.error("Error saving driver:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
