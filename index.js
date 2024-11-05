const express = require('express');
const app = express();
require('dotenv').config();
const employeeRoutes = require('./routes/employeeRoutes');

const { sequelize } = require('./models');

// sequelize
//   .sync()
//   .then(() => {
//     console.log('Database has been synced');
//   })
//   .catch((err) => {
//     console.log(
//       'There was an issue synchronizing the data base. Following is the error',
//       err
//     );
//   });

app.use(express.json());
app.use('/api/v1/employees', employeeRoutes);

app.get('/', (req, res) => {
  res.send('This is the root route');
});

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
