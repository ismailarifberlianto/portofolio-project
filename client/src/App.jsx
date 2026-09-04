import AppRoutes from "./routes/AppRoutes";
import "./styles/globals.css";
import "./styles/claymorphism.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App;