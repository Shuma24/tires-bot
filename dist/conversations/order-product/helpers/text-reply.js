"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderAlert = exports.createOrderResponse = exports.userPhone = exports.startOrder = void 0;
exports.startOrder = `
<b>Для замовлення</b>
Введіть своє ім'я:
`;
exports.userPhone = `
<b>Дякую, тепер очікую номер мобільного телефону</b>
`;
const createOrderResponse = (name, phone, productName, size, type, quantity) => {
    let correctType = '';
    type === 'summer' && (correctType = 'Літо');
    type === 'winter' && (correctType = 'Зима');
    type === 'allseason' && (correctType = 'Всесезонні');
    const text = `
Вас звати <strong>${name}</strong>, номер телефону: <strong>${phone}</strong>
Ви замовили <strong>${productName}/${size}</strong> сезон: <strong>${correctType}</strong>
кількість: <strong>${quantity}</strong>
Ми з вами зв'яжемось протягом години.
`;
    return text;
};
exports.createOrderResponse = createOrderResponse;
const orderAlert = (name, phone, productName, size, type, quantity, id, telegramID) => {
    let correctType = '';
    type === 'summer' && (correctType = 'Літо');
    type === 'winter' && (correctType = 'Зима');
    type === 'allseason' && (correctType = 'Всесезонні');
    const text = `
<strong>${name}</strong>, номер телефону: <strong>${phone}</strong>
ЗРОБИВ ЗАМОВЛЕННЯ!
ЗАМОВИВ: <strong>${productName}/${size}</strong> сезон: <strong>${correctType}</strong>
кількість: <strong>${quantity}</strong> номер в ДБ: <strong>${id}</>
<strong>USER TG ID: ${telegramID}</strong>
`;
    return text;
};
exports.orderAlert = orderAlert;
