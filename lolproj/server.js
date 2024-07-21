var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2')
var path = require('path');
var routes = require('./routes/index');
var misc = require('./routes/misc');
var dev_tools = require('./routes/dev_tools');
var champ_stats = require('./routes/champion_stats');
var matchdata_display = require('./routes/matchdata_display');
var champ_display = require('./routes/champion_display');
var skin_metrics = require('./routes/skin_metrics');
var over_cw = require('./routes/over_certain_win');
var transaction = require('./routes/transaction')
const { match } = require('assert');
var connection = mysql.createConnection({
    host: '35.232.42.197',
    user: 'root',
    password: 'test12345',
    database: 'LOLSV'
});

// start application
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

app.use('/', routes);
app.use('/champion_stats', champ_stats);
app.use('/skin_metrics', skin_metrics);
app.use('/over_certain_win', over_cw);
app.use('/misc', misc);
app.use('/dev_tools', dev_tools);
app.use('/matchdata_display', matchdata_display);
app.use('/champion_display', champ_display);
app.use('/transaction', transaction);


// a query that searches up the all the entires in the Champion table
app.get('/api/champions', function(req, res) {
    //var champion_name = req.params.champion_name;
    var search_query = 'SELECT * FROM Champion';
    connection.query(search_query, function(err, results) {
        if (err) {
            console.error('Error retrieving champion records:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// a query that searches up the all the entires in the Item table
app.get('/api/items', function(req, res) {
    var search_query = 'SELECT * FROM Item';
    connection.query(search_query, function(err, results) {
        if (err) {
            console.error('Error retrieving all item records:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// a query that searches up the all the entries in the MatchData Table
app.get('/api/match_data', function(req, res) {
    var search_query = 'SELECT * FROM MatchData';
    connection.query(search_query, function(err, results) {
        if (err) {
            console.error('Error retrieving all match data records:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// a query that searches up the all the entries in the Player Table
app.get('/api/players', function(req, res) {
    var search_query = 'SELECT * FROM Player';
    connection.query(search_query, function(err, results) {
        if (err) {
            console.error('Error retrieving all player records:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// a query that searches up the all the entries in the Skin Table
app.get('/api/lol_skins', function(req, res) {
    var search_query = 'SELECT * FROM Skin';
    connection.query(search_query, function(err, results) {
        if (err) {
            console.error('Error retrieving all champion skin records:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// This query searches for the MatchData entries based on the player_name inputted
app.get('/api/search_player_md', function(req, res) {
    var player_name = req.query.player_name;
    console.log("we got the player: " + player_name);
    var search_query = 'SELECT * FROM MatchData WHERE BluePlayerTop = ? OR BluePlayerMid = ? OR BluePlayerJungle = ? OR BluePlayerADC = ? OR BluePlayerSupport = ? OR RedPlayerTop = ? OR RedPlayerMid = ? OR RedPlayerJungle = ? OR RedPlayerADC = ? OR RedPlayerSupport = ?';
    connection.query(search_query, [player_name, player_name, player_name,
        player_name,player_name,player_name,player_name,player_name,player_name,player_name], function(err, results) {
        if (err) {
            console.error('Error retrieving all matching players : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// This query lists all entries in MatchData where there exists the Champion name in the champion related attributes
app.get('/api/search_champion_md', function(req, res) {
    var champion_name = req.query.champion_name;
    var search_query = 'SELECT * FROM Champion WHERE Champion = ?';
    connection.query(search_query, [champion_name], function(err, results) {
        if (err) {
            console.error('Error retrieving all matching players : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// ADD a new match to MatchData table
app.post('/api/add_match', function(req, res) {
    var GameID = req.body.GameID;
    var BluePlayerTop = req.body.BluePlayerTop;
    var BluePlayerMid = req.body.BluePlayerMid;
    var BluePlayerJungle = req.body.BluePlayerJungle;
    var BluePlayerADC = req.body.BluePlayerADC;
    var BluePlayerSupport = req.body.BluePlayerSupport;
    var BlueChampionTop = req.body.BlueChampionTop;
    var BlueChampionMid = req.body.BlueChampionMid;
    var BlueChampionJungle = req.body.BlueChampionJungle;
    var BlueChampionADC = req.body.BlueChampionADC;
    var BlueChampionSupport = req.body.BlueChampionSupport;
    var RedPlayerTop = req.body.RedPlayerTop;
    var RedPlayerMid = req.body.RedPlayerMid;
    var RedPlayerJungle = req.body.RedPlayerJungle;
    var RedPlayerADC = req.body.RedPlayerADC;
    var RedPlayerSupport = req.body.RedPlayerSupport;
    var RedChampionTop = req.body.RedChampionTop;
    var RedChampionMid = req.body.RedChampionMid;
    var RedChampionJungle = req.body.RedChampionJungle;
    var RedChampionADC = req.body.RedChampionADC;
    var RedChampionSupport = req.body.RedChampionSupport;
    var Winner = req.body.Winner;
    console.log("back-end Game ID: ", GameID);
    // Check if GameID already exists
    var check_query = 'SELECT * FROM MatchData WHERE GameID = ?';
    connection.query(check_query, [GameID], function(err, results) {
        if (err) {
            console.error('Error checking GameID:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            res.status(409).send('GameID already exists');
            return;
        }
        // If GameID doesn't exist, insert the new match
        var add_query = 'INSERT INTO MatchData (GameID, BluePlayerTop, BluePlayerMid, BluePlayerJungle, BluePlayerADC, BluePlayerSupport, BlueChampionTop, BlueChampionMid, BlueChampionJungle, BlueChampionADC, BlueChampionSupport, RedPlayerTop, RedPlayerMid, RedPlayerJungle, RedPlayerADC, RedPlayerSupport, RedChampionTop, RedChampionMid, RedChampionJungle, RedChampionADC, RedChampionSupport, Winner) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(add_query, [GameID, BluePlayerTop, BluePlayerMid, BluePlayerJungle, BluePlayerADC, BluePlayerSupport, BlueChampionTop, BlueChampionMid, BlueChampionJungle, BlueChampionADC, BlueChampionSupport, RedPlayerTop, RedPlayerMid, RedPlayerJungle, RedPlayerADC, RedPlayerSupport, RedChampionTop, RedChampionMid, RedChampionJungle, RedChampionADC, RedChampionSupport, Winner], function(err, results) {
            if (err) {
                console.error('Error adding match:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send('Match added successfully');
        });
    });
});


app.post('/api/update_match', function(req, res) {
    var GameID = req.body.GameID;
    var BluePlayerTop = req.body.BluePlayerTop;
    var BluePlayerMid = req.body.BluePlayerMid;
    var BluePlayerJungle = req.body.BluePlayerJungle;
    var BluePlayerADC = req.body.BluePlayerADC;
    var BluePlayerSupport = req.body.BluePlayerSupport;
    var BlueChampionTop = req.body.BlueChampionTop;
    var BlueChampionMid = req.body.BlueChampionMid;
    var BlueChampionJungle = req.body.BlueChampionJungle;
    var BlueChampionADC = req.body.BlueChampionADC;
    var BlueChampionSupport = req.body.BlueChampionSupport;
    var RedPlayerTop = req.body.RedPlayerTop;
    var RedPlayerMid = req.body.RedPlayerMid;
    var RedPlayerJungle = req.body.RedPlayerJungle;
    var RedPlayerADC = req.body.RedPlayerADC;
    var RedPlayerSupport = req.body.RedPlayerSupport;
    var RedChampionTop = req.body.RedChampionTop;
    var RedChampionMid = req.body.RedChampionMid;
    var RedChampionJungle = req.body.RedChampionJungle;
    var RedChampionADC = req.body.RedChampionADC;
    var RedChampionSupport = req.body.RedChampionSupport;
    var Winner = req.body.Winner;
    console.log("back-end Game ID: ", GameID);
    // Check if GameID already exists
    var check_query = 'SELECT * FROM MatchData WHERE GameID = ?';
    connection.query(check_query, [GameID], function(err, results) {
        if (err) {
            console.error('Error checking GameID:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            var update_query = 'UPDATE MatchData SET BluePlayerTop = ?, BluePlayerMid = ?, BluePlayerJungle = ?, BluePlayerADC = ?, BluePlayerSupport = ?, BlueChampionTop = ?, BlueChampionMid = ?, BlueChampionJungle = ?, BlueChampionADC = ?, BlueChampionSupport = ?, RedPlayerTop = ?, RedPlayerMid = ?, RedPlayerJungle = ?, RedPlayerADC = ?, RedPlayerSupport = ?, RedChampionTop = ?, RedChampionMid = ?, RedChampionJungle = ?, RedChampionADC = ?, RedChampionSupport = ?, Winner = ? WHERE GameID = ?';
            connection.query(update_query, [BluePlayerTop, BluePlayerMid, BluePlayerJungle, BluePlayerADC, BluePlayerSupport, BlueChampionTop, BlueChampionMid, BlueChampionJungle, BlueChampionADC, BlueChampionSupport, RedPlayerTop, RedPlayerMid, RedPlayerJungle, RedPlayerADC, RedPlayerSupport, RedChampionTop, RedChampionMid, RedChampionJungle, RedChampionADC, RedChampionSupport, Winner, GameID], function(err, results) {
                if (err) {
                    console.error('Error adding match:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.send('Match updated successfully');
            });
        } else {
            res.status(409).send('GameID does not exist');
            return;
        }
    });
});

//  delete a Match
app.delete('/api/delete_match', function(req, res) {
    var GameID = req.body.GameID;
    var sql = 'DELETE FROM MatchData WHERE GameID = ?';
    connection.query(sql, [GameID], function(err, result) {
        if (err) {
            console.error('Error Deleting match: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (result.affectRows == 0) {
            res.status(404).send({message: 'Record not found'});
        }   else{
            res.send({message: 'MatchData Entry deleted sucessfully!'});
        }
    });
});

//  Stored Procedure 1
app.get('/api/skin_metrics', function(req, res) {
    var winThreshold = req.query.winThreshold;
    var sql = 'CALL GetSkinMetrics(?)';
    connection.query(sql, [winThreshold], function(err,results) {
        if (err) {
            console.error('Error calling GetSkinMetrics: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results[0]);
    });
});

//  Stored Procedure 2
app.get('/api/over_certain_winrate', function(req, res) {
    var winThreshold = req.query.winThreshold;
    var sql = 'CALL OverCertainWinrate(?)';
    connection.query(sql, [winThreshold], function(err,results) {
        if (err) {
            console.error('Error calling OverCertainWinrate: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results[0]);
    });
});

app.get('/api/skilled_skins', function(req, res) {
    const sql = `CALL SkilledSkins()`;
    connection.query(sql, function(err,results) {
        if (err) {
            console.error('Error executing transaction: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results[0]);
    });
});


const port = 80;
const ipv4 = '35.208.72.165';

app.listen(port, () => {
    console.log(`Server is listening at ${ipv4}=:${port}`);
});
