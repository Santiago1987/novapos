import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { Langs } from '@/types/constTypes';
import type { TraductionsStoreState } from '@/types/miscStore';
import type { TranslationMap } from '@/types/miscStore';
import { produce } from 'immer';

const traductionsini: TranslationMap = {
  hello: { EN: 'Hello', ES: 'Hola', NLBE: 'Bonjour' },
  NewButton: { EN: 'New Button', ES: 'Nuevo Botón', NLBE: 'Nouveau Bouton' },
  inserText: {
    EN: 'Insert Text',
    ES: 'Insertar Texto',
    NLBE: 'Insérer le texte',
  },
  textChange: {
    EN: 'Text Change',
    ES: 'Cambio de Texto',
    NLBE: 'Changement de texte',
  },
  editorMenu: {
    EN: 'Editor Menu',
    ES: 'Menú del Editor',
    NLBE: "Menu de l'éditeur",
  },
  resetLayout: {
    EN: 'Reset layout',
    ES: 'Reiniciar diseño',
    NLBE: 'Réinitialiser layout',
  },
  confirm: { EN: 'Confirm', ES: 'Confirmar', NLBE: 'Confirmer' },
  default: {
    EN: 'Insert Text',
    ES: 'Insertar Texto',
    NLBE: 'Insérer le texte',
  },
  salesBackgroundColor: {
    EN: 'Background Color',
    ES: 'Color de Fondo',
    NLBE: 'Achtergrondkleur',
  },
  dragMe: { EN: 'Drag Me', ES: 'Arrastrame', NLBE: 'Sleep Mij' },
  dimensionsSett: {
    EN: 'Dimension settings',
    ES: 'Configuracion de Dimenciones',
    NLBE: 'Afmeting Instellingen',
  },
  width: { EN: 'Width', ES: 'Ancho', NLBE: 'breedte' },
  height: { EN: 'Height', ES: 'Altura', NLBE: 'Hoogte' },
  close: { EN: 'Close', ES: 'Cerrar', NLBE: 'Dichtbij' },
  textColor: { EN: 'Text Color', ES: 'Color de Texto', NLBE: 'Tekstkleur' },
  backgroundColor: {
    EN: 'Background Color',
    ES: 'Color de Fondo',
    NLBE: 'Achtergrondkleur',
  },
  quantity: { EN: 'Quantity', ES: 'Cantidad', NLBE: 'Hoeveelheid' },
  description: { EN: 'Description', ES: 'Descripción', NLBE: 'Beschrijving' },
  unpr: { EN: 'Unit Price', ES: 'Precio Unitario', NLBE: 'Stukprijs' },
  value: { EN: 'Value', ES: 'Valor', NLBE: 'Waarde' },
  payment_method: {
    EN: 'Payment Method',
    ES: 'Metodo de Pago',
    NLBE: 'Betaallwijze',
  },
  amount: { EN: 'Amount', ES: 'Monto', NLBE: 'Aanta' },
  total: { EN: 'Total', ES: 'Total', NLBE: 'Totaal' },
  change: { EN: 'Change', ES: 'Cambio', NLBE: 'Teruggave' },
  rounding: {
    EN: 'Rounding total',
    ES: 'Redondeo total',
    NLBE: 'Afgerond totaal',
  },
  operator: { EN: 'Operator', ES: 'Operador', NLBE: 'Operator' },
  welcome: { EN: 'Welcome', ES: 'Bienvenido', NLBE: 'Welkom' },
  thankyoumessage: {
    EN: 'Thanks for coming!',
    ES: 'Gracias por venir!',
    NLBE: 'Bedankt voor je komst!',
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
