## Certificates

This directory contains certificates that are used by the https version of the server

to generate or regenerate them, on a Linux system, navigate to this directory and run

```sh
openssl req -new -newkey rsa:2048 -nodes -out server.csr -keyout private.key
```

this should create two files, `server.csr` and `private.key`

then

```sh
openssl x509 -req -days 365 -in server.csr -signkey private.key -out server.crt
```

