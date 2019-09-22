#!/usr/bin/env node
'use strict';

/**
 * Cloudflare Dynamic IP script
 */

// Declare environment variables:
const CF_EMAIL = process.env.CF_EMAIL;
const CF_KEY = process.env.CF_KEY;
const CF_ZONE_ID = process.env.CF_ZONE_ID;
const CF_RECORD_ID = process.env.CF_RECORD_ID;
const CF_RECORD_TYPE = process.env.CF_RECORD_TYPE;
const CF_DOMAIN = process.env.CF_DOMAIN;
const SOME_EXIT_CONDITION = false;

// Import dependencies
const publicIp = require('public-ip');
const request = require('request-promise-native');

const go = async () => {

  try {

    const json = await request({
      method: 'GET',
      uri: `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/dns_records/${CF_RECORD_ID}`,
      headers: {
        'X-Auth-Email': CF_EMAIL,
        'X-Auth-Key': CF_KEY,
        'Content-Type': 'application/json'
      },
      json: true
    });

    const currentIP = json.result.content;
    const publicIP = await publicIp.v4();

    if (currentIP !== publicIP) {

      await request({
        method: 'PUT',
        uri: `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/dns_records/${CF_RECORD_ID}`,
        headers: {
          'X-Auth-Email': CF_EMAIL,
          'X-Auth-Key': CF_KEY,
          'Content-Type': 'application/json'
        },
        json: true,
        body: {
          type: 'A',
          name: CF_DOMAIN,
          content: publicIP
        }
      });

      console.log(`IP Address updated to ${publicIP}`);
    }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

}

go();

(function wait () {
   if (!SOME_EXIT_CONDITION) setTimeout(wait, 1000);
})();
