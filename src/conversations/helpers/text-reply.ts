export const startOrder = `
<b>Окей, вас зацікавив даний продукт,</b>
<i>давайте почнемо замовлення.</i>
Введіть своє ім'я:
`;

export const userPhone = `
<b>Дякую, тепер очікую номер мобільного телефону</b>
`;

export const createOrderResponse = (
  name: string,
  phone: string,
  productName: string,
  size: string,
  type: string,
  quantity: number,
) => {
  let correctType = '';

  type === 'summer' && (correctType = 'Літо');
  type === 'winter' && (correctType = 'Зима');
  type === 'allseason' && (correctType = 'Всесезонні');

  const text = `
Вас звати <strong>${name}</strong>, номер телефону: <strong>${phone}</strong>
Ви замовили <strong>${productName}/${size}</strong> сезон: <strong>${correctType}</strong>
кількість: <strong>${quantity}</strong>
Ми з вами зв'яжемось протягом 24 годин.
`;

  return text;
};

export const orderAlert = (
  name: string,
  phone: string,
  productName: string,
  size: string,
  type: string,
  quantity: number,
  id: number,
) => {
  let correctType = '';

  type === 'summer' && (correctType = 'Літо');
  type === 'winter' && (correctType = 'Зима');
  type === 'allseason' && (correctType = 'Всесезонні');

  const text = `
<strong>${name}</strong>, номер телефону: <strong>${phone}</strong>
ЗРОБИВ ЗАМОВЛЕННЯ!
ЗАМОВИВ: <strong>${productName}/${size}</strong> сезон: <strong>${correctType}</strong>
кількість: <strong>${quantity}</strong> номер в ДБ <strong>${id}</strong>
`;

  return text;
};
