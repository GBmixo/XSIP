import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import SceneCanvas from './Components/SceneCanvas';
import AreaCanvas from './Components/AreaCanvas.js';
import Landing from './Components/Landing.js';
import Dialog from './Containers/Dialog.js';
import { Navbar } from 'react-bootstrap';


class MainPage extends React.Component{
    //6093E1 loading
    //4F7AAA general

    //Could a container component replace most of state?
    state = {
        everythingLoaded: true,
        levels: {
            seattle:{
                //This is generally what I'm imagining the level-object structure is going to be like
                //This information should be enough to render an image on the canvas with a spot to look out for
                pikePlaceMarket:[
                    {name: "Skater", position: "63 215", size: "104 195", sprite: "?", context: "talk", color: "#33AAFF"},
                    {name: "Busker", position: "161 181", size: "104 195", sprite: "?", context: "talk", color: "#33AAFF"},
                    {name: "Newsie", position: "276 212", size: "104 195", sprite: "?", context: "talk", color: "#33AAFF"},
                    {name: "Fish Monger", position: "360 150", size: "60 100", sprite: "?", context: "talk", color: "#33AAFF"},
                    {name: "Tourist", position: "440 269", size: "104 195", sprite: "?", context: "talk", color: "#33AAFF"},
                    {name: "Activist", position: "567 271", size: "104 195", sprite: "?", context: "talk", color: "#33AAFF"},
                    {name: "Barista", position: "637 164", size: "60 100", sprite: "?", context: "talk", color: "#33AAFF"}
                ]
            }
        },
        worldState: {
            //I'm using the state here to store the player's location
            currentCity: "seattle",
            currentSpot: "pikePlaceMarket",
            //this sets the dialog appearing onscreen
            talkingTo: null,
            dialogBox: [],
            dialogCurrent: -1,
            //These aren't permanent or set in stone but for testing interactions and how they are recorded
            peopleTalkedTo: 0,
            informationCollected: 0,
            testObjectIntereacted: false
        }
    }

    handleClick = (index, context) => {
        console.log(context, 'hi')
        
        //readability variables
        let worldState = this.state.worldState;
        let levels = this.state.levels;
        //Finds the object in the state by the given index
        let object = levels[worldState.currentCity][worldState.currentSpot][index];
        if(context === "talk"){
            //runs the npcTalk script
            this.npcTalk(object);
        }
    }

    npcTalk = (object, specs=null) => {

        console.log(object)
        //prepares shortened variable for readability
        let oldState = this.state;
        let currentSpot = oldState.levels[oldState.worldState.currentCity][oldState.worldState.currentSpot];
        //let dialogBox = oldState.worldState.dialogBox;
        //unrender and wait until state is updated
        oldState.everythingLoaded = false;
        this.setState(oldState);

        //checks if there's a text and if there isn't, make one in the object list
        if(!currentSpot.find(obj => obj.name === "textBox")){
            currentSpot.push({name: "textBox", position: "20 20", size: "600 90", sprite: "?", color: "#FFFFFF"});
        }

        //Finds the dialog array in the Dialog object file and sets it as the dialogBox
        oldState.worldState.dialogBox = Dialog(object.name, specs);
        //If there's a dialog line at the next index to render...
        if(oldState.worldState.dialogBox[oldState.worldState.dialogCurrent + 1]){
            //add 1 to the current dialog index
            oldState.worldState.dialogCurrent += 1;

        //if there isn't any lines next...
        }else{
            //reset the values to go back
            oldState.worldState.dialogCurrent = -1;
            oldState.worldState.dialogBox = [];
            let textBoxIndex = currentSpot.findIndex(obj => obj.name === "textBox", 1);
            currentSpot.splice(textBoxIndex, 1);
        }
        
        //gives the okay for the element to re-render
        oldState.everythingLoaded = true;
        this.setState(oldState);
        //console.log(this.state);
    }

    renderScene(){
        // This uses the current city and spot within the city to navigate the levels object and find the objects to put onscreen
        let levelObjects = this.state.levels[this.state.worldState.currentCity][this.state.worldState.currentSpot];

        return(
            <div>
                < SceneCanvas key={SceneCanvas} onClick={this.handleClick} levelObjects={levelObjects} worldState={this.state.worldState} />
            </div>

        );

    }

    renderArea(people){
        // This uses the current city and spot within the city to navigate the levels object and find the objects to put onscreen
        let levelObjects = this.state.levels[this.state.worldState.currentCity][this.state.worldState.currentSpot];

        return(
            <div>
                < AreaCanvas key={AreaCanvas} onClick={this.handleClick} levelObjects={levelObjects} worldState={this.state.worldState} />
            </div>
        );
    }
    
    render(){
            return (
                <Router>
                    <div>
                        <Navbar>
                            <div>
                                <Link to="/">Main</Link>
                                <Link to="/Scene">Play</Link>
                                <Link to="/Area">Area</Link>
                            </div>

                        </Navbar>
                        <Switch>
                            <Route path='/Area' exact>
                                {this.state.everythingLoaded ? this.renderArea() : null}
                            </Route>
                            <Route path='/Scene' exact>
                                {this.state.everythingLoaded ? this.renderScene() : null}
                            </Route>
                            <Route path='/' exact>
                                <Landing></Landing>
                                {this.state.everythingLoaded ? this.renderScene() : null}
                            </Route>
                        </Switch>
                        
                    </div>
                </Router>
            )
    }

}

export default MainPage;