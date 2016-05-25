#!/bin/bash

printf "Enter username : "
read username

printf "Enter password : "
read password

printf  "Enter email : "
read email

printf  "Sex M or F : "
read sex

curl localhost:3000/user/signup -X POST -d "username=$username&password=$password&email=$email&sex=$sex"


