exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  try {
    const { session_id, emp_name } = JSON.parse(event.body);
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const hrChatId = process.env.HR_TELEGRAM_ID;

    if (!botToken || !hrChatId) {
      return { statusCode: 200, body: JSON.stringify({ ok: true, skipped: true }) };
    }

    const text = `🎉 Оценка компетенций для *${emp_name}* завершена!\n\nВсе участники заполнили формы.\n\nПосмотреть результаты: https://p2p-assessment.netlify.app`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: hrChatId,
        text,
        parse_mode: 'Markdown'
      })
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
