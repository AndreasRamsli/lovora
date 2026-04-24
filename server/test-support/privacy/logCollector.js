const patchedMethods = ["log", "warn", "error"];

let originalConsoleMethods = null;
const activeCollectors = new Set();

function safeSerialize(value, seen = new WeakSet()) {
  if (typeof value === "string") return value;
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    value == null
  ) {
    return String(value);
  }
  if (typeof value === "bigint") return `${value}n`;
  if (typeof value === "symbol") return value.toString();
  if (typeof value === "function") {
    return `[Function ${value.name || "anonymous"}]`;
  }

  try {
    return JSON.stringify(value, (_, nestedValue) => {
      if (typeof nestedValue === "bigint") return `${nestedValue}n`;
      if (typeof nestedValue === "symbol") return nestedValue.toString();
      if (typeof nestedValue === "function") {
        return `[Function ${nestedValue.name || "anonymous"}]`;
      }
      if (nestedValue && typeof nestedValue === "object") {
        if (seen.has(nestedValue)) return "[Circular]";
        seen.add(nestedValue);
      }
      return nestedValue;
    });
  } catch {
    return Object.prototype.toString.call(value);
  }
}

function serializeArgs(args = []) {
  return args.map((value) => safeSerialize(value)).join(" ");
}

function ensureConsolePatched() {
  if (originalConsoleMethods) return;

  originalConsoleMethods = {};
  for (const method of patchedMethods) {
    originalConsoleMethods[method] = console[method];
    console[method] = (...args) => {
      for (const collector of activeCollectors) {
        collector.entries.push({
          level: method,
          args,
          message: serializeArgs(args),
        });
      }

      return originalConsoleMethods[method](...args);
    };
  }
}

function maybeRestoreConsole() {
  if (activeCollectors.size > 0 || !originalConsoleMethods) return;

  for (const method of patchedMethods) {
    console[method] = originalConsoleMethods[method];
  }
  originalConsoleMethods = null;
}

function createLogCollector() {
  ensureConsolePatched();

  const collector = {
    entries: [],
    restore() {
      activeCollectors.delete(collector);
      maybeRestoreConsole();
    },
    clear() {
      collector.entries.length = 0;
    },
  };

  activeCollectors.add(collector);
  return collector;
}

module.exports = {
  createLogCollector,
};
