export const generateWidthTires = (radius: number, withHomeAndBack?: boolean) => {
  if (!withHomeAndBack) {
    switch (radius) {
      case 13:
        return [
          [{ text: '110' }, { text: '120' }, { text: '125' }],
          [{ text: '130' }, { text: '135' }, { text: '140' }],
          [{ text: '145' }, { text: '150' }, { text: '155' }],
          [{ text: '165' }, { text: '175' }, { text: '185' }],
          [{ text: '195' }, { text: '205' }],
          [{ text: '↩️ Назад' }, { text: '🏠 Home' }],
        ];

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
  } else {
    switch (radius) {
      case 13:
        return [
          [{ text: '110' }, { text: '120' }, { text: '125' }],
          [{ text: '130' }, { text: '135' }, { text: '140' }],
          [{ text: '145' }, { text: '150' }, { text: '155' }],
          [{ text: '165' }, { text: '175' }, { text: '185' }],
          [{ text: '195' }, { text: '205' }],
        ];

      case 14:
        return [
          [{ text: '165' }, { text: '175' }, { text: '185' }],
          [{ text: '195' }, { text: '205' }, { text: '215' }],
        ];

      case 15:
        return [
          [{ text: '165' }, { text: '175' }, { text: '185' }],
          [{ text: '195' }, { text: '205' }, { text: '215' }],
          [{ text: '225' }, { text: '235' }, { text: '245' }],
          [{ text: '255' }, { text: '265' }],
        ];

      case 16:
        return [
          [{ text: '175' }, { text: '185' }, { text: '195' }],
          [{ text: '205' }, { text: '215' }, { text: '225' }],
          [{ text: '235' }, { text: '245' }, { text: '255' }],
          [{ text: '265' }, { text: '275' }],
        ];

      case 17:
        return [
          [{ text: '195' }, { text: '205' }, { text: '215' }],
          [{ text: '225' }, { text: '235' }, { text: '245' }],
          [{ text: '255' }, { text: '265' }, { text: '275' }],
          [{ text: '285' }],
        ];

      case 18:
        return [
          [{ text: '205' }, { text: '215' }, { text: '225' }],
          [{ text: '235' }, { text: '245' }, { text: '255' }],
          [{ text: '265' }, { text: '275' }, { text: '285' }],
          [{ text: '295' }, { text: '305' }, { text: '315' }],
          [{ text: '325' }],
        ];

      case 19:
        return [
          [{ text: '155' }, { text: '175' }, { text: '205' }],
          [{ text: '215' }, { text: '225' }, { text: '235' }],
          [{ text: '245' }, { text: '255' }, { text: '265' }],
          [{ text: '275' }, { text: '285' }, { text: '295' }],
          [{ text: '305' }, { text: '315' }, { text: '325' }],
        ];

      case 20:
        return [
          [{ text: '195' }, { text: '215' }, { text: '225' }],
          [{ text: '235' }, { text: '245' }, { text: '255' }],
          [{ text: '265' }, { text: '275' }, { text: '285' }],
          [{ text: '295' }, { text: '305' }, { text: '315' }],
          [{ text: '325' }],
        ];

      case 21:
        return [
          [{ text: '235' }, { text: '245' }, { text: '255' }],
          [{ text: '265' }, { text: '275' }, { text: '285' }],
          [{ text: '295' }, { text: '305' }, { text: '315' }],
          [{ text: '325' }],
        ];

      case 22:
        return [
          [{ text: '235' }, { text: '245' }, { text: '255' }],
          [{ text: '265' }, { text: '275' }, { text: '285' }],
          [{ text: '295' }, { text: '305' }, { text: '315' }],
          [{ text: '325' }],
        ];

      default:
        return [];
    }
  }
};
