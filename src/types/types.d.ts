import type { ThemesList } from './constTypes';

export interface ButtonItem {
  id: number;
  title: string;
  onClick?: () => void;
  isClicked: boolean;
  backgroundColor?: string;
  textColor?: string;
  subMenu?: {
    title: string;
    buttons: ButtonItem[];
  };
}

export interface SubMenu {
  title: string;
  buttons: ButtonItem[];
}

export type Themes = keyof typeof ThemesList;
