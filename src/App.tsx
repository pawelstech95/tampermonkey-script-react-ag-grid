import { useMemo, useState } from "react";
import usePeopleStore from "./store/people.ts";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community/dist/lib/entities/colDef";

function App() {
  const peopleStore = usePeopleStore();

  const [columnDefs] = useState<ColDef<(typeof peopleStore.people)[number]>[]>([
    {
      field: "name",
      pinned: "left",
      resizable: true,
      suppressMovable: true,
    },
    {
      field: "position",
      resizable: true,
      suppressMovable: true,
    },
    {
      field: "department",
      resizable: true,
      suppressMovable: true,
    },
    {
      field: "seniority",
      resizable: true,
      suppressMovable: true,
    },
    {
      field: "availability",
      resizable: true,
      suppressMovable: true,
    },
    {
      field: "avail",
      resizable: true,
      suppressMovable: true,
    },
    {
      field: "note",
      resizable: true,
      suppressMovable: true,
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      floatingFilter: true,
    }),
    [],
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 700 }}>
      <AgGridReact
        rowData={peopleStore.people}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}

export default App;
