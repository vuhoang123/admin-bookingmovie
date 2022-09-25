import logo from "./logo.svg";
import "./App.css";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AdminLandingPage } from "./templates/AdminLandingPage/AdminLandingPage";
import Users from "./pages/Admin/Users/Users";
import Films from "./pages/Admin/Films/Films";
import AddNewFilm from "./pages/Admin/Films/AddNewFilm/AddNewFilm";
import UpdateFilm from "./pages/Admin/Films/UpdateFilm/UpdateFilm";
import MovieSchedule from "./pages/Admin/Films/MovieSchedule/MovieSchedule";
import AddUser from "./pages/Admin/Users/AddUser/AddUser";
import EditUser from "./pages/Admin/Users/EditUser/EditUser";
// import Addnew from "./src/pages/Admin/Films/Addnew/Addnew";
// import Edit from "./src/pages/Admin/Films/Edit/Edit";

export const history = createBrowserHistory();
function App() {
  return (
    <div className="App">
      <Router history={history}>
        {/* <Loading /> */}
        <Switch>
          <AdminLandingPage path="/" exact Component={Films} />
          <AdminLandingPage path="/films" exact Component={Films} />
          <AdminLandingPage path="/films/addnew" exact Component={AddNewFilm} />
          <AdminLandingPage
            path="/films/edit/:id"
            exact
            Component={UpdateFilm}
          />
          <AdminLandingPage
            path="/films/showtime/:id"
            exact
            Component={MovieSchedule}
          />
          <AdminLandingPage path="/users" exact Component={Users} />
          <AdminLandingPage path="/users/addnew" exact Component={AddUser} />
          <AdminLandingPage path="/users/edit" exact Component={EditUser} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
