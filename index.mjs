import fetch from 'node-fetch';
import publicIp from 'public-ip';

/**
 * Cloudflare Dynamic IP script
 */

// Declare environment variables:

const { CF_EMAIL, CF_KEY, CF_ZONE_ID, CF_RECORD_ID, CF_DOMAIN } = process.env;
const CLOUDFLARE_V4_URI = 'https://api.cloudflare.com/client/v4';

(async () => {
  // Fetch current record
  const response = await fetch(`${CLOUDFLARE_V4_URI}/zones/${CF_ZONE_ID}/dns_records/${CF_RECORD_ID}`, {
    headers: {
      'X-Auth-Email': CF_EMAIL,
      'Authorization': `Bearer ${CF_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  const json = await response.json();
  const currentIP = json.result.content;
  const publicIP = await publicIp.v4(); // Fetch Public IP

  // If no change, exit
  if (currentIP === publicIP) return;

  // Update record
  await fetch(`${CLOUDFLARE_V4_URI}/zones/${CF_ZONE_ID}/dns_records/${CF_RECORD_ID}`, {
    method: 'PUT',
    headers: {
      'X-Auth-Email': CF_EMAIL,
      'Authorization': `Bearer ${CF_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'A',
      name: CF_DOMAIN,
      content: publicIP
    })
  });

  console.log(`IP Address updated to ${publicIP}`);
})();
