import { AnimatePresence, motion } from 'framer-motion';
import { Langs } from 'src/types/constTypes';

type Props = {
  changeTextVisible: boolean;
  text: string;
  handleOnChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextChangeComponent = ({
  text,
  changeTextVisible,
  handleOnChangeText,
}: Props) => {
  return (
    <AnimatePresence>
      {changeTextVisible && (
        <motion.div
          className="flex flex-col justify-evenly items-center w-11/12 h-[100px] 
                    border-solid border-black border-2 rounded-lg shadow-lg shadow-gray-400/50"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="flex flex-col justify-evenly items-center w-11/12 h-full">
            <h2 className="p1 text-xl">Text Change</h2>
            <div className="flex flex-row gap-1">
              <select name="lang">
                {Object.keys(Langs).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="w-11/12 h-8 border-solid border-2 border-gray-300 rounded-lg p-1"
                placeholder="Change button text..."
                onChange={handleOnChangeText}
                value={text}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default TextChangeComponent;
