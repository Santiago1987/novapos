import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { Langs } from '@/types/constTypes';
import type { TraductionsStoreState } from '@/types/miscStore';
import type { TranslationMap } from '@/types/miscStore';
import { produce } from 'immer';

const traductionsini: TranslationMap = {
  hello: { EN: 'Hello', ES: 'Hola', BE: 'Bonjour' },
  NewButton: { EN: 'New Button', ES: 'Nuevo Botón', BE: 'Nouveau Bouton' },
  inserText: {
    EN: 'Insert Text',
    ES: 'Insertar Texto',
    BE: 'Insérer le texte',
  },
  textChange: {
    EN: 'Text Change',
    ES: 'Cambio de Texto',
    BE: 'Changement de texte',
  },
  editorMenu: {
    EN: 'Editor Menu',
    ES: 'Menú del Editor',
    BE: "Menu de l'éditeur",
  },
  resetLayout: {
    EN: 'Reset layout',
    ES: 'Reiniciar diseño',
    BE: 'Réinitialiser layout',
  },
  confirm: { EN: 'Confirm', ES: 'Confirmar', BE: 'Confirmer' },
  default: { EN: 'Insert Text', ES: 'Insertar Texto', BE: 'Insérer le texte' },
  salesBackgroundColor: {
    EN: 'Background Color',
    ES: 'Color de Fondo',
    BE: 'Achtergrondkleur',
  },
  dragMe: { EN: 'Drag Me', ES: 'Arrastrame', BE: 'Sleep Mij' },
  dimensionsSett: {
    EN: 'Dimension settings',
    ES: 'Configuracion de Dimenciones',
    BE: 'Afmeting Instellingen',
  },
  width: { EN: 'Width', ES: 'Ancho', BE: 'breedte' },
  height: { EN: 'Height', ES: 'Altura', BE: 'Hoogte' },
  close: { EN: 'Close', ES: 'Cerrar', BE: 'Dichtbij' },
  textColor: { EN: 'Text Color', ES: 'Color de Texto', BE: 'Tekstkleur' },
  backgroundColor: {
    EN: 'Background Color',
    ES: 'Color de Fondo',
    BE: 'Achtergrondkleur',
  },
  quantity: { EN: 'Quantity', ES: 'Cantidad', BE: 'Hoeveelheid' },
  description: { EN: 'Description', ES: 'Descripción', BE: 'Beschrijving' },
  unpr: { EN: 'Unit Price', ES: 'Precio Unitario', BE: 'Stukprijs' },
  value: { EN: 'Value', ES: 'Valor', BE: 'Waarde' },
  payment_method: {
    EN: 'Payment Method',
    ES: 'Metodo de Pago',
    BE: 'Betaallwijze',
  },
  amount: { EN: 'Amount', ES: 'Monto', BE: 'Aanta' },
  total: { EN: 'Total', ES: 'Total', BE: 'Totaal' },
  change: { EN: 'Change', ES: 'Cambio', BE: 'Teruggave' },
  rounding: {
    EN: 'Rounding total',
    ES: 'Redondeo total',
    BE: 'Afgerond totaal',
  },
  operator: { EN: 'Operator', ES: 'Operador', BE: 'Operator' },
  welcome: { EN: 'Welcome', ES: 'Bienvenido', BE: 'Welkom' },
  thankyoumessage: {
    EN: 'Thanks for coming!',
    ES: 'Gracias por venir!',
    BE: 'Bedankt voor je komst!',
  },
};

export const useTraductionsStore = create<TraductionsStoreState>()(
  devtools(
    (set, get) => ({
      traductionsList: traductionsini,
      t: (key?: string, lang?: keyof typeof Langs): string => {
        const defaultLang = 'EN' as keyof typeof Langs;
        const resolvedLang = lang ?? defaultLang;

        const { traductionsList } = get();

        if (!key || !traductionsList[key]) {
          return traductionsList['default'][resolvedLang] ?? '';
        }
        return traductionsList[key][resolvedLang] ?? '';
      },
      updateTraduction: (id, text, lang) => {
        set(
          produce((state: TraductionsStoreState) => {
            if (!state.traductionsList[id]) {
              state.traductionsList[id] = { EN: '' };
            }

            state.traductionsList[id][lang] = text;
          })
        );
      },
      removeTraduction: (id) => {
        set(
          produce((state: TraductionsStoreState) => {
            delete state.traductionsList[id];
          })
        );
      },
    }),
    { name: 'traductions-storage' }
  )
);
