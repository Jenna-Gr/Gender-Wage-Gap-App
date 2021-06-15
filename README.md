## Gender-Wage-Gap-App ##

## Ever wonder which top tech companies have the smallest gender wage gap? ##
  > Now you can discover the size of the gender wage gap among Software Engineers at top tech companies.

## Summary ##
  > Utilizing self-reported data, compare average salaries among SEs with similar experience levels.

## Installation ##
  > Fork and clone the repository
  > Navigate to the repository in your terminal

  ```
  
  npm install
  ```
  > To initialize the database:
    * Access Mongo Shell
    ```
    
    use compensation
    ```
    * In regular terminal:
    ```
    
    cd database
    node dataScrubber.js
    ```
    
  > To start the app:
  ```
  
  npm run build
  npm run start
  ```
  > Navigate to localhost 3000 on your web browser.
