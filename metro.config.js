const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Metro 0.84 (Expo 56) changed the FileMap "change" event shape from
// { eventsQueue: [{ filePath, metadata, type }] } to
// { changes: { addedFiles, modifiedFiles, removedFiles }, rootDir }.
// react-native-css-interop 0.2.4 (bundled with nativewind 4.2.4) still emits
// the old shape, which crashes Metro's DependencyGraph and @expo/cli's own
// watcher listener every time Tailwind regenerates CSS ("Cannot read
// properties of undefined (reading 'addedFiles')").
//
// Expo replaces Metro's createFileMap with one that uses @expo/metro-file-map
// (see @expo/cli/.../createFileMap-fork.js), so we patch *that* fork's
// FileMap.prototype.emit — patching upstream metro-file-map is a no-op at
// runtime.
const translateChangeEvent = (event) => {
  const addedFiles = new Map();
  const modifiedFiles = new Map();
  const removedFiles = new Map();
  let rootDir = process.cwd();
  for (const e of event.eventsQueue) {
    if (!e || !e.filePath) continue;
    rootDir = path.dirname(e.filePath);
    const canonical = path.basename(e.filePath);
    const metadata = e.metadata ?? {};
    if (e.type === "add") addedFiles.set(canonical, metadata);
    else if (e.type === "delete") removedFiles.set(canonical, metadata);
    else modifiedFiles.set(canonical, metadata);
  }
  return { rootDir, changes: { addedFiles, modifiedFiles, removedFiles } };
};

for (const pkg of ["@expo/metro-file-map", "metro-file-map"]) {
  let FileMap;
  try {
    FileMap = require(pkg).default;
  } catch {
    continue;
  }
  if (!FileMap?.prototype?.emit) continue;
  const originalEmit = FileMap.prototype.emit;
  FileMap.prototype.emit = function (eventName, event, ...rest) {
    if (
      eventName === "change" &&
      event &&
      event.eventsQueue &&
      !event.changes
    ) {
      return originalEmit.call(this, eventName, translateChangeEvent(event), ...rest);
    }
    return originalEmit.call(this, eventName, event, ...rest);
  };
}

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
