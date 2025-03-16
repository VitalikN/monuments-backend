const { ctrlWrapper } = require('../helpers');
const { SendMessage } = require('../models/sendMessage');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const sendMessage = async (req, res) => {
  const { tel, name } = req.body;
  if (!tel || !name) {
    throw HttpError(400, 'Усі поля обовʼязкові для заповнення');
  }

  const message = `Нове повідомлення з сайту Granite Monuments:\n\nІм'я: ${name}\nТелефон: ${tel}`;

  // Відправка повідомлення в Telegram
  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    }
  );

  const result = await telegramResponse.json();

  if (!result.ok) {
    throw HttpError(500, 'Не вдалося відправити повідомлення в Telegram');
  }

  // Збереження в базу даних
  const savedMessage = await SendMessage.create({ tel, name });

  return res.status(201).json({
    message: 'Повідомлення успішно відправлено та збережено',
    data: savedMessage,
  });
};
module.exports = { sendMessage: ctrlWrapper(sendMessage) };
