import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import Navbar from "./components/navbar";
// import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NewMovieForm from "./components/newMovieForm";
import Logout from "./components/common/logout";
import ProtectedRoute from "./components/common/protectedRoute";

import auth from "./services/authService";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();

    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            {/* <Route path="/movies/new" component={NewMovieForm} /> */}
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />

            {/* we dont want unauth people to access this link */}
            <ProtectedRoute path="/movies/:id" component={NewMovieForm} />
            
            {/* we want to pass user prop to Movies Component */}
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" to="/movies" exact component={Movies} />
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
