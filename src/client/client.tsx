import "./styles.css";
import { createRoot } from "react-dom/client";
import Counter from "./components/Counter";
import {type MemorySet, memSets} from "../shared/MemorySet";
import UIMemSet from "./components/UIMemSet"

function App() {
    return (
      <main>
          <section className="setup">
              <article>
                  <h2>Please select your THEME</h2>
                  <p>The themes are the indicator with which set you will be playing.</p>
              </article>
              <article className="codeSection">
                  <label htmlFor="code">Code:</label>
                  <input id="code" type="text" placeholder="roomkey" maxLength={6}/>
                  <button id="submitCode" onClick={nothing}>Submit</button>
              </article>
          </section>
          <UIMemSet memSet={memSets} />
      </main>
      );
    }
createRoot(document.getElementById("app")!).render(<App/>);

function nothing() {}