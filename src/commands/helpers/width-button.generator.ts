export const generateWidthTires = (radius: number) => {
  switch (radius) {
    case 14:
      return [
        [{ text: '165' }, { text: '175' }, { text: '185' }],
        [{ text: '195' }, { text: '205' }, { text: '215' }],
        [{ text: '↩️ Назад' }, { text: '🏠 Home' }],
      ];

    case 15:
      return [
        [{ text: '165' }, { text: '175' }, { text: '185' }],
        [{ text: '195' }, { text: '205' }, { text: '215' }],
        [{ text: '225' }, { text: '235' }, { text: '245' }],
        [{ text: '255' }, { text: '265' }],
        [{ text: '↩️ Назад' }, { text: '🏠 Home' }],
      ];

    case 16:
      return [
        [{ text: '175' }, { text: '185' }, { text: '195' }],
        [{ text: '205' }, { text: '215' }, { text: '225' }],
        [{ text: '235' }, { text: '245' }, { text: '255' }],
        [{ text: '265' }, { text: '275' }],
        [{ text: '↩️ Назад' }, { text: '🏠 Home' }],
      ];

    case 17:
      return [
        [{ text: '195' }, { text: '205' }, { text: '215' }],
        [{ text: '225' }, { text: '235' }, { text: '245' }],
        [{ text: '255' }, { text: '265' }, { text: '275' }],
        [{ text: '285' }, { text: '↩️ Назад' }, { text: '🏠 Home' }],
      ];

    case 18:
      return [
        [{ text: '205' }, { text: '215' }, { text: '225' }],
        [{ text: '235' }, { text: '245' }, { text: '255' }],
        [{ text: '265' }, { text: '275' }, { text: '285' }],
        [{ text: '295' }, { text: '305' }, { text: '315' }],
        [{ text: '325' }, { text: '↩️ Назад' }, { text: '🏠 Home' }],
      ];

    case 19:
      return [
        [{ text: '155' }, { text: '175' }, { text: '205' }],
        [{ text: '215' }, { text: '225' }, { text: '235' }],
        [{ text: '245' }, { text: '255' }, { text: '265' }],
        [{ text: '275' }, { text: '285' }, { text: '295' }],
        [{ text: '305' }, { text: '315' }, { text: '325' }],
        [{ text: '↩️ Назад' }, { text: '🏠 Home' }],
      ];

    case 20:
      return [
        [{ text: '195' }, { text: '215' }, { text: '225' }],
        [{ text: '235' }, { text: '245' }, { text: '255' }],
        [{ text: '265' }, { text: '275' }, { text: '285' }],
        [{ text: '295' }, { text: '305' }, { text: '315' }],
        [{ text: '325' }, { text: '↩️ Назад' }, { text: '🏠 Home' }],
      ];

    case 21:
      return [
        [{ text: '235' }, { text: '245' }, { text: '255' }],
        [{ text: '265' }, { text: '275' }, { text: '285' }],
        [{ text: '295' }, { text: '305' }, { text: '315' }],
        [{ text: '325' }, { text: '↩️ Назад' }, { text: '🏠 Home' }],
      ];

    case 22:
      return [
        [{ text: '235' }, { text: '245' }, { text: '255' }],
        [{ text: '265' }, { text: '275' }, { text: '285' }],
        [{ text: '295' }, { text: '305' }, { text: '315' }],
        [{ text: '325' }, { text: '↩️ Назад' }, { text: '🏠 Home' }],
      ];

    default:
      return [[{ text: '↩️ Назад' }, { text: '🏠 Home' }]];
  }
};
