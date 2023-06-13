const express = require("express");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/get_location", (req, res) => {
    const query = req.query;
    const company_api_key = query.company_api_key;
    if (company_api_key){
        db.serialize(() => {
            db.all("SELECT * FROM Company WHERE company_api_key = ?", [company_api_key], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({error: err.message});
                    return;
                }
                if (rows.length > 0){
                    if (query && query.company_id){
                        db.serialize(() => {
                            db.all("SELECT * FROM Location WHERE company_id = ?", [query.company_id], (err, rows) => {
                                if (err) {
                                    console.error(err.message);
                                    res.status(500).json({error: err.message});
                                    return;
                                }
                                res.status(200).json(rows);
                                return;
                            });
                        });
                    } else {
                        db.serialize(() => {
                            db.all("SELECT * FROM Location", (err, rows) => {
                                if (err) {
                                    console.error(err.message);
                                    res.status(500).json({error: err.message});
                                    return;
                                }
                                console.log(rows);
                                res.status(200).json(rows);
                                return
                            });
                        });
                    }
                } else {
                    res.status(400).json({error: "Invalid company_api_key"});
                    return;
                }
            });
        });
    } else{
        res.status(400).json({error: "Missing company_api_key"});
        return;
    }
});

app.put("/api/v1/update_location", (req, res) => {
    const query = req.query;
    const company_api_key = query.company_api_key;
    if (company_api_key){
        db.serialize(() => {
            db.all("SELECT * FROM Company WHERE company_api_key = ?", [company_api_key], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({error: err.message});
                    return;
                }
                if (rows.length > 0){
                    db.all("SELECT * FROM Location WHERE company_id = ?", [query.company_id], (err, rows2) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).json({error: err.message});
                            return;
                        }
                        if (rows2.length > 0){
                            db.run("UPDATE Location SET location_name = ?, location_country = ?, location_city = ?, location_meta = ? WHERE company_id = ?", [query.location_name ? query.location_name : rows2[0].location_name, query.location_country ? query.location_country : rows2[0].location_country, query.location_city ? query.location_city : rows2[0].location_city, query.location_meta ? query.location_meta : rows2[0].location_meta, query.company_id], (err) => {
                                if (err) {
                                    console.error(err.message);
                                    res.status(500).json({error: err.message});
                                    return;
                                }
                                res.status(200).json({message: "Location updated"});
                                return;
                            });
                        } else {
                            res.status(400).json({error: "Invalid company_id"});
                            return;
                        }
                    });
                } else {
                    res.status(400).json({error: "Invalid company_api_key"});
                    return;
                }
            });
        });
    } else {
        res.status(400).json({error: "Missing company_api_key"});
        return;
    }
});

app.delete("/api/v1/delete_location", (req, res) => {
    const query = req.query;
    const company_api_key = query.company_api_key;
    if (company_api_key){
        db.serialize(() => {
            db.all("SELECT * FROM Company WHERE company_api_key = ?", [company_api_key], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({error: err.message});
                    return;
                }
                if (rows.length > 0){
                    db.all("SELECT * FROM Location WHERE company_id = ?", [query.company_id], (err, rows2) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).json({error: err.message});
                            return;
                        }
                        if (rows2.length > 0){
                            db.run("DELETE FROM Location WHERE company_id = ?", [query.company_id], (err) => {
                                if (err) {
                                    console.error(err.message);
                                    res.status(500).json({error: err.message});
                                    return;
                                }
                                res.status(200).json({message: "Location deleted"});
                                return;
                            });
                        } else {
                            res.status(400).json({error: "Invalid company_id"});
                            return;
                        }
                    });
                } else {
                    res.status(400).json({error: "Invalid company_api_key"});
                    return;
                }
            });
        });
    } else {
        res.status(400).json({error: "Missing company_api_key"});
        return;
    }
});

app.get("/api/v1/get_sensor", (req, res) => {
    const query = req.query;
    const company_api_key = query.company_api_key;
    if (company_api_key){
        db.serialize(() => {
            db.all("SELECT * FROM Company WHERE company_api_key = ?", [company_api_key], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({error: err.message});
                    return;
                }
                if (rows.length > 0){
                    if (query && query.sensor_id){
                        db.serialize(() => {
                            db.all("SELECT * FROM Sensor WHERE sensor_id = ?", [query.sensor_id], (err, rows) => {
                                if (err) {
                                    console.error(err.message);
                                    res.status(500).json({error: err.message});
                                    return;
                                }
                                res.status(200).json(rows);
                                return;
                            });
                        });
                    } else {
                        db.serialize(() => {
                            db.all("SELECT * FROM Sensor", (err, rows) => {
                                if (err) {
                                    console.error(err.message);
                                    res.status(500).json({error: err.message});
                                    return;
                                }
                                console.log(rows);
                                res.status(200).json(rows);
                                return
                            });
                        });
                    }
                } else {
                    res.status(400).json({error: "Invalid company_api_key"});
                    return;
                }
            });
        });
    } else{
        res.status(400).json({error: "Missing company_api_key"});
        return;
    }
});

app.put("/api/v1/update_sensor", (req, res) => {
    const query = req.query;
    const company_api_key = query.company_api_key;
    if (company_api_key){
        db.serialize(() => {
            db.all("SELECT * FROM Company WHERE company_api_key = ?", [company_api_key], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({error: err.message});
                    return;
                }
                if (rows.length > 0){
                    db.all("SELECT * FROM Sensor WHERE sensor_id = ?", [query.sensor_id], (err, rows2) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).json({error: err.message});
                            return;
                        }
                        if (rows2.length > 0){
                            db.run("UPDATE Sensor SET sensor_name = ?, sensor_category = ?, sensor_meta = ? WHERE sensor_id = ?", [query.sensor_name ? query.sensor_name : rows2[0].sensor_name, query.sensor_category ? query.sensor_category : rows2[0].sensor_category, query.sensor_meta ? query.sensor_meta : rows2[0].sensor_meta, query.sensor_id], (err) => {
                                if (err) {
                                    console.error(err.message);
                                    res.status(500).json({error: err.message});
                                    return;
                                }
                                res.status(200).json({message: "Sensor updated"});
                                return;
                            });
                        } else {
                            res.status(400).json({error: "Invalid sensor_id"});
                            return;
                        }
                    });
                } else {
                    res.status(400).json({error: "Invalid company_api_key"});
                    return;
                }
            });
        });
    } else {
        res.status(400).json({error: "Missing company_api_key"});
        return;
    }
});

app.delete("/api/v1/delete_sensor", (req, res) => {
    const query = req.query;
    const company_api_key = query.company_api_key;
    if (company_api_key){
        db.serialize(() => {
            db.all("SELECT * FROM Company WHERE company_api_key = ?", [company_api_key], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({error: err.message});
                    return;
                }
                if (rows.length > 0){
                    db.all("SELECT * FROM Sensor WHERE sensor_id = ?", [query.sensor_id], (err, rows2) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).json({error: err.message});
                            return;
                        }
                        if (rows2.length > 0){
                            db.run("DELETE FROM Sensor WHERE sensor_id = ?", [query.sensor_id], (err) => {
                                if (err) {
                                    console.error(err.message);
                                    res.status(500).json({error: err.message});
                                    return;
                                }
                                res.status(200).json({message: "Sensor deleted"});
                                return;
                            });
                        } else {
                            res.status(400).json({error: "Invalid sensor_id"});
                            return;
                        }
                    });
                } else {
                    res.status(400).json({error: "Invalid company_api_key"});
                    return;
                }
            });
        });
    } else {
        res.status(400).json({error: "Missing company_api_key"});
        return;
    }
});

app.post("/api/v1/sensor_data", (req, res) => {

});

app.get("/api/v1/sensor_data", (req, res) => {

});

app.put("/api/v1/update_sensor_data", (req, res) => {

});

app.delete("/api/v1/delete_sensor_data", (req, res) => {
    const query = req.query;
    const sensor_api_key = query.sensor_api_key;
    if (sensor_api_key){
        db.serialize(() => {
            db.all("SELECT * FROM Sensor WHERE sensor_api_key = ?", [sensor_api_key], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({error: err.message});
                    return;
                }
                if (rows.length > 0){
                    db.run("DELETE FROM SensorData WHERE ID = ? AND sensor_api_key = ?", [query.ID, sensor_api_key], (err) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).json({error: err.message});
                            return;
                        }
                        res.status(200).json({message: "Sensor data deleted"});
                        return;
                    });
                } else {
                    res.status(400).json({error: "Invalid sensor_api_key"});
                    return;
                }
            });
        });
    } else {
        res.status(400).json({error: "Missing sensor_api_key"});
        return;
    }
});

app.listen(port, () => {
    db.serialize(() => {
        db.run("CREATE TABLE Admin (Username TEXT, Password TEXT)");
        db.run("CREATE TABLE Company (ID INTEGER PRIMARY KEY AUTOINCREMENT, company_name TEXT, company_api_key TEXT)");
        db.run("CREATE TABLE Location (company_id INTEGER, location_name TEXT, location_country TEXT, location_city TEXT, location_meta TEXT)");
        db.run("CREATE TABLE Sensor (location_id INTEGER, sensor_id INTEGER, sensor_name TEXT, sensor_category TEXT, sensor_meta TEXT, sensor_api_key TEXT)");
        db.run("CREATE TABLE SensorData (ID INTEGER PRIMARY KEY AUTOINCREMENT, sensor_id INTEGER, sensor_data TEXT)");
        db.run("INSERT INTO Company (company_name, company_api_key) VALUES ('Test Company', 'key')");
        db.run("INSERT INTO Location (company_id, location_name, location_country, location_city, location_meta) VALUES (1, 'test1', 'Test Country', 'Test City', 'Test Meta')");
        db.run("INSERT INTO Location (company_id, location_name, location_country, location_city, location_meta) VALUES (2, 'test2', 'Test Country', 'Test City', 'Test Meta')");
        db.run("INSERT INTO Sensor (location_id, sensor_id, sensor_name, sensor_category, sensor_meta, sensor_api_key) VALUES (1, 1, 'Test Sensor', 'Test Category', 'Test Meta', 'key')");
        db.run("INSERT INTO Sensor (location_id, sensor_id, sensor_name, sensor_category, sensor_meta, sensor_api_key) VALUES (2, 2, 'Test Sensor', 'Test Category', 'Test Meta', 'key')");
    });
    console.log(`API RUN AT http://localhost:${port}`);
});