import Editor from '@/components/main/Editor';
import '@/App.css';
import CustomerView from '@/components/main/CustomerView';

function App() {
  return (
    <>
      <main className="w-full h-full">
        <CustomerView />
        <Editor />
      </main>
    </>
  );
}

export default App;
