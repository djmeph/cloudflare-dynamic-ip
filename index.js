#!/usr/bin/env node
'use strict';

/**
 * Cloudflare Dynamic IP script
 */

// Declare environment variables:
const CF_EMAIL = process.env.CF_EMAIL;
const CF_KEY = process.env.CF_KEY;
const CF_ZONE_ID = process.env.CF_ZONE_ID;
const CF_ID = process.env.CF_ID;
const CF_RECORD_TYPE = process.env.CF_RECORD_TYPE;
const CF_DOMAIN = process.env.CF_DOMAIN;

// Import dependencies
const publicIp = require('public-ip');
const Cloudflare = require('cloudflare');
const { inspect } = require('util');

const go = async () => {

  try {

    const cf = new Cloudflare({
      email: CF_EMAIL,
      key: CF_KEY
    });

    const record = await cf.dnsRecords.read(CF_ZONE_ID, CF_ID);
    const currentIP = record.result.content;
    const publicIP = await publicIp.v4();

    if (currentIP !== publicIP) {
      const response = await cf.dnsRecords.edit(CF_ZONE_ID, CF_ID, {
        content: publicIP,
        type: CF_RECORD_TYPE,
        name: CF_DOMAIN
      });
      console.log(`IP Address updated to ${publicIP}`);
    }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

}

go();
