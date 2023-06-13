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
    const sensor_api_key = req.query.sensor_api_key;
    const sensor_data = req.body;
    if (sensor_api_key){
        db.serialize(() => {
            db.all("SELECT * FROM Sensor WHERE sensor_api_key = ?", [sensor_api_key], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({error: err.message});
                    return;
                }
                if (rows.length > 0){
                    sensor_data.timestamp = Date.now();
                    db.run("INSERT INTO SensorData (sensor_id, sensor_data) VALUES (?, ?)", [rows[0].sensor_id, JSON.stringify(sensor_data)], (err) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).json({error: err.message});
                            return;
                        }
                        res.status(201).json({message: "Sensor data added"});
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

app.get("/api/v1/sensor_data", (req, res) => {
    const query = req.query;
    const company_api_key = query.company_api_key;
    const sensor_id = JSON.parse(query.sensor_id);
    if (company_api_key && sensor_id){
        db.serialize(() => {
            db.all("SELECT * FROM Company WHERE company_api_key = ?", [company_api_key], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({error: err.message});
                    return;
                }
                if (rows.length > 0){
                    db.all(`SELECT * FROM Sensor WHERE sensor_id IN (` + sensor_id + `)`, (err, rows2) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).json({error: err.message});
                            return;
                        }
                        if (rows2.length > 0){
                            db.all(`SELECT * FROM SensorData WHERE sensor_id IN (` + sensor_id + `)`, (err, rows3) => {
                                if (err) {
                                    console.error(err.message);
                                    res.status(500).json({error: err.message});
                                    return;
                                }
                                var response = [];
                                for (let i = 0; i < rows3.length; i++){
                                    var data = JSON.parse(rows3[i].sensor_data);
                                    if (data.timestamp >= query.from && data.timestamp <= query.to){
                                        rows3[i].sensor_data = data;
                                        response.push(rows3[i]);
                                    }
                                }
                                res.status(200).json(response);
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

app.put("/api/v1/update_sensor_data", (req, res) => {
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
                    db.run("UPDATE SensorData SET sensor_data = ? WHERE ID = ? AND sensor_api_key = ?", [query.sensor_data, query.ID, sensor_api_key], (err) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).json({error: err.message});
                            return;
                        }
                        res.status(200).json({message: "Sensor data updated"});
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
        db.run("CREATE TABLE Sensor (sensor_id INTEGER PRIMARY KEY AUTOINCREMENT, location_id INTEGER, sensor_name TEXT, sensor_category TEXT, sensor_meta TEXT, sensor_api_key TEXT)");
        db.run("CREATE TABLE SensorData (ID INTEGER PRIMARY KEY AUTOINCREMENT, sensor_id INTEGER, sensor_data TEXT)");
    });
    console.log(`API RUN AT http://localhost:${port}`);
});