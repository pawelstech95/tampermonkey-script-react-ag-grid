import { useEffect, useMemo, useState } from "react";
import usePeopleStore from "./store/people.ts";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ColDef } from "ag-grid-community/dist/lib/entities/colDef";
import ReportsExportToXlsx from "./components/ReportsExportToXlsx";
import { getDevelopers, getSeniorities } from "./services/fetchSnapshotData";
import { setState as setDeveloperState } from "./store/developers";
import { setState as setSenioritisState } from "./store/seniority";
import "./style.css";

//todo zmienic developers
//todo zmienic seniorities
function App() {
  const host = window.location.host;
  const peopleStore = usePeopleStore();

  useEffect(() => {
    const fetchData = async () => {
      const developers = await getDevelopers();
      const seniorities = await getSeniorities();

      if (developers) {
        setDeveloperState({ developers });
      }

      if (seniorities) {
        setSenioritisState({ senioritis: seniorities });
      }
    };

    fetchData(); //todo
  }, []);

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
    <>
      <div className="additional-content-section">
        <ReportsExportToXlsx />
      </div>
      <div className="ag-theme-alpine" style={{ height: 700 }}>
        <AgGridReact
          rowData={peopleStore.people}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </>
  );
}

export default App;
