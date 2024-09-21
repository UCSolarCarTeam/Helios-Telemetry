#!/bin/bash

# Let's Encrypt SSL certificate request (standalone)
certbot certonly --standalone -d $DOMAIN -m $EMAIL --agree-tos --no-eff-email


# Start the server
npm run start