import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {DashboardPage} from "./pages/DashboardPage";
import { useAuthStore } from './store/useAuthStore';
import { useEffect, useState } from 'react';

function RutraProtegida(){
  const autenticado = useAuthStore((state) => state.autenticado)
  const token = useAuthStore((state) => state.token)
  const [rehit, setRehit] = useState(useAuthStore.persist.hasHydrated())


  useEffect(() => {
    const unsus = useAuthStore.persist.onFinishHydration(() => setRehit(true));
    return unsus;
} , []);

if (!rehit) {
  return null;
}
return autenticado && token ? (<DashboardPage />) : (<Navigate to="/login" replace />)
}

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<RutraProtegida/>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App
