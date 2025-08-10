import './App.css';
import BottomMenu from './components/ui/BottomMenu';
import MainInput from './components/ui/MainInput';
import Payments from './components/ui/Payments';
import SalesTable from './components/ui/SalesTable';
import NumbersButtons from './components/ui/NumbersButtons';
import SideMenu from './components/ui/SideMenu';
import TotalsComponent from './components/ui/TotalsComponent';
import Miselaneos from './components/common/Miselaneos';
import { type ButtonItem, type Themes } from './types/types';
import { getMainColors } from './helpers/getButtonColors';
import { useState } from 'react';

const exampleButtons: ButtonItem[] = [
  { id: 1, title: 'Agregar Producto', onClick: () => {}, isClicked: false },
  { id: 2, title: 'Buscar Producto', onClick: () => {}, isClicked: false },
  { id: 3, title: 'Calcular Total', onClick: () => {}, isClicked: false },
  { id: 4, title: 'Aplicar Descuento', onClick: () => {}, isClicked: false },
  { id: 5, title: 'Eliminar Item', onClick: () => {}, isClicked: false },
  { id: 6, title: 'Pagar en Efectivo', onClick: () => {}, isClicked: false },
  { id: 7, title: 'Pagar con Tarjeta', onClick: () => {}, isClicked: false },
  { id: 8, title: 'Imprimir Recibo', onClick: () => {}, isClicked: false },
  { id: 9, title: 'Abrir Cajón', onClick: () => {}, isClicked: false },
  { id: 10, title: 'Anular Venta', onClick: () => {}, isClicked: false },
  { id: 11, title: 'Consultar Stock', onClick: () => {}, isClicked: false },
  { id: 12, title: 'Agregar Cliente', onClick: () => {}, isClicked: false },
  { id: 13, title: 'Aplicar Promoción', onClick: () => {}, isClicked: false },
  { id: 14, title: 'Devolver Producto', onClick: () => {}, isClicked: false },
  { id: 15, title: 'Cerrar Turno', onClick: () => {}, isClicked: false },
  { id: 16, title: 'Generar Reporte', onClick: () => {}, isClicked: false },
  { id: 17, title: 'Pesaje Automático', onClick: () => {}, isClicked: false },
  { id: 18, title: 'Escaneo Código', onClick: () => {}, isClicked: false },
  { id: 19, title: 'Cobrar Cuotas', onClick: () => {}, isClicked: false },
  { id: 20, title: 'Finalizar Compra', onClick: () => {}, isClicked: false },
  {
    id: 21,
    title: 'Metodos de Pagos',
    onClick: () => {},
    isClicked: false,
    subMenu: {
      title: 'Payment method list',
      buttons: [
        {
          id: 1,
          title: 'Agregar Producto',
          onClick: () => {},
          isClicked: false,
        },
        {
          id: 2,
          title: 'Buscar Producto',
          onClick: () => {},
          isClicked: false,
        },
        { id: 3, title: 'Calcular Total', onClick: () => {}, isClicked: false },
        {
          id: 4,
          title: 'Aplicar Descuento',
          onClick: () => {},
          isClicked: false,
        },
        { id: 5, title: 'Eliminar Item', onClick: () => {}, isClicked: false },
        {
          id: 6,
          title: 'Pagar en Efectivo',
          onClick: () => {},
          isClicked: false,
        },
        {
          id: 7,
          title: 'Pagar en Efectivo',
          onClick: () => {},
          isClicked: false,
        },
        {
          id: 8,
          title: 'Pagar en Efectivo',
          onClick: () => {},
          isClicked: false,
        },
        {
          id: 9,
          title: 'Pagar en Efectivo',
          onClick: () => {},
          isClicked: false,
        },
      ],
    },
  },
];

function App() {
  const [theme, setTheme] = useState<Themes>('GREEN');
  const mainColors = getMainColors(theme);

  const onChangeTheme = (them: Themes) => {
    setTheme(them);
  };
  return (
    <>
      <main className={`${mainColors.background} ${mainColors.textColor}`}>
        <section className="main-input">
          <MainInput textLabel="Receipt from Monday 31 Jun" theme={theme} />
        </section>
        <section className="sales-grid">
          <SalesTable salesData={[]} theme={theme} />
          <Payments theme={theme} />
        </section>
        <section className="totals-grid">
          <Miselaneos theme={theme} onChangeTheme={onChangeTheme} />
          <TotalsComponent theme={theme} />
        </section>
        <section className="side-menu">
          <SideMenu theme={theme} />
        </section>
        <section className="bottom-menu">
          <BottomMenu buttons={exampleButtons} theme={theme} />
        </section>
        <section className="number-buttons">
          <NumbersButtons />
        </section>
      </main>
    </>
  );
}

export default App;
