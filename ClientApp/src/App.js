//global imports
import React, { Component } from "react";
import { Route } from "react-router";

//3p imports

//local imports
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { FetchData } from "./components/FetchData";

import "./custom.css";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path="/" component={Home} />
                <Route path="/fetch-data" component={FetchData} />
            </Layout>
        );
    }
}
