import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { StoreProvider } from "./store";

const Game = React.lazy(() => import("./pages/Game"));
const Welcome = React.lazy(() => import("./pages/Welcome"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));

function App() {
	return (
		<div className="App">
			<StoreProvider>
				<Suspense fallback={<div>Loading component...</div>}>
					<Routes>
						<Route path="/" element={<Welcome />} />
						<Route path="/game" element={<Game />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</Suspense>
			</StoreProvider>
		</div>
	);
}

export default App;
