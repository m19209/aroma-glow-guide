import fs from 'fs';

const envRaw = fs.readFileSync('.env', 'utf8');
const env = {};
envRaw.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim().replace(/['"]/g, '');
});

const botToken = env.TELEGRAM_BOT_TOKEN;
const chatId = env.TELEGRAM_CHAT_ID;

const message = process.argv.slice(2).join(' ');

if (botToken && chatId && message) {
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: "🤖 " + message,
      parse_mode: 'HTML'
    })
  }).then(r => r.json()).then(res => {
    console.log('Reply sent!');
  }).catch(console.error);
}
