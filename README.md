# laravel-vue-todo-assesment
This is a little todo project built in Laravel on the API and Vue 3 + Vuetify 3 on the client


# Run the app locally
Before clone the repository make sure you have the following installed on your machine:

-A database engine such as MySQL, PostgreSQL, MariaDB, Xampp or a docker image to run a database.

-Node and npm.

-Composer.

-Git.

-A code editor, example: VS Code


## Steps
- In the folder you want the project to be open a terminal and run the following command:
  git clone https://github.com/Kkamerunn/laravel-vue-todo-assesment.git
- Then open two terminals: one inside the laravel-api-test project folder and other in vue-client-test project folder.
- Now on the laravel-api-test terminal run "composer install" and wait until the installing package process ends.
- Then duplicate the file ".env.example" and rename it as ".env".
- Back in the terminal run "php artisan key:generate".
- Then run the database engine so the Laravel API can connect to the database when we run it.
- Once the database is running, run the following command on the terminal laravel-api-test termina, "php artisan migrate".
- Finally run on the same terminal "php artisan serve" and that's it, our Laravel API is running correctly.
- Now we have to run the client app, so we go to the vue-client-test terminal. Once there we have to run
  "npm install" to install all the node modules packages.
- And finally, after all packages have been installed just run "npm run dev" and we are going to get a url to paste on the browser and
  use the app.
