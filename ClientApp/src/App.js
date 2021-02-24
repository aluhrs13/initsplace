//global imports
import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

//3p imports

//local imports
import Home from "./pages/Home";
import Layout from "./components/Layout";

import "./custom.css";
import ViewContainer from "./pages/ViewContainer";
import ViewItem from "./pages/ViewItem";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path="/" component={Home} />
                <Route
                    path="/Container/:id"
                    component={withRouter(ViewContainer)}
                />
                <Route path="/Item/:id" component={withRouter(ViewItem)} />
            </Layout>
        );
    }
}
