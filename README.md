# Phonic Menagerie - Server

Phonic Menagerie is an application for the album collector. The user creates an account and adds, edits, or deletes an album to their own collection or albums they want to purchase in the future on a Wishlist (add, edit, or delete).

## Installation

Clone git repo

```bash
git clone git@github.com/achmaxwell/phonic-menagerie-server.git
```

Phonic Menagerie utilizes node, reactstrap, react-bootstrap, react-router-dom, typescript, and material UI

```bash
npm install reactstrap react-bootstrap react-router-dom typescript @mui/material

# Dependencies

    "bcrypt": "^5.0.1",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.0.5",
    "nodemon": "^2.0.12",
    "pg": "^8.7.1",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.6.5"

see package.json for all dependencies
```

## Usage

To start application

```python
# start server
nodemon

# start client
npm start

```
Collection/ Wishlist:

- User can create account with email and password
- User can navigate Collection, Wishlist, and if Administrator admin view of users signed up.
- User can add album (artist, album, format, cat#)
- User can edit album
- User can delete album

Admin

- Admin can view all users who have signed up

## TBD Version 2.0

- Third party API for New Releases/ Prices
- Sorting Collection/Wishlist by Artist
- Share with other Users
- Admin have the ability to delete users and edit user content
