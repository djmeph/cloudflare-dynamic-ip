import fetch from 'node-fetch';

const { CF_EMAIL, CF_KEY } = process.env;

(async () => {
  const response = await fetch('https://api.cloudflare.com/client/v4/zones', {
    headers: {
      'X-Auth-Email': CF_EMAIL,
      'Authorization': `Bearer ${CF_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  const json = await response.json();

  console.log(json.result.map((zone) => ({ id: zone.id, name: zone.name })));
})();
