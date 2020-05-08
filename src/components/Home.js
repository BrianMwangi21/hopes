import React, { Component } from "react";
import { Container, Card } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import firebase from './Firebase';
import posed from 'react-pose';

const Box = posed.div({
    hoverable: true,
    init: { scale: 1 },
    hover: { scale: 0.95 },
});

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
          const { content, nickname } = doc.data();
          hopenotes.push({
            key: doc.id,
            doc, // DocumentSnapshot
            content,
            nickname
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
                <Box>
                    <Card>
                        <Card.Header style={{ "background" : "#C5CAE9" }}>from {hopenote.nickname}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {hopenote.content}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Box>
            )
        });

        const breakpointColumnsObj = {
            default: 4,
            1100: 3,
            700: 2,
            500: 1
        };

        return (
            <Container style={{"marginTop" : "20px"}}>
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