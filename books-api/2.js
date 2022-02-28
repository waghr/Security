const { response } = require('express')
const express = require('express')
const req = require('express/lib/request');
const res = require('express/lib/response');
const { get } = require('express/lib/response')
var jwt = require('jsonwebtoken');          //jwt
const app = express()

app.use(express.json())

const books = [
    {title: 'java programming', id: 1},
    {title: 'hindi', id: 2},
    {title: 'english', id: 3},
]

app.get('/',(req, resp)=>{
    resp.send('Welcome to study REST api with nie js')

})
app.get('/api/books',(req,resp)=>{
    resp.send(books)
})

app.get('/api/books/:id',(req,resp)=>{
    const book= books.find(v => v.id === parseInt(req.params.id))
    if(!book) resp.status(404).send('book not found')
    resp.send(book)
})

app.post('/api/books/addBook',(req,resp) => {
    //auth user
    const user ={id:3};
    const token = jwt.sign({user}, 'my_secret_key');
    resp.json({
        token:token
    });
//auth user end
    const book = {
        id: books.length+1,
        title: req.body.title
    }
    books.push(book)
    response.send(book)
})

app.put('/api/books/:id',(req,resp) =>{
    
    const book= books.find(v => v.id === parseInt(req.params.id))
    if(!book) resp.status(404).send('book not found')

    book.title = req.body.title
    req.send(book)
})

app.delete('/api/books/:id',(req,resp) =>{
    const book= books.find(v => v.id === parseInt(req.params.id))
    if(!book) resp.status(404).send('book not found')

    const index = books.indexOf(book)
    books.splice(index,1)

    resp.send(book)
})
app.listen(8080)
