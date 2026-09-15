import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import { DEFAULT_LANG } from "./i18n";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
        <Route path="/:lang" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="faq" element={<Faq />} />
        </Route>
        <Route path="*" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
