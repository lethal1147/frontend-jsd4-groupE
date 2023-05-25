import { useAuth } from "./contexts/authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import '../src/assets/styles/App.css'

function App() {
  const auth = useAuth();
  return (
    <div className="App">
      {auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
