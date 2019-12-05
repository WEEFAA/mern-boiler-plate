# MERN Stack Boiler Plate

a simple pre-configured mern project

## SETUP
Using your terminal, clone this repo by doing this
```
	git clone https://github.com/WEEFAA/mern-boiler-plate.git <optional_name>
```

_name your own project by inserting the name on optional_name without brackets._
_This is optional, don't include optional_name on the command if you don't want to_

## INSTALLATION/SETUP

Once you've done cloning the repo, change directory to your project folder, see command below. If you didn't specify your optional_name, _mern-boiler-plate_ will be the default project folder name.

```
	cd mern-boiler-plate && cd server && npm run setup
```

If you specified the name of your own project folder...

```
	cd <name_of_your_project_folder> && cd server && npm run setup
```

This commands will directly install all the project dependencies and will take quite some time so, please be patient.

## RUN YOUR APP 
After all the dependencies are installed, you can easily run your app by...

```
	npm run app
```

easy as that!


## DISCLAIMER
I've included a config file on this repository for the sake of simulating of how it should look like on your own local machine but, this practice is highly discouraged if you already know the cons of doing this especially in a public repository like this. *Make sure to exclude it on .gitignore file if you're putting it a github or on the cloud*


[CLIENT](http://localhost:3030) **PORT 3030**
[SERVER](http://localhost:4040) **PORT 4040**

>you could use concurrently to simultaneously start Client && Server
