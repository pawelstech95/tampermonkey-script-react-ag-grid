import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { AgGrid } from "./components/AgGrid";
import ReportsExportToXlsx from "./components/ReportsExportToXlsx";

import "./style.css";

//todo zmienic developers
//todo zmienic seniorities
function App() {
  return (
    <>
      <div className="additional-content-section">
        <ReportsExportToXlsx />
      </div>
      <AgGrid />
    </>
  );
}

export default App;
