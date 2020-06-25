import React from 'react';
import CheckClickCollision from './CheckClickCollision.js';


class SceneCanvas extends React.Component{

    componentDidMount = () => {
        //Renders the canvas with game objects
        this.prepareCanvasObjects();
    }

    prepareCanvasObjects = () => {
        //The reference to the canvas and other info tied to variables
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        //Sets a BG color
        this.setBackground(canvas, "#4B4B55");

        //This is the event listener for the clicks that check for collision with game elements
        canvas.addEventListener('click', e => {
            let object = {};
            //Finds the difference from the (0, 0) of the canvas
            object.x = (e.clientX - rect.left);
            object.y =  (e.clientY - rect.top);
            //Calculates whether the click touched an object
            let collision = CheckClickCollision(this.props.levelObjects, object.x, object.y);

            if(collision){
                this.checkContext(collision[0], collision[1]);
            }
        })

        this.renderCanvasObjects(ctx)
        this.renderDialog(ctx, this.props.worldState.dialogBox[this.props.worldState.dialogCurrent], [30, 50]);
        
    }

    renderCanvasObjects = (ctx) => {
        this.props.levelObjects.map(obj => {

            //Seperates the data into individual numbers
            let pos = obj.position.split(' ');
            let dimensions = obj.size.split(' ');

            //Sets the rectangle color
            if(obj.color){
                ctx.fillStyle = obj.color;
            }else{
                ctx.fillStyle = "#FFFF33";
            }
            
            //Creates a rectangle with the fillStyle
            ctx.fillRect(pos[0],pos[1],dimensions[0],dimensions[1]);
        })
    }

    renderDialog = (ctx, text, position, fontSize="30px", font="Arial") => {
        let worldState = this.props.worldState;
        console.log(this.props.worldState);

        if(worldState.dialogBox[worldState.dialogCurrent]){
                text = worldState.dialogBox[worldState.dialogCurrent]
                ctx.font = fontSize + " " + font;
                ctx.fillStyle = "#000000";
                ctx.fillText(text, position[0], position[1]);
        }

        
    }

    setBackground = (canvas, backgroundColor) => {
        canvas.style.background = backgroundColor;
    }

    checkContext = (index, object) => {
        switch(object.context){
            case "talk": this.props.onClick(index, 'talk')
            break;
            case "pickup": this.props.onClick(index, 'pickup')
            break;
            case "dialogue": this.props.onClick(index, 'dialogue')
            break; 
            default: this.props.onClick(index, "impossible")
        }
    }

    render(){
        return(
            <div>
                <canvas ref="canvas" width={750} height={450} />
            </div>
        )
    }
    
}
/*
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);

                if( (clickX > parseInt(coords[1])) && (clickX < (parseInt(coords[1]) + noteCollection[note].width)) ){
                    if(noteCollection[note].status == true){
                        this.props.noteHit(note, songId)
                    }
                }

                if( (clickX > parseInt(coords[1])) && (clickX < (parseInt(coords[1]) + noteCollection[note].width)) && (clickY > parseInt(coords[0])) && (clickY < (parseInt(coords[0]) + noteCollection[note].height)) ){
                    if(noteCollection[note].status == false){
                        this.noteClicked(note, songId)
                    }else if(noteCollection[note].status == true){
                        this.noteClicked(note, songId)
                    }
                }


const gameCanvas = (props) => {
    return (<canvas width = "1200" height = "800" ></canvas>);
}
*/


export default SceneCanvas;