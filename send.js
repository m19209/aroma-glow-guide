import fs from 'fs';

const envRaw = fs.readFileSync('.env', 'utf8');
const env = {};
envRaw.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim().replace(/['"]/g, '');
});

const botToken = env.TELEGRAM_BOT_TOKEN;
const chatId = env.TELEGRAM_CHAT_ID;

if (botToken && chatId) {
  const message = `✅ <b>مرحباً مصطفى!</b>\n\nتم الانتهاء من جميع المهام المطلوبة في المشروع:\n- تحسين الصور (WebP)\n- إصلاح مشاكل الـ UI/UX في الموبايل\n- تحديث قاعدة البيانات وإضافة الجلسات الآمنة\n- تأمين مصادقة المستخدم وتشفير PBKDF2\n- تأمين فحص الأسعار من السيرفر عند الطلب و Rate Limits\n\nيتم الآن رفع الكود على GitHub و Vercel. 🚀`;
  
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    })
  }).then(r => r.json()).then(res => {
    console.log('Telegram response:', res);
  }).catch(console.error);
} else {
    console.log('Telegram credentials not found.');
}
