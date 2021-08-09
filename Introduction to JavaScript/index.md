
### Why Learn JavaScript?

JavaScript is among the most powerful and flexible programming languages of the web. It powers the dynamic behavior on most websites, including this one.

## What is JavaScript

JavaScript is a lightweight, cross-platform, and interpreted scripting language. It is well-known for the development of web pages, many non-browser environments also use it. JavaScript can be used for Client-side developments as well as Server-side developments. JavaScript contains a standard library of objects, like Array, Date, and Math, and a core set of language elements like operators, control structures, and statements. 

## Why is it called JavaScript ?

When JavaScript was created, it initially had another name: “LiveScript”. But Java was very popular at that time, so it was decided that positioning a new language as a “younger brother” of Java would help.

But as it evolved, JavaScript became a fully independent language with its own specification called ECMAScript, and now it has no relation to Java at all.

#### Client-side:
 It supplies objects to control a browser and its Document Object Model (DOM). Like if client-side extensions allow an application to place elements on an HTML form and respond to user events such as mouse clicks, form input, and page navigation. Useful libraries for the client-side are AngularJS, ReactJS, VueJS and so many others.

#### Server-side:
 It supplies objects relevant to running JavaScript on a server. Like if the server-side extensions allow an application to communicate with a database, and provide continuity of information from one invocation to another of the application, or perform file manipulations on a server. The useful framework which is the most famous these days is node.js.

 JavaScript can be added to your HTML file in two ways:

#### Internal JS:
 We can add JavaScript directly to our HTML file by writing the code inside the `<script>` tag. The `<script>` tag can either be placed inside the `<head>` or the `<body>` tag according to the requirement.

#### External JS:
We can write JavaScript code in other file having an extension .js and then link this file inside the `<head>` tag of the HTML file in which we want to add this code.


### JavaScript engines

JavaScript can execute not only in the browser, but also on the server, or actually on any device that has a special program called the JavaScript engine.

* The browser has an embedded engine sometimes called a “JavaScript virtual machine”.

Different engines have different “codenames”. For example:

* V8 – in Chrome and Opera.
* SpiderMonkey – in Firefox.
* “Chakra” for IE
* “JavaScriptCore”, “Nitro” and “SquirrelFish” for Safari, etc.

## Syntax:

```
<script>
    // JavaScript Code
</script>
```

## HTML Syntax

```
<!DOCTYPE html>
<html lang="en">
   
<head>
    <title>
         Example JavaScript
    </title>
</head>
   
<body>
   
    <!-- JavaScript code can be embedded inside
        head section or body section -->
    <script>
        console.log("Welcome to JS");
    </script>
</body>
   
</html>
```

## History of JavaScript:
 It was created in 1995 by Brendan Eich while he was an engineer at Netscape. It was originally going to be named LiveScript but was renamed. Unlike most programming languages, the JavaScript language has no concept of input or output. It is designed to run as a scripting language in a host environment, and it is up to the host environment to provide mechanisms for communicating with the outside world. The most common host environment is the browser. 

## Features of JavaScript:
 According to a recent survey conducted by Stack Overflow, JavaScript is the most popular language on earth. 
With advances in browser technology and JavaScript having moved into the server with Node.js and other frameworks, JavaScript is capable of so much more. Here are a few things that we can do with JavaScript: 
 

* JavaScript was created in the first place for DOM manipulation. Earlier websites were mostly static, after JS was created dynamic Web sites were made.
* Functions in JS are objects. They may have properties and methods just like another object. They can be passed as arguments in other functions.
* Can handle date and time.
* Performs Form Validation although the forms are created using HTML.
* No compiler needed.

## Limitations of JavaScript: 

* Performance: JavaScript does not provide the same level of performance as offered by many traditional languages as a complex program written in JavaScript would be comparatively slow. But as JavaScript is used to perform simple tasks in a browser, so performance is not considered a big restriction in its use.

* Complexity: To master a scripting language, programmers must have a thorough knowledge of all the programming concepts, core language objects, client and server-side objects otherwise it would be difficult for them to write advanced scripts using JavaScript.

* Weak error handling and type checking facilities: It is weakly typed language as there is no need to specify the data type of the variable. So wrong type checking is not performed by compile.