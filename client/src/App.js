import './App.css';
import User from './User';

function App() {
  return (<>
    <h3>Type Twitter handle here to retrieve user's tweets</h3>
    <div className="twitter-app">
       <User/>
    </div>
    </>
  );
}

export default App;
