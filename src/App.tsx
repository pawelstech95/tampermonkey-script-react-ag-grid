import { useMemo, useState } from "react";
import usePeopleStore from "./store/people.ts";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community/dist/lib/entities/colDef";

function App() {
  const host = window.location.host;
  const peopleStore = usePeopleStore();

  const [columnDefs] = useState<ColDef<(typeof peopleStore.people)[number]>[]>([
    {
      field: "name",

      onCellClicked: (params) => {
        if (params.data?.uuid) {
          const url = `https://${host}/developer/${params.data.uuid}/calendar`;
          window.open(url, "_blank");
        }
      },
      pinned: "left",
      filter: true,
      resizable: true,
      suppressMovable: true,
    },
    {
      field: "position",
      filter: true,
      resizable: true,
      suppressMovable: true,
    },
    {
      field: "department",
      filter: true,
      resizable: true,
      suppressMovable: true,
    },
    {
      field: "seniority",
      filter: true,
      resizable: true,
      suppressMovable: true,
    },
    {
      field: "availability",
      filter: true,
      resizable: true,
      suppressMovable: true,
    },
    {
      field: "avail",
      filter: true,
      resizable: true,
      suppressMovable: true,
    },
    {
      field: "note",
      filter: true,
      editable: true,
      resizable: true,
      suppressMovable: true,
      autoHeight: true,
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      floatingFilter: false,
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
