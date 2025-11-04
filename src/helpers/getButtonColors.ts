/*import { type ButtonItem } from 'types/types';
import { type Themes } from 'types/types';

export const getMainColors = (theme: Themes) => {
  const colors = {
    default: {
      background: 'bg-white',
      textColor: 'text-black',
    },
    LIGHT: {
      background: 'bg-white',
      textColor: 'text-black',
    },
    DARK: {
      background: 'bg-gray-950',
      textColor: 'text-white',
    },
    DARKBLUE: {
      background: 'bg-white',
      textColor: 'text-black',
    },
    GREEN: {
      background: 'bg-white',
      textColor: 'text-white',
    },
  };

  const colorRes = theme ? colors[theme] : colors.default;

  return colorRes;
};

export const getButtonColors = ({
  button,
  theme,
}: {
  button: ButtonItem;
  theme?: Themes;
}): {
  background: string;
  textColor: string;
} => {
  const colors = {
    default: {
      background:
        button.backgroundColor ||
        'bg-gradient-to-r from-green-950 via-green-900 to-green-950',
      textColor: button.textColor || 'text-white',
    },
    LIGHT: {
      background: button.backgroundColor || 'bg-white',
      textColor: button.textColor || 'text-black',
    },
    DARK: {
      background:
        button.backgroundColor ||
        'bg-gradient-to-r from-blue-950 via-blue-800 to-blue-950',
      textColor: button.textColor || 'text-white',
    },
    DARKBLUE: {
      background:
        button.backgroundColor ||
        'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700',
      textColor: button.textColor || 'text-white',
    },
    GREEN: {
      background:
        button.backgroundColor ||
        'bg-gradient-to-r from-green-950 via-green-900 to-green-950',
      textColor: button.textColor || 'text-white',
    },
  };

  const colorRes = theme ? colors[theme] : colors.default;

  return colorRes;
};*/
