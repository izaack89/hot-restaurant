// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

const reservationData = [
  
];

const waitlistData = [
 
];

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reservation.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

// Displays tables
app.get('/api/tables', (req, res) => res.json(reservationData));

// Displays waitlist
app.get('/api/waitlist', (req, res) => res.json(waitlistData));


// Create New Reservation - takes in JSON input
app.post('/api/reserve', (req, res) => {
  const reservation = req.body;
  if (reservationData.length <5) {
    reservationData.push(reservation);
    res.json(true);
   } else {
    waitlistData.push(reservation);
    res.json(false);
  }
  
});

// Delete Arrays 
app.post('/api/clear', (req, res) => {
  reservationData.splice(0, reservationData.length);
  waitlistData.splice(0, waitlistData.length);
});
// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
