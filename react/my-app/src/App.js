import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import routes from './Routes';
import RouteWithSubRoutes from './utils/RouteWithSubRoutes';
import './App.css'
import Verify from './pages/Verify';


function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Redirect exact from='/' to='/login' />
				{routes.map((route, i) => (
					<RouteWithSubRoutes key={i} {...route} />
				))}
				<Route path="/verify"><Verify/></Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
