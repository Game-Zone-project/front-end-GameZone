
import { useAuth0 } from "@auth0/auth0-react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import './ModelGame.css';
import AddToProfileLibrary from '../AddToProfileLibrary/AddToProfileLibrary';
import { useRef } from 'react';
export default function ModelGame(props) {
    const { isAuthenticated, logout } = useAuth0();
    const reviewRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        let userReview = reviewRef.current.value;
        console.log("user review is : ", userReview);
        let newData = { ...props.gameData, userReview };
        console.log(newData);
        props.reviewHandler(newData, newData.title)
        console.log(props.reviewHandler);
    }
    async function addToLibraryHandler(e) {
        e.preventDefault();
        let url = `${process.env.REACT_APP_GAMES_URL}/addGame`
        //  [title, genre, image, review, rating, release_date, game_URL]
        //console.log(url)
        let data = {
            title: props.gameData.title,
            genre: props.gameData.genre,
            image: props.gameData.thumbnail,
            review: props.gameData.review,
            rating: props.gameData.rating,
            release_date: props.gameData.release_date,
            game_URL: props.gameData.game_url,
            overview: props.gameData.description
        }
        //console.log("Game is", data.review)
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        if (response.status === 201) {
            alert("sucessfully added to database !")
        }
        // const recivedData = await response.json();
        // console.log(55555,recivedData)
    }
    async function addToWishListHandler(e) {
        e.preventDefault();
        let url = `${process.env.REACT_APP_GAMES_URL}/addWishList`
        //  [title, genre, image, review, rating, release_date, game_URL]
        //console.log(url)
        let data = {
            title: props.gameData.title,
            genre: props.gameData.genre,
            image: props.gameData.thumbnail,
            review: props.gameData.review,
            rating: props.gameData.rating,
            release_date: props.gameData.release_date,
            game_URL: props.gameData.game_url
        }
        // console.log("data is", data)
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        //console.log('response is', response)
        if (response.status === 201) {
            alert("sucessfully added to database !")
        }
        const recivedData = await response.json();
        //console.log(66666, recivedData)
    }
    //console.log(props.gameData.reviewHandler)
    return (
        <>

        {/* {isAuthenticated && (
            <Modal show={props.show} onHide={props.handleClose} style={{ color: "rgb(104, 99, 99)" }} >
                <Modal.Header style={{ width: "500px", background: "rgb(51, 46, 46)", color: "rgb(104, 99, 99)", border: "rgb(22, 20, 20)" }} closeButton  >
                    <Modal.Title style={{ color: "rgb(104, 99, 99)" }}>{props.gameData.title} */}

            {isAuthenticated && (<Modal show={props.show} onHide={props.handleClose} style={{ color: "rgb(104, 99, 99)" }} >
                <Modal.Header style={{ width: "500px", background: "rgb(51, 46, 46)", color: "rgb(104, 99, 99)", border: "rgb(22, 20, 20)" }} closeButton  >
                    <Modal.Title style={{ color: "rgb(104, 99, 99)" }}>{props.gameData.title}


                    </Modal.Title>
                </Modal.Header  >
                <Modal.Body className="card mx-auto" style={{ width: "500px", background: "rgb(22, 20, 20)", padding: "0px", border: "rgb(22, 20, 20)" }}  >

                    <img class="card-img-top" src={`${props.gameData.thumbnail}`} alt={props.gameData.title} style={{ width: 499 }} />


                  

                    <Form style={{
                        background: "rgb(22, 20, 20)", border: "rgb(22, 20, 20)"
                    }}
                    >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control class="mb-3" style={{ background: "rgb(52, 20, 20)", border: "rgb(22, 20, 20)", color: "rgb(255, 255, 255)" }} name="comment" as="textarea" placeholder="Write your review" rows={3} ref={reviewRef} />
                        </Form.Group>
                        <Row >

                            <div class="buttonCont">
                                <Col>
                                    <Button style={{ background: "rgb(51, 46, 46)", border: "rgb(22, 20, 20)" }} class='submitButton'
                                        type="submit"
                                        //  style={{ : "" }}
                                        onClick={(event) => submitHandler(event)}
                                    >
                                        submit
                                    </Button>
                                </Col>
                                <div class="miviCont">
                                    <Col>
                                        <Button style={{ background: "rgb(51, 46, 46)", border: "rgb(22, 20, 20)" }} type="submit" onClick={(e) => addToLibraryHandler(e)} >
                                            Add to my Library
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            type="submit"
                                            style={{ background: "rgb(51, 46, 46)", border: "rgb(22, 20, 20)", width: "160px" }} onClick={(e) => addToWishListHandler(e)}
                                        >
                                            Add to my Wishlist
                                        </Button>
                                    </Col>
                                </div>
                            </div>

              
                      

                        </Row>
                    </Form>
                    <div class="contaner">
                      

                        <div className="modal-description">{props.gameData.description}</div>
                        <div className="y">Release date : {props.gameData.release_date}</div>
                    </div>
               

                    <Button className="btn" style={{ background: "rgb(51, 46, 46)", border: "rgb(22, 20, 20)" }} href={props.gameData.game_url} size="lg" onClick={() => window.location.href = props.gameData.game_url}>
                        Download
                    </Button>



                  
                </Modal.Body>



            </Modal>)}
            {/* <AddToProfileLibrary reviewHandler={props.reviewHandler}/> */}
        </>
    );
}