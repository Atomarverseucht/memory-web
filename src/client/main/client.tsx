import { createRoot } from "react-dom/client";
import {type MemorySet} from "../../shared/MemorySet";
import UIMemSet from "./components/UIMemSet"
import {CodeSection} from "./components/codeSection";
import {useEffect, useState} from "react";
import type {startPayload} from "../../shared/Payload";

export function HomePage() {
    const [data, setData] = useState<startPayload>({sets: []});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/memSets")
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json: startPayload) => {
                setData(json);
                setLoading(false);
                console.log(json)
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Load...</p>;
    if (error) return <p style={{color: "red"}}>Error: {error}</p>;

    return (
      <main>
          <section className="setup">
              <article>
                  <h2>Please select your THEME</h2>
                  <p>The themes are the indicator with which set you will be playing.</p>
              </article>
              <CodeSection />
          </section>
          <UIMemSet memSet={data} />
      </main>
      );
    }