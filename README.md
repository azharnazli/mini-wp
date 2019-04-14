# mini-wp

## Usage
```javascript
$ npm install
$ node app.js
```
```javascript
Access server `http://localhost:3000` 
Access client `http://localhost:8080`
```

## Routes
###  Users
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/register  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/users/normalLogin  |POST  |none|email: String (**required**), password: String (**required**) |**Success**: Login as a user, **Error**: Internal server error (Validation)|Login as a user|
|/users/googleLogin  |POST  |none|email: String (**required**), password: String (**required**) |**Success**: Login as a user via Google, **Error**: Internal server error (Validation)|Login as a user with Google|


###  Articles
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
|/articles/findAll  |GET  |token|none |**Success**: Get user's posted articles, **Error**: Internal server error (Validation)|Get  All user posted articles|
|/articles/myArticles  |GET  |token|none |**Success**: Get user's posted articles, **Error**: Internal server error (Validation)|Get user's posted articles|
|/articles/create  |POST  |token|title: String (**required**), content: String (**required**), image: File (**optional**) |**Success**: Create an article, **Error**: Internal server error (Validation)|Create an article|
|/articles/edit/:articleId  |PATCH  |token|title: String (**optional**), content: String (**optional**), image: File (**optional**) |**Success**: Update an article, **Error**: Internal server error (Validation)|Update an article|
|/articles/delete/:articleId  |DELETE  |token|none|**Success**: Delete an article, **Error**: Internal server error (Validation)|Delete an article|