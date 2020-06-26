import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import SceneCanvas from './Components/SceneCanvas';
import AreaCanvas from './Components/AreaCanvas.js';
import Dialog from './Containers/Dialog.js'
import QuizContent from './Containers/QuizContent'
import QuizCanvas from './Components/QuizCanvas';
import { ConsoleWriter } from 'istanbul-lib-report';


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
                    {name: "Clark", position: "300 122", size: "90 200", sprite: "?", context: "talk", color: "#33AAFF"},
                    {name: "Dlark", position: "400 122", size: "90 200", sprite: "?", context: "talk", color: "#33AAFF"}
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

            questionCurrent: 0,
            answer: null,
            questionText: ["","",""],
            question: {id: 0, position: "180 10", size: "400 60", color: "#FFFFFF", qText: null},
            questionButtons: [
                {id: 1, position: "180 120", size: "400 60", qText: "test"},
                {id: 2, position: "180 190", size: "400 60", qText: "test"},
                {id: 3, position: "180 260", size: "400 60", qText: "test"}
            ]
        }
    }

    componentDidUpdate(){
        this.setupQuestions()
        //setTimeout(this.setupQuestions(), 10000);
    }

    handleClick = (index, context) => {
        console.log(context)
        //readability variables
        let worldState = this.state.worldState;
        let levels = this.state.levels;
        //Finds the object in the state by the given index
        let object = levels[worldState.currentCity][worldState.currentSpot][index];

        if(context == "talk"){
            //runs the npcTalk script
            this.npcTalk(object);
        }
    }

    handleButtonClick = (index) => {
        let qButtons = this.state.worldState.questionButtons;
        if(index == this.state.worldState.answer){
            console.log('WINNER!!!')
        }

    }

    npcTalk = (object, specs=null) => {

        console.log(object)
        //prepares shortened variable for readability
        let oldState = this.state;
        let currentSpot = oldState.levels [oldState.worldState.currentCity] [oldState.worldState.currentSpot];
        //let dialogBox = oldState.worldState.dialogBox;
        //unrender and wait until state is updated
        oldState.everythingLoaded = false;
        this.setState(oldState);

        //checks if there's a text and if there isn't, make one in the object list
        if(!currentSpot.find(obj => obj.name == "textBox")){
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
            let textBoxIndex = currentSpot.findIndex(obj => obj.name == "textBox", 1);
            currentSpot.splice(textBoxIndex, 1);
        }
        
        //gives the okay for the element to re-render
        oldState.everythingLoaded = true;
        this.setState(oldState);
        //console.log(this.state);
    }

    renderScene(){
        //This uses the current city and spot within the city to navigate the levels object and find the objects to put onscreen
        let levelObjects = this.state.levels [this.state.worldState.currentCity] [this.state.worldState.currentSpot];

        return(
            <div>
                < SceneCanvas key={SceneCanvas} onClick={this.handleClick} levelObjects={levelObjects} worldState={this.state.worldState} />
            </div>
        );
    }

    setupQuestions = () => {
        let questions = QuizContent();
        let oldState = this.state;
        oldState.worldState.questionCurrent = 1
        let correctNumber = Math.floor(Math.random() * 3);
        oldState.worldState.answer = correctNumber;
        //console.log(correctNumber)

        let incorrectCount = 0;
        
        let qButtons = oldState.worldState.questionButtons.map((qButton, index) => {
            if(index != correctNumber){
                oldState.worldState.questionText[index] = questions.question1.incorrect[incorrectCount];
                incorrectCount += 1;
            }else{
                //console.log('correct')
                oldState.worldState.questionText[index] = questions.question1.correct;
            }
            return;
        });

        this.setState(oldState);
        console.log(this.state);
        
    }

    renderQuiz(){
        //console.log(this.state.worldState.questionButtons);
        
        return(
            <div>
                < QuizCanvas key={QuizCanvas} onClick={this.handleButtonClick} question={this.state.worldState.question} questionButtons={this.state.worldState.questionButtons} questionText={this.state.worldState.questionText} />
            </div>
        );
    }

    renderArea(people){
        //This uses the current city and spot within the city to navigate the levels object and find the objects to put onscreen
        let levelObjects = this.state.levels [this.state.worldState.currentCity] [this.state.worldState.currentSpot];

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
                        <div>
                            <Link to="/">Main</Link> <Link to="/Scene">Play</Link> <Link to="/Quiz">Quiz</Link>
                        </div>
                        <Switch>
                            <Route path='/' exact>
                                {this.state.everythingLoaded ? this.renderScene() : null}
                            </Route>
                            <Route path='/Scene' exact>
                                {this.state.everythingLoaded ? this.renderScene() : null}
                            </Route>
                            <Route path='/Area' exact>
                                {this.state.everythingLoaded ? this.renderArea() : null}
                            </Route>
                            <Route path='/Quiz' exact>
                                {this.state.everythingLoaded ? this.renderQuiz() : null}
                            </Route>
                        </Switch>
                        
                    </div>
                </Router>
               
            )
    }

}

export default MainPage;