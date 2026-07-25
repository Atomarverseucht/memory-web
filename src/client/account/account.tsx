import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {memSets} from "../../shared/exampleSets";

type AccountData = {
    user: { id: string; name: string };
    sessions: { id: string; memSet: number; score: number; createdAt: string }[];
    totalScore: number;
};

export function Account() {
    const [searchParams] = useSearchParams();
    const accountId = searchParams.get("accountId");
    const [data, setData] = useState<AccountData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const url = accountId
            ? `/api/account?accountId=${accountId}`
            : "/api/account";

        const token = localStorage.getItem("token");

        fetch(url, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
            .then(res => {
                if (!res.ok) throw new Error(res.status === 401 ? "Not registered" : "Account was not found");
                return res.json();
            })
            .then(setData)
            .catch(err => setError(err.message));
    }, [accountId]);

    if (error) return <p style={{color: "red"}}>Error: {error}</p>;
    if (!data) return <p>Lade...</p>;

    const themeName = (memSetIndex: number) =>
        memSets[memSetIndex]?.title.name ?? `Theme ${memSetIndex}`;

    return (
        <main>
            <h2>Username: {data.user.name}</h2>
            <p>Sum of points: {data.totalScore}</p>

            <h3>Game history:</h3>
            {data.sessions.length === 0 ? (
                <p>No games played until now ;(</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Theme</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.sessions.map(s => (
                        <tr key={s.id}>
                            <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                            <td>{themeName(s.memSet)}</td>
                            <td>{s.score}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </main>
    );
}