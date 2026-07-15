import fs from 'fs';

const envRaw = fs.readFileSync('.env', 'utf8');
const env = {};
envRaw.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim().replace(/['"]/g, '');
});

const botToken = env.TELEGRAM_BOT_TOKEN;
const allowedChatId = env.TELEGRAM_CHAT_ID;

if (!botToken || !allowedChatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env");
    process.exit(1);
}

let lastUpdateIdFile = '.telegram_last_id';
let lastUpdateId = 0;
if (fs.existsSync(lastUpdateIdFile)) {
    lastUpdateId = parseInt(fs.readFileSync(lastUpdateIdFile, 'utf8'), 10) || 0;
}

console.log("🚀 Telegram Reactive Bridge Started. Polling...");

async function poll() {
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`);
    const data = await res.json();
    
    if (data.ok && data.result.length > 0) {
      for (const update of data.result) {
        lastUpdateId = update.update_id;
        fs.writeFileSync(lastUpdateIdFile, lastUpdateId.toString());
        
        if (update.message && update.message.text) {
            const chatId = update.message.chat.id.toString();
            if (chatId === allowedChatId) {
                console.log(`\n\n=== TELEGRAM_COMMAND_RECEIVED ===\n${update.message.text}\n=================================\n\n`);
                
                await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: "🤖 [الذكاء الاصطناعي]: تم استلام رسالتك! جاري المعالجة الفورية وتعديل الكود..."
                    })
                });
                
                // Exit to complete task and wake up the agent
                process.exit(0);
            }
        }
      }
    }
  } catch (e) {
    // Ignore timeout network errors
  }
  
  setTimeout(poll, 1000);
}

async function init() {
    try {
        const res = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates?timeout=0`);
        const data = await res.json();
        if (data.ok && data.result.length > 0) {
            const latestUpdate = data.result[data.result.length - 1];
            if (latestUpdate.update_id > lastUpdateId) {
                lastUpdateId = latestUpdate.update_id;
                fs.writeFileSync(lastUpdateIdFile, lastUpdateId.toString());
            }
        }
    } catch (e) {}
    poll();
}

init();
