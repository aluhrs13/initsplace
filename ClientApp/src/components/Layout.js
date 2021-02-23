//global imports
import React, { Component } from "react";

//3p imports
import { Container } from "reactstrap";

//local imports
import { NavMenu } from "./NavMenu";

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu />
                <Container>{this.props.children}</Container>
            </div>
        );
    }
}
