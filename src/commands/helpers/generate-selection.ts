export const generateSelection = (size: string, type: string) => {
  let season = '';

  type === 'summer' && (season = 'Літо');
  type === 'winter' && (season = 'Зима');
  type === 'allSeason' && (season = 'Всесезонні');

  const msg = `
 <b>Ви обрали такі настройки:</b>
    <b>Тип:</b> ${season};
    <b>size:</b> ${size};
 Очікуйте підбираю варіанти.
    `;

  return msg;
};
