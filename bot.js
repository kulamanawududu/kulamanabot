const { Telegraf } = require('telegraf');

const botToken = '6892625895:AAGH7RrTb682jwvLJv22h3OG9OWoQLWjCNM';

const bot = new Telegraf(botToken);
let respondedMembers = new Set();

bot.on('new_chat_members', (ctx) => {
  const newMembers = ctx.message.new_chat_members.map(member => member.first_name);
  ctx.reply(`Selamat datang ${newMembers.join(', ')} di DEPOWIN! 🥰 Ada yang bisa kami bantu bosku?`);
});

bot.on('left_chat_member', (ctx) => {
  const leftMember = ctx.message.left_chat_member.first_name;
  ctx.reply(`Selamat tinggal ${leftMember}! 😢`);
});

bot.on('text', async (ctx) => {
  const { message } = ctx;
  const chatId = message.chat.id;
  const userId = message.from.id;
  const text = message.text ? message.text.toLowerCase() : '';

  const isAdminOrOwner = await isUserAdminOrOwner(chatId, userId);

  if (!isAdminOrOwner) {
    let responseMessage = '';

    if (text.length < 5) {
      responseMessage = 'Selamat datang di DEPOWIN! 🥰 Ada yang bisa kami bantu bosku?';
    } else if (text.includes('link') || text.includes('ling') || text.includes('alternatif')) {
      responseMessage = 'Baik bosku, ini untuk link terupdate nya 🔗http://rebrand.ly/depowinfun🔗\nJika sudah deposit, bisa dikirimkan bukti transfernya yah bosku agar dapat lebih banyak bonus 🥰\nSemoga beruntung di putaran hari ini 😁';
    } else if (text.includes('main')) {
      responseMessage = 'Bosku boleh bermain di Pragmatic play 😍 di Jeus 1000 ❤️❤️/Pg soft mahyong ways 2';
    } else if (text.includes('proses depo') || text.includes('proses wd')) {
      responseMessage = 'Mohon ditunggu ya bosku, deposit/wd kamu sedang proses transaksi 🥰🥰';
    } else if (text.includes('mau depo') || text.includes('depo kmn')|| text.includes('deposit')) {
      responseMessage = 'Untuk depositnya ingin ke bank mana yah bosku ❤️🥰? Jangan lupa kirimkan buktinya yah bosku biar bisa di data bonus nya bos 🥰🥰';
    } else if (text.includes('rungkad') || text.includes('kalah') || text.includes('miskin') || text.includes('rungkat')) {
      responseMessage = 'Pesan khusus untuk yang selalu kalah: Jangan putus asa, keberuntungan pasti ada di depan! Semangat bosku! 💪❤️';
    } else if (text.includes('gangguan')) {
      responseMessage = 'Baik bosku, untuk perihal kendala nya akan kami cek kan yah bosku 😁, mohon kesabarannya menunggu 🙏🏻';
    } else if (text.includes('kalah terus')) {
      responseMessage = 'Pesan khusus untuk yang selalu kalah: Jangan putus asa, keberuntungan pasti ada di depan! Semangat bosku! 💪❤️';
    } else if (text.includes('apa kabar') || text.includes('gimana kabar')) {
      responseMessage = 'Kami baik-baik saja, bosku! Bagaimana dengan Anda? Ada yang bisa kami bantu?';
    } else if (text.includes('terimakasih') || text.includes('makasih') || text.includes('thanks')) {
      responseMessage = 'Sama-sama, bosku! Jangan ragu untuk bertanya jika ada yang perlu dibantu.';
    } else {
      responseMessage = 'Maaf, kami tidak dapat memahami permintaan Anda. Ada yang bisa kami bantu?';
    }

    // Tambahkan kata-kata positif untuk meningkatkan pengalaman live chat
    responseMessage += '\n\nTerima kasih sudah memilih DEPOWIN! Semoga hari Anda penuh keberuntungan dan kemenangan! 🌟😊';

    if (responseMessage) {
      ctx.reply(responseMessage);
    }
  }
});

bot.on('polling_error', (err) => console.error(err));

bot.launch();

async function isUserAdminOrOwner(chatId, userId) {
  const response = await bot.telegram.getChatMember(chatId, userId);
  return response.status === 'administrator' || response.status === 'creator';
}
