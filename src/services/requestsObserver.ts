export function observeRequests(pathRegexp: RegExp) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (
        "initiatorType" in entry &&
        entry.initiatorType === "xmlhttprequest" &&
        pathRegexp.test(entry.name) &&
        !entry.name.endsWith("fromListener=true")
      ) {
        const event = new CustomEvent("snapshot-updated", {
          detail: entry.name,
        });
        window.dispatchEvent(event);
      }
    }
  });

  observer.observe({
    entryTypes: ["resource"],
    buffered: true,
  });
}
