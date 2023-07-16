import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community/dist/lib/entities/colDef";
import { CellValueChangedEvent } from "ag-grid-community";
import usePeopleStore from "../store/people";
import { useEffect, useMemo, useState } from "react";
import {
  getDevelopers,
  getSeniorities,
  updateDeveloperNotes,
} from "../services/fetchData";
import { marked } from "marked";
import { setState as setDeveloperState } from "../store/developers";
import { setState as setSenioritisState } from "../store/seniority";

import { Person } from "../types";

export const AgGrid = () => {
  const host = window.location.host;
  const body = document.body;
  const theme = body.getAttribute("theme");
  const refreshButton = document.querySelector(
    ".reports-top-bar__refresh-button",
  ) as HTMLButtonElement;
  const switchButton = document.querySelector(
    ".custom-control.custom-switch",
  ) as HTMLInputElement;

  const peopleStore = usePeopleStore();
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  useEffect(() => {
    if (theme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
    switchButton.addEventListener("click", () => refreshButton.click());
  }, [refreshButton, switchButton, theme]);

  const [columnDefs] = useState<ColDef<(typeof peopleStore.people)[number]>[]>([
    {
      field: "name",
      valueFormatter: (params) => {
        return (params.node && params.node.id) + " " + params.value;
      }, // todo to remove
      cellClass: "ag-grid-name-field",
      onCellClicked: (params) => {
        if (params.data?.uuid) {
          const url = `https://${host}/developer/${params.data.uuid}/calendar`;
          window.open(url, "_blank");
        }
      },
      pinned: "left",
    },
    {
      field: "position",
    },
    {
      field: "department",
    },
    {
      field: "seniority",
    },
    {
      field: "availability",
    },
    {
      field: "avail",
    },
    {
      field: "note",
      cellRendererSelector: (params) => {
        const noteContent = params.value as string;
        const markdownContent = marked.parse(noteContent);

        const noteDetails = {
          component: () => (
            <span dangerouslySetInnerHTML={{ __html: markdownContent }} />
          ),
        };
        if (params.data) {
          if (params.data.note) return noteDetails;
        }
        return undefined;
      },
      editable: true,
      autoHeight: true,
      suppressAutoSize: true,
      initialWidth: 600,
      wrapText: true,
    },
  ]);

  const defaultColDef: ColDef = useMemo(
    () => ({
      filter: true,
      resizable: true,
      sortable: true,
      suppressMovable: true,
      floatingFilter: false,
    }),
    [],
  );
  return (
    <div
      className={`ag-theme-alpine${isDarkMode ? " ag-theme-alpine-dark" : ""}`}
    >
      <AgGridReact
        rowData={peopleStore.people}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows
        onCellValueChanged={(
          { data }: CellValueChangedEvent<Person>, // todo
        ) => {
          updateDeveloperNotes(data.uuid, data.note);
          refreshButton && refreshButton.click();
        }}
      />
    </div>
  );
};
