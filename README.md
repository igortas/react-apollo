## Description for the current status of the task

On the root there is docker-compose file with .env file on the same level. The .env file holds development configuration for connecting to mysql database aand running the all the parts of the application in containers with docker-compose.

## Description for the setting the app

Frontend app runs locally on localhost:3000

Backend api runs locally on localhost:4000

One point, because there exists mutation for creation of admins, on the web frontend there is no option for admin to creating other admin, it was taken in consideration that all amdins are of same levels, and there is one manual superadmin.

##

Go the api playground:  [http://localhost:4000/graphql](http://localhost:4000/graphql)

##

Use this mutation:
```bash
mutation {
  createAdmin(input: { name: "xxx", surname: "yyy", email: "zzz", username: "qqq", password: "www" }) {
    id
    email
  }
}
```


##

The port for the api can be changed from .env file

##

The mysql db works on port 3306. Enviroment variables for connecting are in .env file and can be changed. Database needs to be manually created or from mysql cli.

## Running the project with docker-compose

```bash
docker-compose up --build
```

After that u can use just the up flag:
```bash
docker-compose up
```

If some new packages are installed after on your behalf, run this commands:

```bash
docker-compose down

docker-compose up --build -V
```

For shutting down the running instances run this command:

```bash
docker-comppose down
```
