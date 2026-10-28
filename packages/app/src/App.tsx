import { ENGINE_NAME } from "@tennis-manager/engine";

/** Platzhalterseite bis zur ersten echten Oberfläche. */
export function App() {
  return (
    <main>
      <h1>Tennis Manager</h1>
      <p>Verbunden mit: {ENGINE_NAME}</p>
    </main>
  );
}
