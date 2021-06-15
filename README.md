# Gender-Wage-Gap-App #

## Ever wonder which top tech companies have the smallest gender wage gap? ##
  > Now you can discover the size of the gender wage gap among Software Engineers at top tech companies.

## Summary ##
  > Utilizing self-reported data, compare average salaries among SEs with similar experience levels.

## Technologies Utilized ##
  * Puppeteer for data scrubbing, MongoDb and Mongoose for database
  * Express server
  * React Front End
  * Node.js, Webpack, Babel

## Installation ##
 1. Fork and clone the repository
 1. Navigate to the repository in your terminal

        npm install
  
 1. To initialize the database:
     * Access Mongo Shell, then
    
           use compensation
 
     * In regular terminal:
    
           cd database
           node dataScrubber.js
    
    
 1. To start the app:
  
        npm run build
        npm run start
  
 1. Navigate to localhost 3000 on your web browser.
