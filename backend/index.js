require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(
  '/uploads/profile_photos',
  express.static(path.join(__dirname, 'uploads/profile_photos'))
);

connectDB();

app.get('/', (req, res) => {
  res.send('API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const leadsRoutes = require('./routes/leadsRoutes');
app.use('/api/leads', leadsRoutes);

const saleRoutes = require('./routes/saleRoutes');
app.use('/api/sales', saleRoutes);

const notificationRoutes = require('./routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

const storeRoutes = require('./routes/storeRoutes');
app.use('/api/stores', storeRoutes);

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

const teamRoleRoutes = require('./routes/teamRoleRoutes');
app.use('/api/teamroles', teamRoleRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const teamRoutes = require('./routes/teamRoutes');
app.use('/api/teams', teamRoutes);

const socialMediaPageRoutes = require('./routes/socialMediaPageRoutes');
app.use('/api/socialmediapages', socialMediaPageRoutes);

const siteRoutes = require('./routes/siteRoutes');
app.use('/api/sites', siteRoutes);
