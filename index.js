import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true,}))

let posts = []


app
    .get("/", (req, res) => {
        res.render("index.ejs", {posts})
    })

    .get("/about", (req, res) => {
    res.render("about.ejs")
    })

    .get("/contact", (req, res) => {
    res.render("contact.ejs")
    })

    .get("/compose", (req, res) => {
    res.render("compose.ejs")
    })

    .post("/compose", (req, res) => {

        const postsLenght = posts.length;

        let post = {
            id: postsLenght,
            title: req.body["ptitle"],
            content: req.body['pcontent']
        }

        posts.push(post)

        res.redirect('/')

        console.log(post)
    })

    .get("/posts/:postName", (req, res) => {
        const requestedTitle = req.params.postName;
        console.log(req.params)
        console.log(requestedTitle)

        posts.forEach((post) => {
            const storedTitle = post.title.toLowerCase().split(' ').join('-');
            console.log(storedTitle)

            if (storedTitle === requestedTitle) {
                res.render("post.ejs", {
                    title: post.title,
                    content: post.content
                });
                console.log(post.title + " " + post.content)
            }
        });
        
    })

    .post("/delete", (req, res) => {
        const id = req.body["postId"];
        console.log(id);
        console.log(req.body)

        posts = posts.filter((post) => post.id != id);

        for(let i = 0; i <= posts.length - 1; i++) {
            posts[i]['id'] = i;
        }

        console.log(posts)

        res.redirect("/");
    })

    .get("/editpost/:postName", (req, res) => {
        const requestedTitle = req.params.postName;

        posts.forEach((post) => {
            const storedTitle = post.title.toLowerCase().split(' ').join('-')

            if(storedTitle === requestedTitle) {
                res.render("editpost.ejs", {
                    id: post.id,
                    title: post.title,
                    content: post.content
                })
                console.log(post.title + " " + post.content + " " + post.id)
            }
        })

        console.log(req.params)
        console.log(posts)

    })

    .post("/submitedit", (req, res) => {
        console.log(req.params)
        console.log(req.body)

        let post = {
            id: req.body["id"],
            title: req.body["ptitle"],
            content: req.body['pcontent']
        }

        posts[post.id] = post

        console.log(post)

        res.redirect('/')

        
    })

    .listen(port, () => {
    console.log(`Listening on port ${port}`)
    })