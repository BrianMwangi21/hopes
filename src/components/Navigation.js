import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import firebase from './Firebase';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('hope-notes');
        this.state = {
            content: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { content } = this.state;

        // Load and instantiate Chance
        var chance = require('chance').Chance();
    
        this.ref.add({
          content,
          nickname : chance.name().toLowerCase()
        }).then((docRef) => {
          this.setState({
            content : ''
          });
          this.props.history.push("/")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }

    render() {
        return(
            <Navbar expand="lg" style={{"padding": "20px", "background" : "#303F9F"}}>
                <Navbar.Brand href="/" style={{"color" : "#fff"}}>hopes | no matter the times</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Form onSubmit={this.onSubmit} inline>
                        <FormControl type="text" name="content" placeholder="Say something ( and we'll give you a cute nickname, promise )" value={this.state.content} onChange={this.onChange} className="mr-lg-2" style={{"width" : "500px"}} required />
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation;