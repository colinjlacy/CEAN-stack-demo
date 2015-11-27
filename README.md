# CEAN-Stack Demo Application

This is a demo application built using Couchbase, Express, and Angular - an alternative to the MEAN stack.  It was built off of the instructions in [Nic Raboy's blog post](https://blog.nraboy.com/2015/10/create-a-full-stack-app-using-node-js-couchbase-server/) about building a CEAN app, with some modifications to the Express files, and some minor changes to the Angular application.

## Setup

The bulk of setup comes in installing and configuring Couchbase Server.  

First, follow the instructions on [the Couchbase website](http://www.couchbase.com/get-started-developing-nosql#Download_Couchbase_Server), which will guide you through downloading, installing, and configuring.  Once you've done that, launch the DB admin portal in the browser by navigating to [http://localhost:8091/](http://localhost:8091/).

Next, create a bucket called **restful-sample**.  If you'd like to call it something else, that's fine, just be sure to configure that field in the `/config.json` file.  

### Create an Index on the Bucket

After that you'll have to add an index.  There's probably an easier way to do this, but here's how I did it, as per the instructions in the tutorial.

Start up the **Couchbase Query Client** from the command line.  For me, one a Mac, this meant running the following exec:
 
	$ `/Applications/Couchbase\ Server.app/Contents/Resources/couchbase-core/bin/cbq`
	
According to Nic Raboy, on a PC you would run:

	C:/Program Files/Couchbase/Server/bin/cbq.exe
	
Keep in mind I haven't tested that Windows shell command.

Once your Couchbase console has started, run the following command to create an index:

	CREATE PRIMARY INDEX ON `restful-sample` USING GSI;
	
## Running the Application

In order to start up the application successfully, you'll have to install Bower dependencies from the `/public` folder.

	$ cd public
	$ bower install
	
That wil fetch Angular, UI-Router, Bootstrap, and jQuery.

Once you have those, the application is ready to start up.  Run the following in the application root:

	$ node index.js
	
That will start up your Express app on a Node server at port 3000.  To access the application in a browser, navigate to [http://localhost:3000/#/](http://localhost:3000/#/).

## Features

This is as basic as basic gets.  It lists any records in the database, and gives the user the option to edit or add a new record, using the same form.  The user can also delete a record.  None too crazy, but enough to prove the connection works.

Upon starting the application, you'll likely see a `<thead>` with some column names, and then nothing below that.  Click the **New Item** button to add a new record to the database.  You'll see a form, which once filled out and sent, will store a first name, last name, and email address in the database.

You can confirm this by navigating back to the [DB admin](http://localhost:8091/) and accessing the **Records** screen for the **restful-sample** data bucket (or wahtever it is that you called your bucket).