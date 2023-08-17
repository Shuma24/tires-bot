import { radiusButtons, seasonButtons, startButtons } from '../../helpers/buttons';
import { generateWidthTires } from '../../helpers/width-button.generator';

interface Button {
  text: string;
  buttons: {
    text: string;
  }[][];
}

interface ButtonMap {
  [key: string]: Button;
}

export const handleBackHomeButtons = <T extends string>(message: T, radius?: number) => {
  const set: ButtonMap = {
    '🔙 Назад': {
      text: 'Ви повернулися назад',
      buttons: startButtons,
    },
    '⬅️ Назад': {
      text: 'Ви повернулися назад',
      buttons: seasonButtons,
    },
    '↩️ Назад': {
      text: 'Ви повернулися назад',
      buttons: radiusButtons,
    },
    '👈🏻 Назад': {
      text: 'Ви повернулися назад',
      buttons: generateWidthTires(radius as number),
    },
    '🏠 Home': {
      text: 'Ви на головній',
      buttons: startButtons,
    },
  };

  const isHasValue = set[message];

  if (!isHasValue) return null;

  return isHasValue;
};
