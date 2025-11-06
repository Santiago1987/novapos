import Editor from '@/components/main/Editor';
import '@/App.css';
import CustomerView from '@/components/main/CustomerView';

function App() {
  return (
    <>
      <main className="w-screen h-screen">
        <CustomerView />
        <Editor />
      </main>
    </>
  );
}

export default App;
