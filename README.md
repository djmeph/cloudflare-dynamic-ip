## Node.js Dynamic IP Address script for Cloudflare hosted zones

Setup dependencies using `npm install`

### Sample script to set variables:

`start.sh`

```
#!/bin/bash
export CF_EMAIL='email@example.com'
export CF_KEY='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
export CF_ZONE_ID='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
export CF_ID='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
export CF_RECORD_TYPE='A'
export CF_DOMAIN='example.com'
npm start
```
