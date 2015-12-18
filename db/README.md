Migrate and Restore Data from MongoDB
=====================================

In short
--------
* Run mongodump to export data locally
* Run mongorestore to import data into database 

Creating migration files (dump)
-------------------------------
From the project root:
* `mongodump -d takeaway -o db/mongodump`

Restoring the database (! this drops the existing database)
----------------------
From the project root:
`mongorestore -d takeaway --drop db/mongodump/takeaway`

