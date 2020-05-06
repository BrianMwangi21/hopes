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
    
        this.ref.add({
          content
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
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">hopes - no matter the times</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Form onSubmit={this.onSubmit} inline>
                        <FormControl type="text" name="content" placeholder="Say something" value={this.state.content} onChange={this.onChange} className="mr-sm-2" />
                        <Button variant="outline-success" type="submit">Post!</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation;