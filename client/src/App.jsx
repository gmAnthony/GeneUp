import { LandingPage } from "./pages/LandingPage";

function App() {
  const authenticated = false;

  if (!authenticated) {
    return <LandingPage />;
  }

  return <h1>Welcome</h1>;
}

export default App;
