import type { ThemesList, SalesColumns, PaymentsColumns } from './constTypes';

export interface Layout {
  background?: string;
  size?: {
    high: string;
    width: string;
  };
  components: {
    buttons: Button[];
    tables: TableType<T>[];
  };
}

export interface Button {
  id: string;
  type: 'button' | 'submenu';
  properties: {
    label: string;
    color: string;
    onClick?: () => void;
    isClicked: boolean;
    textColor: string;
    fontSize: string;
    size?: Size;
    position: Position;
    miscStyles?: string;
  };
  subMenu?: SubMenu;
}

export interface Position {
  mode: 'absolute';
  x?: number;
  y?: number;
  gridRow?: number;
  gridCol?: number;
}

export interface Size {
  width: string;
  height: string;
}

export interface SubMenu {
  title: string;
  buttons: Button[];
}

export interface Table {
  id: string;
  type: 'sales' | 'payments' | 'promotions';
  properties: {
    headerColor?: string;
    backgroundColor?: string;
    textcolor?: string;
    size?: {
      width: string;
      height: string;
    };
    position: Position;
  };
}

export interface Sales extends Table {
  columns: {
    type: keyof typeof SalesColumns;
    title: string;
  }[];
}

export interface Payments extends Table {
  columns: {
    type: keyof typeof PaymentsColumns;
    title: string;
  }[];
}

export type TableType<T> = T extends Sales ? Sales : Payments;

export type Themes = keyof typeof ThemesList;

/*interface Animal {
  name: string;
  legs: number;
}

interface Dog extends Animal {
  bark: () => void;
}

interface Bird extends Animal {
  fly: () => void;
}

type ConditionalType<T> = T extends Dog ? 'woof' : 'chirp';

type AnimalSound<T> = T extends Dog ? Dog : (T extends Bird ? Bird : never);

function makeSound<T extends Animal>(animal: AnimalSound<T>): void {
  if (animal instanceof Dog) {
    (animal as Dog).bark();
  } else if (animal instanceof Bird) {
    (animal as Bird).fly();
  }
}

const dog: Dog = { name: 'Buddy', legs: 4, bark: () => console.log('Woof!') };
const bird: Bird = { name: 'Tweety', legs: 2, fly: () => console.log('Flying...') };

//Ejemplo de uso
const dogSound: ConditionalType<typeof dog> = 'woof'; // 'woof'
const birdSound: ConditionalType<typeof bird> = 'chirp'; // 'chirp'

makeSound(dog); // Salida: Woof!
makeSound(bird); // Salida: Flying.. */
