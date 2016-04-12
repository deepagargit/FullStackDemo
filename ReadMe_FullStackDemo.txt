Creating a backend micro-service from scratch
---------------------------------------------

The micro-service typically needs a DB (to store the state in backend) also called a Model,  a controller to have business-logic on user data and operate on Model, a view to give the snapshot of information to the user.

The full stack application development includes a micro-service and a user-interface (HTML web interface in this case, could be mobile App as well).

The full stack application supports Apache Web Server 2.2. Django is used as the MVC web framework to provide dynamic web interface.
The Apache module used to tie Django to Apache is mod_wsgi.

As the Apache server is (generally) only available in 32-bit form, and some are depended on python modules are also only officially available in 32-bit, you must use 32-bit python on the server system, irrespective of the native form of the system.

Any firewall on the server side should be configured to allow standard web access through port 80 and open port required for server services.


Let's start with the installations & setting-up dependent tools:

0. Create the folder structure
   FullStackDemo 
   - downloads
   - backend
     - django_backend
     - java_backend

   - frontend
     - app
       - images
       - js
       - partials
       - scripts

1. Install git-bash
   Open git-bash

2. Install python 3.5.1 from https://www.python.org/ftp/python/3.5.1/python-3.5.1.exe
   Executable available at FullStackDemo\downloads\python-3.5.1.txt

   Choose to set PATH on installation GUI.

   Validate python
   $ python --version
     Python 3.5.1

   $ which python
     /c/Users/deepak/AppData/Local/Programs/Python/Python35-32/python

3. python-setuptools
First, we need to get setuptools. It is a library designed to facilitate packaging Python projects, where packaging includes:

Python package and module definitions
Distribution package metadata
Test hooks
Project installation
Platform-specific details
Python 3 support

Linux:
$ sudo yum install python-setuptools

Windows:
Download ez_setup.py from https://pypi.python.org/pypi/setuptools
Script available at FullStackDemo\downloads\ez_setup.py

$ cd FullStackDemo\downloads
Run the ez_setup.py
$ez_setup.py

Installed c:\users\deepak\appdata\local\programs\python\python35-32\lib\site-packages\setuptools-20.6.7-py3.5.egg
Processing dependencies for setuptools==20.6.7
Finished processing dependencies for setuptools==20.6.7


4. Install Django.

$ cd FullStackDemo\downloads
$ easy_install Django

Installed c:\users\deepagar\appdata\local\programs\python\python35-32\lib\site-packages\django-1.9.5-py3.5.egg
Processing dependencies for Django
Finished processing dependencies for Django

Finally, Django has been installed. We can check inside the Scripts directory:

$ ls Scripts/
django-admin-script.py         easy_install-script.py
django-admin.exe               easy_install.exe
django-admin.exe.manifest      easy_install.exe.manifest
easy_install-3.5-script.py     pip.exe
easy_install-3.5.exe           pip3.5.exe
easy_install-3.5.exe.manifest  pip3.exe


5. Creating a Django project
Let's first look at what subcommands we can use with django-admin-script.py:

$ django-admin-script.py

Type 'django-admin-script.py help <subcommand>' for help on a specific subcommand.

Available subcommands:

$ django-admin-script.py help

Type 'django-admin-script.py help <subcommand>' for help on a specific subcomman
d.

Available subcommands:

[django]
    check
    compilemessages
    createcachetable
    dbshell
    diffsettings
    dumpdata
    flush
    inspectdb
    loaddata
    makemessages
    makemigrations
    migrate
    runserver
    sendtestemail
    shell
    showmigrations
    sqlflush
    sqlmigrate
    sqlsequencereset
    squashmigrations
    startapp
    startproject
    test
    testserver
Note that only Django core commands are listed as settings are not properly conf
igured (error: Requested setting INSTALLED_APPS, but settings are not configured
. You must either define the environment variable DJANGO_SETTINGS_MODULE or call
 settings.configure() before accessing settings.).


$ cd FullStackDemo\backend
$ django-admin-script.py startproject django_backend

$ ls
django_backend  java_backend

$ ls django_backend/
django_backend  manage.py

$ ls django_backend/django_backend/
__init__.py  settings.py  urls.py  wsgi.py


We can see what are in the DjangoCRUD directory.

The manage.py will be used to run the server as shown in the next section.


6. Running the server
Let's run the Django powered test web server.

$ cd django_backend/
$ ls
django_backend  manage.py

$ python manage.py runserver
Performing system checks...

System check identified no issues (0 silenced).

You have unapplied migrations; your app may not work properly until they are app
lied.
Run 'python manage.py migrate' to apply them.
April 09, 2016 - 22:57:48
Django version 1.9.5, using settings 'django_backend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
Error: [WinError 10013] An attempt was made to access a socket in a way forbidde
n by its access permissions


$ python manage.py migrate
Operations to perform:
  Apply all migrations: contenttypes, admin, sessions, auth
Running migrations:
  Rendering model states... DONE
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying sessions.0001_initial... OK


$ python manage.py runserver
Performing system checks...

System check identified no issues (0 silenced).
April 09, 2016 - 22:59:19
Django version 1.9.5, using settings 'django_backend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
Error: [WinError 10013] An attempt was made to access a socket in a way forbidde
n by its access permissions

[Solution] OK, this error occurs when another process is already using the same port.

$ python manage.py runserver 1234
Performing system checks...

System check identified no issues (0 silenced).
April 09, 2016 - 23:10:12
Django version 1.9.5, using settings 'django_backend.settings'
Starting development server at http://127.0.0.1:1234/
Quit the server with CTRL-BREAK.

Verify by http://127.0.0.1:1234/

It worked!
Congratulations on your first Django-powered page.


7. settings.py - sqlite3

Let's look into the settings.py. Since we're going to use sqlite3 database which is the default database, we want to focus on DATABASE section:

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
NAME is the name of our database. We're using SQLite, and the database will be a file on our computer; in that case, NAME should be the full absolute path, including filename, of that file. If the file doesn't exist, it will automatically be created when we synchronize the database for the first time.

For other than sqlite3, we may need other keys such as 'USER', 'PASSWORD', 'HOST', and 'PORT'. Actually, they used be set as ' ' for sqlite3.


settings.py - TIME_ZONE
While we're editing settings.py, we need to set TIME_ZONE to our time zone. The default value is the Central time zone in the U.S. (Chicago).



8. Creating an APP

Package? App?
"A Django application is just a Python package that is specifically intended for use in a Django project. An application may use common Django conventions, such as having models, tests, urls, and views submodules.
Later on we use the term packaging to describe the process of making a Python package easy for others to install."
- from Package? App?.

We're going to make a small CRUD app to see how we can use database. It has title, body, and publish data etc.

To create an app, we use managy.py, so we need to go inside project directory:
 
$ cd backend/django_backend/
$ python manage.py startapp app

$ ls
app  db.sqlite3  django_backend  manage.py

$ ls app
__init__.py  admin.py  apps.py  migrations  models.py  tests.py  views.py


Note that our 'app' contains a special file __init__.py, even if this file is empty (size == 0). We need that file for our app to be imported as a module later.

We have other files as well: models.py, tests.py, and views.py. But in this exercise, we'll focus on the models.py which is related to database.



9. models.py
We're going to work on models.py:

A model is all about our data. It contains the essential fields and behaviors of the data we're storing. In general, each model maps to a single database table.

Each model is a Python class that subclasses django.db.models.Model.
Each attribute of the model represents a database field.
With all of this, Django gives us an automatically-generated database-access API.

$ cd backend/django_backend/app

$ ls 
__init__.py  admin.py  apps.py  migrations  models.py  tests.py  views.py


$ vi models.py



10. Add App (app) in Installed Application

The table won;t be created in sqlite DB without this App entry 'app' in INSTALLED_APPS.

Let's look the settings.py again, and this time, we should look for "INSTALLD_APPS":
cat django_backend/django_backend/settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes'
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'app',
    'corsheaders',
]


MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]


CORS_ORIGIN_ALLOW_ALL = True

APPEND_SLASH=False


Install libraries
-----------------

$ pip install djangorestframework

Installing collected packages: djangorestframework
Successfully installed djangorestframework-3.3.3


https://pypi.python.org/pypi/django-cors-middleware

$ pip install django-cors-headers 

Installing collected packages: django-cors-headers
  Running setup.py install for django-cors-headers
Successfully installed django-cors-headers-1.1.0






11. DO syncdb
Install sqllite database browser from http://sqlitebrowser.org/
Open db.sqlite3 in SQLite Database Browser
What to see missing Model tables.

$ cd FullStackDemo/backend/django_backend

# makemigrations

$ python manage.py makemigrations
Migrations for 'app':
  0001_initial.py:
    - Create model Deploy
    - Create model DeployImage
    - Create model DeployTool
    - Create model IaaS
    - Create model Image
    - Create model Tool
    - Add field images to deploy
    - Add field tools to deploy


# migrate

$ python manage.py migrate
Operations to perform:
  Apply all migrations: app, auth, contenttypes, admin, sessions
Running migrations:
  Rendering model states... DONE
  Applying app.0001_initial... OK


# runserver

$ python manage.py runserver 1235
Performing system checks...

System check identified no issues (0 silenced).
April 12, 2016 - 14:39:23
Django version 1.9.5, using settings 'django_backend.settings'
Starting development server at http://127.0.0.1:1235/
Quit the server with CTRL-BREAK.

Check Tables from sqllite database browser

Model tables is created.
We see all the fields we've written to the models.py. 
Also, notice that the id is not there because Django doesn't puts that field for us as primary key is presnet in table.


Validate REST API

[GET]

$ curl -i http://127.0.0.1:1235/tools
HTTP/1.0 200 OK
Date: Tue, 12 Apr 2016 09:15:27 GMT
Server: WSGIServer/0.2 CPython/3.5.1
Content-Type: application/json
Vary: Accept, Cookie
Allow: GET, POST, DELETE, HEAD, OPTIONS
X-Frame-Options: SAMEORIGIN

[]


[POST]

$ curl -H "Content-Type: application/json" -X POST -d '{ "name" : "consul", "description" : "consul-tool", "version" : "2.1.5", "type" : "service-discovery" }' http://127.0.0.1:1235/tools

{"id":1,"name":"consul","description":"consul-tool","version":"2.1.5","type":"se
rvice-discovery"}

$ curl -i http://127.0.0.1:1235/tools 
HTTP/1.0 200 OK
Date: Tue, 12 Apr 2016 09:24:41 GMT
Server: WSGIServer/0.2 CPython/3.5.1
Content-Type: application/json
Vary: Accept, Cookie
Allow: GET, POST, DELETE, HEAD, OPTIONS
X-Frame-Options: SAMEORIGIN

[{"id":1,"name":"consul","description":"consul-tool","version":"2.1.5","type":"s
ervice-discovery"}]



[PUT]

$ curl -i http://127.0.0.1:1236/tools 

$ curl -H "Content-Type: application/json" -X PUT  -d '{ "name" : "consul", "description" : "consul-hashicorp", "version" : "2.1.5", "type" : "service-discovery" }' http://127.0.0.1:1236/tool/1

$ curl -i http://127.0.0.1:1236/tools 
Allow: GET, POST, DELETE, HEAD, OPTIONS

[{"id":1,"name":"consul","description":"consul-hashicorp","version":"2.1.5","typ
e":"service-discovery"}]

[DELETE]

$ curl  -X DELETE http://127.0.0.1:1236/tool/1

$ curl -i http://127.0.0.1:1236/tools 
Allow: GET, POST, DELETE, HEAD, OPTIONS

[]


----------------------------- Backup -Optional virtualenv ---------------------------------

3.x virtualenv
Virtualenv is to create isolated environments, each running their own versions of packages. It is the tool in Python which helps in creating new virtual environments for our projects. Since it has its own install directories, we can be isolated from the system directories. We can even create virtual environments with various python versions, with each virtual environment having its own set of packages.

To install it, we do:

Linux:
$ sudo easy_install virtualenv

Windows:
$easy_install virtualenv


Creating virtual environments
Now we want to create a virtual environment by running the simple command with the following syntax:

virtualenv <environment_name>
OK, let's create it:

$ virtualenv --no-site-packages CRUDenv
Using base prefix 'c:\\Users\\deepagar\\AppData\\Local\\Programs\\Python\\Python
35'
New python executable in c:\Users\deepagar\dev\django\CRUDenv\Scripts\python.exe

Installing setuptools, pip, wheel...done.


We used the --no-site-packages since we want to isolate our environment from the main site packages directory. Note that we can --system-site-packages instead if we do not want the isolation from the system packages. In other words, we can specify whether or not we want to inherit all the packages installed in our system.



Activating virtual environments


$ source CRUDenv/Scripts/activate
(CRUDenv)

$ python --version
Python 3.5.1
(CRUDenv)

The prompt shows we are now in virtualenv. 
Actually, it let us know that we're running the proper virtualenv install. 
To deactivate, we can just run the following to come out of the environment:

$ deactivate
But we're not going to do that now.

If we go into the folder:

$ ls
Include  Lib  Scripts  pip-selfcheck.json

$ ls Scripts/
activate      activate_this.py      easy_install.exe  pip3.exe      pythonw.exe
activate.bat  deactivate.bat        pip.exe           python.exe    wheel.exe
activate.ps1  easy_install-3.5.exe  pip3.5.exe        python35.dll

 
It looks like the folder in our root file system, but it's not. It's a separate folder.
















-----------------------------------------------------------------------------------------------------------------------------


1. Let's start with creating a folder structure for documentation, frontend, backend

Folder Structure

fullstackdemo
- documentation
- frontend
  - app
	- images
	- scripts
		- controllers
		- services
	- styles
	- templates
  - test
  - 
  - 
- backend
  - 
  - 
  - 
  - 


2. The first step for full stack service development is creation of web UI, This is done using bootstrap framework

Refer - http://www.alphr.com/features/383794/create-a-website-with-bootstrap


Bootstrap is a free toolkit that can help you create good-looking, standards-compliant, responsive web pages.
Try getting basic understanding of HTML, CSS, Javascript

Building a website with Bootstrap gives you access to a large library of pre-rolled CSS for styling; JavaScript for handling components such as dropdown menus, progress bars and popovers; and a set of images – icons, really – which can be used on buttons and menus.
It guarantees that page elements will work across different browsers and devices.












