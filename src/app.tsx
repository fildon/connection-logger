import { useEffect, useState } from "react";

type ConnectionEvent = {
	type: "online" | "offline";
	/**
	 * Date.now() integer
	 */
	when: number;
};

export const App = () => {
	const [connectionEvents, setConnectionEvents] = useState<
		Array<ConnectionEvent>
	>(() => [
		{ when: Date.now(), type: navigator.onLine ? "online" : "offline" },
	]);

	useEffect(() => {
		const offlineHandler = () => {
			setConnectionEvents((prev) => [
				{ when: Date.now(), type: "offline" },
				...prev,
			]);
		};
		const onlineHandler = () => {
			setConnectionEvents((prev) => [
				{ when: Date.now(), type: "online" },
				...prev,
			]);
		};
		window.addEventListener("offline", offlineHandler);
		window.addEventListener("online", onlineHandler);
		return () => {
			window.removeEventListener("offline", offlineHandler);
			window.removeEventListener("online", onlineHandler);
		};
	}, []);

	return (
		<main className="stack center">
			<h1>Connection Status Logger</h1>
			<h2>{`Current connection Status:`}</h2>
			<p>{connectionEvents[0].type.toUpperCase()}</p>
			<h2>Connection History</h2>
			<table>
				<thead>
					<tr>
						<th>Type</th>
						<th>When</th>
					</tr>
				</thead>
				<tbody>
					{connectionEvents.map(({ when, type }) => (
						<tr key={when}>
							<td>{type}</td>
							<td>{new Date(when).toString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
};
