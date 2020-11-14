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
	npm run setup
```

If you specified the name of your own project folder...

```
	cd <name_of_your_project_folder> && npm run setup
```

This commands will directly install all the project dependencies and will take quite some time so, please be patient.

## RUN YOUR APP 
After all the dependencies are installed, you can easily run your app by...

```
	npm run app
```

easy as that!


## Environment
Add your own .env file at the root of your project directory to override 
the configuration of your server. Look at the contents of your server file to see
some of the environment variables used.


[CLIENT](http://localhost:3030) **PORT 3000**
[SERVER](http://localhost:4040) **PORT 4000**

>you could use concurrently to simultaneously start Client && Server
