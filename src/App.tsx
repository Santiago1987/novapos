import './App.css';
import BottomMenu from './components/ui/BottomMenu';
import MainInput from './components/ui/MainInput';
import Payments from './components/ui/Payments';
import SalesTable from './components/ui/SalesTable';

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
        <section className="payment">
          <h2>Payment Section</h2>
        </section>
        <section className="side-menu">
          <h2>Side Menu</h2>
        </section>
        <section className="bottom-menu">
          <BottomMenu />
        </section>
        <section className="number-buttons">
          <h2>Number Buttons</h2>
        </section>
      </main>
    </>
  );
}

export default App;
