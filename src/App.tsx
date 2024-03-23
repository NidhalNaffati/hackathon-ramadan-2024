import {Navbar} from "./components/Navbar.tsx";
import AppRoutes from "./route/AppRoutes.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {
	return (
		<>
			<BrowserRouter>
				<div className="flex items-center justify-center">
					<Navbar />
				</div>
				<AppRoutes />
			</BrowserRouter>
		</>
	);
}

export default App;
