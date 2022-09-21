import logo from "./logo.svg";
import "./App.css";
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import { AdminLandingPage } from "./templates/AdminLandingPage/AdminLandingPage";
import DashBoard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import ShowTime from "./pages/Admin/ShowTime/Showtime";
// import Addnew from "./src/pages/Admin/Films/Addnew/Addnew";
// import Edit from "./src/pages/Admin/Films/Edit/Edit";

export const history = createBrowserHistory();
function App() {
  return (
    <div className="App">
      <Router history={history}>
        {/* <Loading /> */}
        <Switch>
          <AdminLandingPage path="/admin" exact Component={DashBoard} />
          <AdminLandingPage path="/admin/films" exact Component={Films} />
          {/* <AdminTemplate path="/admin/films/addnew" exact Component={Addnew} />
          <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} /> */}
          {/* <AdminLandingPage
            path="/admin/films/showtime/:id"
            exact
            Component={ShowTime}
          /> */}
          <AdminLandingPage path="/admin/users" exact Component={DashBoard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
