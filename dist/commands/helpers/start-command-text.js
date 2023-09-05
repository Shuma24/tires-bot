"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagesText = exports.workOnYouReq = exports.askAboutHeight = exports.askAboutWidth = exports.askAboutRadius = exports.askAboutSeasonType = exports.contactsFromMainMenu = exports.onlyOnePageTires = exports.noTiresLength = exports.productDescriptionGenerate = void 0;
const productDescriptionGenerate = (name, size, description, quantity, price) => {
    const captionText = `
<b>${name}/${size}</b>
<i>${description}</i>
\n
<b>Кількість:</b> ${quantity} шт.
<b>Ціна:</b> ${price} грн/шт.
    `;
    return captionText;
};
exports.productDescriptionGenerate = productDescriptionGenerate;
exports.noTiresLength = `
<b>Нажаль такого варіанту немає.</b>
Однак ви можете замовити такий варіант або уточнити наявність:
<a href="tel:+380-93-789-58-77">+380-93-789-58-77 📞</a>;
<a href="tel:+380-93-187-75-58">+380-93-187-75-58 📞</a>.
`;
exports.onlyOnePageTires = `
<b>Це всі товари</b>
Однак ви можете замовити потрібні вам шини або уточнити наявність:
<pre>
<a href="tel:+380-93-789-58-77">+380-93-789-58-77 📞</a>;
<a href="tel:+380-93-187-75-58">+380-93-187-75-58 📞</a>.
</pre>
`;
exports.contactsFromMainMenu = `
<b>Наші номера телефонів:</b>
<pre>
<a href="tel:+380-93-789-58-77">+380-93-789-58-77 📞</a>;
<a href="tel:+380-93-187-75-58">+380-93-187-75-58 📞</a>.
</pre>
`;
exports.askAboutSeasonType = `<b>Шини для якого сезону Вам потрібні?</b>`;
exports.askAboutRadius = `<b>Оберіть ДІАМЕТР</b>`;
exports.askAboutWidth = `<b>Оберіть ШИРИНУ</b>`;
exports.askAboutHeight = `<b>Оберіть потрібну ВИСОТУ ПРОФІЛЯ</b>`;
exports.workOnYouReq = `<i>Обробляю ваш запит...</i>`;
exports.pagesText = `<strong>Є ще варіанти</strong>`;
