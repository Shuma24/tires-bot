export const productDescriptionGenerate = (
  name: string,
  size: string,
  description: string,
  quantity: number,
  price: number,
) => {
  const captionText = `
<b>${name}/${size}</b>
<i>${description}</i>
\n
<b>Кількість:</b> ${quantity} шт.
<b>Ціна:</b> ${price} грн.
    `;

  return captionText;
};

export const noTiresLength = `
<b>Нажаль такого варіанту немає.</b>
Однак ви можете замовити такий варіант або уточнити наявність:
<a href="tel:+380XXXXXXXXX">+380XXXXXXXXX 📞</a>;
<a href="tel:+380XXXXXXXXX">+380XXXXXXXXX 📞</a>;
<a href="tel:+380XXXXXXXXX">+380XXXXXXXXX 📞</a>.
`;

export const onlyOnePageTires = `
<b>Це всі товари</b>
Однак ви можете замовити потрібні вам шини або уточнити наявність:
<pre>
<a href="tel:+380XXXXXXXXX">+380XXXXXXXXX 📞</a>;
<a href="tel:+380XXXXXXXXX">+380XXXXXXXXX 📞</a>;
<a href="tel:+380XXXXXXXXX">+380XXXXXXXXX 📞</a>.
</pre>
`;

export const contactsFromMainMenu = `
<b>Наші номера телефонів:</b>
<pre>
<a href="tel:+3800000000">+38000000 📞</a>;
<a href="tel:+3800000000">+38000000 📞</a>;
<a href="tel:+3800000000">+38000000X 📞</a>.
</pre>
`;

export const askAboutSeasonType = `<b>Шини для якого сезону Вам потрібні?</b>`;

export const askAboutRadius = `<b>Оберіть ДІАМЕТР</b>`;

export const askAboutWidth = `<b>Оберіть ШИРИНУ</b>`;

export const askAboutHeight = `<b>Оберіть потрібну ВИСОТУ ПРОФІЛЯ</b>`;

export const workOnYouReq = `<i>Обробляю ваш запит...</i>`;

export const pagesText = `<strong>Є ще варіанти</strong>`;
