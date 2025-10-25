import { devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { Langs } from 'src/types/constTypes';
import type { TraductionsStoreState } from 'src/types/traductionsStore';
import type { TranslationMap } from 'src/types/traductionsStore';

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
};

export const useTraductionsStore = create<TraductionsStoreState>()(
  devtools(
    persist(
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
          const { traductionsList } = get();
          const copyTrad = structuredClone(traductionsList);

          if (!copyTrad[id]) {
            copyTrad[id] = { EN: '' };
          }
          copyTrad[id][lang] = text;

          set({ traductionsList: copyTrad });
        },
        removeTraduction: (id) => {
          const { traductionsList } = get();
          const copyTrad = structuredClone(traductionsList);
          if (id in copyTrad) {
            delete copyTrad[id];
          }
          set(copyTrad);
        },
      }),
      { name: 'traductions-storage' }
    )
  )
);
