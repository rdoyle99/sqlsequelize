const express = require('express')
const app = express()
const port = 3000
const Sequelize = require('sequelize')
const sequelize = new Sequelize('leadspoon', 'postgres', 'dgkLLt3lpW35', {
  dialect: 'postgres',
  port: 7777
})
const path = require('path');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.static("express"));

app.use('/', function(req, res){
  res.sendFile(path.join(__dirname+'/home.html'));
})

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database, prob need to work on db username in the const sqlize', err);
});

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  }
  ,
  employees: {
    type: Sequelize.STRING
  }
  ,
  location: {
    type: Sequelize.STRING
  }
  ,
  industry: {
    type: Sequelize.STRING
  }
}, {

// options

});

User.sync({ force: true })

app.post('/user', async (req, res) => {
  console.log(req)
  try {
    const newUser = new User({
      email: req.body.email,
      description: req.body.description,
      employees: req.body.employees,
      location: req.body.location,
      industry: req.body.industry
    })
    await newUser.save()
    res.json({ user: newUser }) // Returns the new user that is created in the database
  } catch(error) {
    console.error(error)
  }
})

app.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await User.findAll({
      where: {
        id: userId
      }
    })
    res.json({ user })
  } catch(error) {
  console.error(error)
  }
})

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)
