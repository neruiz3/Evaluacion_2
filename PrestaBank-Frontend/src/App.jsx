import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home';
import InicioClientes from './components/InicioClientes';
import NuevoCliente from './components/NuevoCliente.jsx';
import DocumentosClientes from './components/DocumentosClientes.jsx';
import SimularCredito from './components/SimularCredito.jsx';
import Creditos from './components/CreditosClientes.jsx';
import NuevoCredito from './components/NuevoCredito.jsx';
import InicioEjecutivos from './components/InicioEjecutivos.jsx';
import InfoCredito from './components/InfoCredito.jsx';
import Informacion from './components/Informacion.jsx';
import ClientesCosto from './components/ClientesCosto.jsx';
import InfoEstado from './components/InfoEstado.jsx';
/*import EmployeeList from './components/EmployeesList';
import AddEditEmployee from './components/AddEditEmployee';
import ExtraHoursList from './components/ExtraHoursList';
import AddEditExtraHours from './components/AddEditExtraHours';
import NotFound from './components/NotFound';
import PaycheckList from './components/PaycheckList';
import PaycheckCalculate from './components/PaycheckCalculate';
import AnualReport from './components/AnualReport';*/

function App() {
  return (
      <Router>
        <Navbar></Navbar>
          <div className="container">
            <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/" element={<Home/>} />
              <Route path="/clientes/inicio" element={<InicioClientes/>} />
              <Route path="/clientes/nuevo" element={<NuevoCliente/>} />
              <Route path="/clientes/documentos/:rut" element={<DocumentosClientes/>} />
              <Route path="/clientes/editar/:id" element={<NuevoCliente/>} />
              <Route path="/clientes/simula" element={<SimularCredito/>} />
              <Route path="/clientes/solicita-credito/:rut" element={<Creditos/>} />
              <Route path="/clientes/credito/nuevo/:rut" element={<NuevoCredito/>} />
              <Route path="/ejecutivos/inicio" element={<InicioEjecutivos/>} />
              <Route path="/ejecutivos/credito-info/:id" element={<InfoCredito/>} />
              <Route path="/ejecutivos/info/:id" element={<Informacion/>} />
              <Route path="/clientes/costo-total/:id" element={<ClientesCosto/>} />
              <Route path="/clientes/seguimiento/:rut" element={<InfoEstado/>} />
            </Routes>
          </div>
      </Router>
  );
}
export default App

/*<Route path="/employee/list" element={<EmployeeList/>} />
              <Route path="/employee/add" element={<AddEditEmployee/>} />
              <Route path="/employee/edit/:id" element={<AddEditEmployee/>} />
              <Route path="/paycheck/list" element={<PaycheckList/>} />
              <Route path="/paycheck/calculate" element={<PaycheckCalculate/>} />
              <Route path="/reports/AnualReport" element={<AnualReport/>} />
              <Route path="/extraHours/list" element={<ExtraHoursList/>} />
              <Route path="/extraHours/add" element={<AddEditExtraHours/>} />
              <Route path="/extraHours/edit/:id" element={<AddEditExtraHours/>} />
              <Route path="*" element={<NotFound/>} />*/