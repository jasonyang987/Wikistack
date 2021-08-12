const morgan = require('morgan')
const express = require('express')
const app = express();
const layout = require('./views/layout')
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki')
const usersRouter = require('./routes/users')
// app.use('/wiki', require('./routes/wiki'))

app.use(express.static('/public'));
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use('/wiki', wikiRouter)

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});


db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

const init = async() => {
await db.sync({force: true});
app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`)
})
}
init();



