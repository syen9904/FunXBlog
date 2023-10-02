const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
require('dotenv').config();
const mongouri = process.env.MONGODBURI;
//const mongouri = 'mongodb://localhost:27017/blog'

mongoose.connect(mongouri, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});