import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts = [
    {
        id: 1,
        title: "The Rise of Decentralized Finance",
        content:
            "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
        author: "Alex Thompson",
        date: "01/07/2025, 3:30:11 pm",
    },
    {
        id: 2,
        title: "The Impact of Artificial Intelligence on Modern Businesses",
        content:
            "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
        author: "Mia Williams",
        date: "02/07/2025, 4:02:56 pm",
    },
    {
        id: 3,
        title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        content:
            "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
        author: "Samuel Green",
        date: "02/07/2025, 06:33:23 pm",
    },
];

let lastId = 3;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/posts", (req, res) => {
    console.log(posts);
    res.json(posts);
});


app.get("/posts/:id", (req, res) => {
    const searchId = parseInt(req.params.id);
    const searchIndex = posts.findIndex((post) => post.id === searchId);
    if (searchIndex > -1) {
        res.json(posts[searchIndex]);
    } else {
        res.status(404).json("Can't find blog in that ID!");
    }
    
});


app.post("/posts", (req, res) => {
    let newTitle = req.body.title;
    let newContent = req.body.content;
    let newAuthor = req.body.author;
    let newDate = new Date();

    if (!newTitle || !newContent || !newAuthor) {
        res.status(404).json({
            error: "Can't upload the post, check the title, content, or author",
        });
    } else {
        posts.push({
            id: lastId + 1,
            title: newTitle,
            content: newContent,
            author: newAuthor,
            date: newDate,
        });
        res.json(posts[posts.length - 1]);
    }
});


app.patch("/posts/:id", (req, res) => {
    const searchId = parseInt(req.params.id);
    const newTitle = req.body.title;
    const newContent = req.body.content;
    const newAuthor = req.body.author;
    const newDate = new Date();
    const searchIndex = posts.findIndex((post) => post.id === searchId);
    let patchBlog = posts[searchIndex];

  

    if (searchIndex < 0) {
        res.status(404).json({ error: "Can't find the ID" });
    } else if (!newTitle && !newContent && !newAuthor) {
        res.status(404).json({ error: "Please check the title, content, or author" });
    } else {
        patchBlog.title = newTitle || patchBlog.title;
        patchBlog.content = newContent || patchBlog.content;
        patchBlog.author = newAuthor || patchBlog.author;
        patchBlog.date = newDate;
        res.json(patchBlog);
    }
});


app.delete("/posts/:id", (req, res) => {
    const searchId = parseInt(req.params.id);
    const searchIndex = posts.findIndex((post) => post.id === searchId);

    if (searchIndex > -1) {
        posts.splice(searchIndex, 1);
        res.json(posts);
    } else {
        res.status(404).json({ error: "Can't find the blog with this id" });
    }
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});