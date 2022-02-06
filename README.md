## Node.js Dynamic IP Address script for Cloudflare hosted zones

Setup dependencies using `yarn install`

### Sample script to set variables:

`start.sh`

```
#!/bin/bash
CF_EMAIL='email@example.com' \
CF_KEY='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
CF_ZONE_ID='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
CF_ID='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
CF_RECORD_TYPE='A' \
CF_DOMAIN='example.com' \
yarn start
```
