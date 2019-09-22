const CF_EMAIL = process.env.CF_EMAIL;
const CF_KEY = process.env.CF_KEY;
const CF_ZONE_ID = process.env.CF_ZONE_ID;
const { inspect } = require('util');

const request = require('request-promise-native');

const go = async () => {

  try {

    const json = await request({
      method: 'GET',
      uri: `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/dns_records`,
      headers: {
        'X-Auth-Email': CF_EMAIL,
        'X-Auth-Key': CF_KEY,
        'Content-Type': 'application/json'
      },
      json: true
    });

    const output = json.result.map(record => {
      return {
        id: record.id,
        name: record.name
      }
    });

    console.log(inspect(output, { colors: true, depth: Infinity }));

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

}

go();