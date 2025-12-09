import { useCustomerViewStore } from '@/store/CustomerViewStore';
import { useTraductionsStore } from '@/store/TraductionStore';
import { ComponentTypes } from '@/types/constTypes';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { keysOf } from '@/types/constTypes';
import { ArrowDown } from '@/components/icons/SVGIcons';
import ComponentSelect from './ComponentItem';

type Components = keyof typeof ComponentTypes;

const ComponentCB = () => {
  const { t } = useTraductionsStore();
  const lang = useCustomerViewStore((state) => state.layout.lang);

  const componentList = Object.values(ComponentTypes);
  const componentKeys = keysOf(ComponentTypes);

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Components | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filtrado
  const filtered =
    query === ''
      ? componentList
      : componentList.filter((p) =>
          p.toLowerCase().includes(query.toLowerCase())
        );

  // Reset del índice cuando cambie el filtro
  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  // Manejo de teclado
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(
          (prev) => (prev - 1 + filtered.length) % filtered.length
        );
      } else if (e.key === 'Enter' && filtered.length > 0) {
        e.preventDefault();
        const cp = componentKeys[highlightedIndex];
        setSelected(cp);
        setIsOpen(false);
        setQuery('');
        inputRef.current?.blur();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen, filtered, highlightedIndex]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (idx: number) => {
    const cp = componentKeys[idx];
    setSelected(cp);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const getDisplayValue = (key: keyof typeof ComponentTypes | null) => {
    if (!key) return '';
    const index = componentKeys.indexOf(key);
    return componentList[index] || key; // Fallback a key si no encuentra
  };

  return (
    <div className="w-11/12 mx-auto border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50">
      <div ref={dropdownRef} className="relative">
        <div className="relative p-1">
          <input
            ref={inputRef}
            type="text"
            value={selected ? getDisplayValue(selected) : query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
              setIsOpen(true);
            }}
            placeholder={t('searchComponent', lang)}
            className={`w-full rounded-lg border bg-white py-3 pl-4 pr-12 text-sm shadow-sm transition-all duration-200              
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              ${isOpen || selected ? 'border-indigo-500' : 'border-gray-300'}`}
          />

          <button
            onClick={() => {
              setIsOpen(!isOpen);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-3 mouse-pointer"
          >
            <div
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            >
              <ArrowDown style={{ width: '1.5em', height: '1.5em' }} />
            </div>
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute z-20 mt-2 w-full rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5"
            >
              <div className="flex flex-col max-h-64 overflow-y-auto overflow-x-hidden py-2 gap-1 justify-center items-center">
                {filtered.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    {t('noComponentsFound', lang)}
                  </div>
                ) : (
                  filtered.map((cp, index) => {
                    //const key = filteredKeys[index];
                    const idx = componentKeys[index];
                    return (
                      <ComponentSelect
                        key={idx}
                        idx={idx}
                        index={index}
                        cp={cp}
                        handleSelect={handleSelect}
                      />
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ComponentCB;
