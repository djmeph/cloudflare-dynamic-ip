import fetch from 'node-fetch';

const { CF_EMAIL, CF_KEY, CF_ZONE_ID } = process.env;

(async () => {
  const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/dns_records`, {
    headers: {
      'X-Auth-Email': CF_EMAIL,
      'Authorization': `Bearer ${CF_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  const json = await response.json();

  console.log(json.result.map((record) => ({ id: record.id, name: record.name })));
})();
