import { type ButtonItem } from 'types/types';
import { type Themes } from 'types/types';

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
      background:
        button.backgroundColor ||
        'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300',
      textColor: button.textColor || 'text-black',
    },
    DARK: {
      background:
        button.backgroundColor ||
        'bg-gradient-to-r from-green-950 via-green-900 to-green-950',
      textColor: button.textColor || 'text-white',
    },
  };

  const colorRes = theme ? colors[theme] : colors.default;

  return colorRes;
};
