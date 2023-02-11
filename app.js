//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _= require("lodash");

const homeStartingContent = "Motivation, the psychological construct ‘invented’ to describe the mechanism by which individuals and groups choose particular behaviour and persist with it, has a history going back millennia in all cultures. Ancient Greek, Roman, Egyptian, Indian, Chinese, and Indigenous cultures from all continents developed rubrics about positively motivated behavior usually under the mantle of ethical behavior and morality (see, for example, Framarin, 2009; Hsu & Wu, 2015; Pakdel, 2013; Reeve, 2015). Furthermore, the construct of motivation and how to develop positive motivation and behaviour has permeated all areas of human endeavour. Educational psychology, in particular, has a long history of studying the nature and dynamics of motivation for learning (McInerney, 2015). Much of the last 150 years of investigation was dominated by Western theorising and research. And psychologists and educators have learned an enormous amount that has informed educational practice to enhance learning. The last forty or so years has seen a move away from a Western base to theorising and research, a move which now takes culture and human variability as a central tenet for effective research. Rather than looking for regularities and universals with regard to motivation, often powerless in explaining group difference across groups and cultures, and indeed within groups and cultures, more attention is being paid to the culturally specific elements of motivation that may have more efficacy in explaining motivated behaviour in the classroom (King & McInerney, 2016; King, McInerney & Pitliya, 2018). This issue of Educational Psychology is well situated within this current zeitgeist.";
const aboutContent = "ManagementStudyGuide.com is an educational portal launched in 2008 with the vision of providing students and corporate workforces worldwide with access to rich, easy to understand, frequently updated instruction on many management related topics.";
const contactContent = "Medini Patil - 8329217912 \n Email- patilmedini333@gmail.com.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let posts=[];

app.get("/", function(req,res){
    res.render("home",{
      startingContent: homeStartingContent,
      posts:posts
    });
      
});

app.get("/about",function(req,res){
    res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res){
    res.render("compose");
});

app.post("/compose",function(req,res){

    var post={
      title: req.body.postTitle,
      content: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postName",function(req,res){

  const requestedTitle=_.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedTitle=_.lowerCase(post.title);
    if(storedTitle==requestedTitle){
      res.render("post",{
          title:post.title,
          content:post.content
      });
    }
  });
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
