import './App.css';
import BottomMenu from './components/ui/BottomMenu';
import MainInput from './components/ui/MainInput';
import Payments from './components/ui/Payments';
import SalesTable from './components/ui/SalesTable';
import NumbersButtons from './components/ui/NumbersButtons';
import SideMenu from './components/ui/SideMenu';
import TotalsComponent from './components/ui/TotalsComponent';
import Miselaneos from './components/common/Miselaneos';

function App() {
  return (
    <>
      <main>
        <section className="main-input">
          <MainInput textLabel="Receipt from Monday 31 Jun" />
        </section>
        <section className="sales-grid">
          <SalesTable salesData={[]} />
          <Payments />
        </section>
        <section className="totals-grid">
          <Miselaneos />
          <TotalsComponent />
        </section>
        <section className="side-menu">
          <SideMenu />
        </section>
        <section className="bottom-menu">
          <BottomMenu />
        </section>
        <section className="number-buttons">
          <NumbersButtons />
        </section>
      </main>
    </>
  );
}

export default App;
