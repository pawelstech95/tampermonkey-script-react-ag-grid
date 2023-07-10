const secondaryTableSelector = ".reports-availability-table__table";

export function watchIfTableIsMounted(
  callback: (table: HTMLElement) => () => void,
) {
  let tableExists = false;
  let unmount: () => void;

  function mountTableIfNotExists() {
    if (!tableExists) {
      unmount = callback(document.querySelector(secondaryTableSelector)!);
      tableExists = true;
    }
  }

  function unmountTableIfExists() {
    if (tableExists) {
      unmount?.();
      tableExists = false;
    }
  }

  if (document.querySelector(secondaryTableSelector)) {
    mountTableIfNotExists();
  } else {
    unmountTableIfExists();
  }

  const observer = new MutationObserver(() => {
    if (document.querySelector(secondaryTableSelector)) {
      mountTableIfNotExists();
    } else {
      unmountTableIfExists();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
