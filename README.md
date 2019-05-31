![GitHub Logo](images/banana.gif)

# front end 2 season:


## JavaScript

### Project
#### Lets create Password generator app that will generate Password for a given service.
#### Create: index.js, index.css and index.html•You have two inputs: ‘Basic Password’ and ‘Service Name’. And one button: ‘Submit’.
#### On submit your app has to take in those two inputs, generate password according the “sequence” and output this for user to the screen.
#### Sequence for generated password:
####- Last character of the service name
####- Character of service at index of vowels count of service (1-based, if no vowels, take first character)
####- Full ‘Basic’ password- Number of non-vowel characters of service
####- Service name first characterExample for testing:passGenerator('password', 'netflix') // result: ‘xepassword5n';