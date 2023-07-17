import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { watchIfTableIsMounted } from "./services/domObserver.ts";
import { observeRequests } from "./services/requestsObserver.ts";
import { snapshotDataListener } from "./services/appData.ts";
import { setState } from "./store/people.ts";

observeRequests(
  new RegExp(`https://(.*)primetric.com/api/myHub/reports/snapshots/(.+)`), //todo
);

window.addEventListener("snapshot-updated", (e) => {
  if ("detail" in e) {
    //todo
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    snapshotDataListener(e.detail as string)
      .then((data) => {
        data
          ? setState({
              people: data,
            })
          : null;
      })
      .catch(console.error);
  }
});

watchIfTableIsMounted((table) => {
  console.log("-> The Tampermonkey script has been loaded");

  const rootDiv = document.createElement("div");
  table.innerHTML = "";
  table.appendChild(rootDiv);

  const paginationElements = document.querySelectorAll(
    ".reports-availability-table .pri-paginator",
  );

  if (paginationElements)
    paginationElements.forEach((element) => (element.innerHTML = ""));

  ReactDOM.createRoot(rootDiv).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );

  return () => {
    console.log("table unmounted");
  };
});
