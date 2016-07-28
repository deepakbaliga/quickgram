#!/bin/bash

printf "Enter username : "
read username

printf "Enter password : "
read password


curl localhost:3000/user/login -X POST -d "username=$username&password=$password"


