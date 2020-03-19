# Pony Express

This app is an implemenation of a mail server using Express from [Functional Design Patterns For Express.js](https://jonathanleemartin.com/books/).

## Usage

Hit the routes GET /users and GET /emails to get a JSON response. If you specify a Content-Type in an Accept header, the app can return JSON, XML, or CSV at those same routes, with JSON being the default if no Content-Type is specified.

## Demo

Visit the app [here](https://pony-express-ds.herokuapp.com/) or make requests from your favorite REST client to the base url `https://pony-express-ds.herokuapp.com/`

## Examples

#### 

GET /users as XML

```
curl --request GET \
  --url https://pony-express-ds.herokuapp.com/users \
  --header 'accept: application/xml'
```

GET /emails as CSV

```
curl --request GET \
  --url https://pony-express-ds.herokuapp.com/emails \
  --header 'accept: text/csv'
```
GET /emails as JSON (no accept header or accept all defaults to JSON)

```
curl --request GET \
  --url https://pony-express-ds.herokuapp.com/emails
```