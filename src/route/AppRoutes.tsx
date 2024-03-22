import {Route, Routes} from "react-router-dom";
import Settings from "../pages/Settings.tsx";
import Transcription from "../pages/Transcription.tsx";
import Home from "../pages/Home.tsx";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" Component={Home} />
				<Route path="/Settings" Component={Settings} />
				<Route path="/Transcription" Component={Transcription} />
			</Routes>
		</>
	);
}

export default App;
