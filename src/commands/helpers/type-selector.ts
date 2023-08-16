export const checkType = (type: string): string | null => {
  switch (type) {
    case '☀️ Літо':
      return 'summer';

    case '❄️ Зима':
      return 'winter';

    case '🌤 Всесезонні':
      return 'allseason';

    default:
      return null;
  }
};
