import React from "react";
import * as XLSX from "xlsx";
import usePeopleStore from "../store/people";
import useSeniorityStore from "../store/seniority";

const ReportsExportToXlsx = () => {
  const peopleStore = usePeopleStore();
  const seniorityStore = useSeniorityStore();

  const onlyBenchPeople = peopleStore.people.filter(
    (people) => people.avail.length && people.avail !== "-",
  );

  const onlyBenchPeopleObjectToExport = onlyBenchPeople.map((person) => {
    const fittedSeniority = seniorityStore.senioritis.find(
      (seniority) => seniority.uuid === person.seniority,
    );

    const re = /^([A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+[\dA-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ]*)/;
    const matchedName = person.name && re.exec(person.name);

    return {
      name: matchedName ? matchedName[0] : "-",
      position: person.position || "-",
      seniority: fittedSeniority ? fittedSeniority.text : "-",
      avail: person.avail || "-",
    };
  });

  // todo
  const handleExport = React.useCallback(() => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(onlyBenchPeopleObjectToExport);
    ws["A1"].v = "Name";
    ws["B1"].v = "Position";
    ws["C1"].v = "Seniority";
    ws["D1"].v = "Availability";

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "onlyBenchDevelopers.xlsx");
  }, [onlyBenchPeopleObjectToExport]);

  return (
    <div
      data-v-fb44b726=""
      data-v-64c6090e=""
      className="reports-export mx-2"
      onClick={handleExport}
    >
      <div
        data-v-64c6090e=""
        data-v-fb44b726=""
        className="pri-export-dropdown__list-item"
        style={{ display: "flex" }}
      >
        <i
          data-v-6b0c4438=""
          data-v-64c6090e=""
          className="pri-icon pri-xlsx"
          data-v-fb44b726=""
          style={{ fontSize: "16px", display: "inline-flex" }}
        >
          <svg
            data-v-6b0c4438=""
            height="1em"
            stroke="currentColor"
            viewBox="0 0 14 14"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 7.65217V2.65217C2 2.47921 2.07056 2.31332 2.19615 2.19102C2.32174 2.06871 2.49209 2 2.6697 2H7.41522C7.50318 1.99996 7.59028 2.0168 7.67156 2.04955C7.75284 2.0823 7.8267 2.13032 7.88892 2.19087L10.5092 4.74348C10.5716 4.804 10.6211 4.87589 10.6548 4.95504C10.6886 5.0342 10.7061 5.11906 10.7061 5.20478V7.65217"
              stroke="#currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.7061 5.26087H8.02732C7.84971 5.26087 7.67937 5.19216 7.55377 5.06985C7.42818 4.94755 7.35762 4.78166 7.35762 4.6087V2"
              stroke="#currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.90204 8.73926V11.3888C4.90204 11.5509 4.96817 11.7064 5.0859 11.8211C5.20362 11.9357 5.36329 12.0001 5.52977 12.0001H6.57629"
              stroke="#currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.25511 8.73926H8.35682C8.18195 8.73919 8.01218 8.79664 7.87504 8.9023C7.7379 9.00796 7.64143 9.15563 7.60128 9.32138C7.56112 9.48712 7.57962 9.66121 7.6538 9.81542C7.72797 9.96964 7.85345 10.0949 8.00991 10.171L8.82606 10.5684C8.98255 10.6445 9.10806 10.7698 9.18222 10.9241C9.25639 11.0783 9.27486 11.2525 9.23464 11.4182C9.19443 11.584 9.09788 11.7317 8.96066 11.8373C8.82345 11.9429 8.65361 12.0003 8.4787 12.0001H7.58086"
              stroke="#currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.3257 12.0001L12 8.73926"
              stroke="#currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12.0001L10.3257 8.73926"
              stroke="#currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.11162 12.0001L3.78587 8.73926"
              stroke="#currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.78587 12.0001L2.11162 8.73926"
              stroke="#currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
        Only Bench
      </div>
    </div>
  );
};

export default ReportsExportToXlsx;
