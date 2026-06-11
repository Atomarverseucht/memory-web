import { createRoot } from "react-dom/client";
import {type MemorySet} from "../shared/MemorySet";
import UIMemSet from "./components/UIMemSet"
import {CodeSection} from "./components/codeSection";
import {memSets} from "../shared/exampleSets";

function App() {
    return (
      <main>
          <section className="setup">
              <article>
                  <h2>Please select your THEME</h2>
                  <p>The themes are the indicator with which set you will be playing.</p>
              </article>
              <CodeSection />
          </section>
          <UIMemSet memSet={memSets} />
      </main>
      );
    }
createRoot(document.getElementById("app")!).render(<App/>);