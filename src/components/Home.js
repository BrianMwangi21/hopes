import React, { Component } from "react";
import { Container, Card } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import firebase from './Firebase';

class Home extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('hope-notes');
        this.unsubscribe = null;
        this.state = {
            hopenotes: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const hopenotes = [];
        querySnapshot.forEach((doc) => {
          const { title, content, createdAt, modifiedAt, state } = doc.data();
          hopenotes.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            content,
            createdAt,
            modifiedAt,
            state
          });
        });
        this.setState({
          hopenotes
       });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
        var notes = this.state.hopenotes.map((hopenote) => {
            return (
                <Card style={{ "margin" : "20px" }}>
                    <Card.Header>from {hopenote.title}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {hopenote.content}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        });

        const breakpointColumnsObj = {
            default: 4,
            1100: 3,
            700: 2,
            500: 1
        };

        return (
            <Container>
                <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
                >
                {notes}
                </Masonry>
            </Container>
        )
    }
}

export default Home;