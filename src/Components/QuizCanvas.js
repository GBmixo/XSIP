import React from 'react';
import CheckClickCollision from './CheckClickCollision.js';

class QuizCanvas extends React.Component{

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
        this.setBackground(canvas, "#404077");

        //This is the event listener for the clicks that check for collision with game elements
        canvas.addEventListener('click', e => {
            let object = {};
            //Finds the difference from the (0, 0) of the canvas
            object.x = (e.clientX - rect.left);
            object.y =  (e.clientY - rect.top);
            //Calculates whether the click touched an object and returns the index and object
            let collision = CheckClickCollision(this.props.questionButtons, object.x, object.y);

            if(collision){
                this.props.onClick(collision[0]);
            }
        })

        console.log(this.props);
        this.renderCanvasObjects(ctx);
        this.renderText(ctx);
        
    }

    renderCanvasObjects = (ctx) => {
        this.props.questionButtons.map(obj => {

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

        let qPanel = this.props.question;
        let pos = qPanel.position.split(' ');
        let dimensions = qPanel.size.split(' ');

        if(qPanel.color){
            ctx.fillStyle = qPanel.color;
        }else{
            ctx.fillStyle = "#FFFF33";
        }

        ctx.fillRect(pos[0],pos[1],dimensions[0],dimensions[1]);
    }

    renderText = (ctx, fontSize="20px", font="Arial") => {

        this.props.questionButtons.map((qButton, index) => {
            let qText = qButton.qText;
            let pos = qButton.position.split(' ');
            let adjustPosY = parseInt(pos[1]) +40
            let adjustPosX = parseInt(pos[0]) +5

            ctx.font = fontSize + " " + font;
            ctx.fillStyle = "#000000";
            console.log(this.props.questionText)
            ctx.fillText(qText, adjustPosX, adjustPosY);
        })

        /*
        if(worldState.dialogBox[worldState.dialogCurrent]){
                text = worldState.dialogBox[worldState.dialogCurrent]
                ctx.font = fontSize + " " + font;
                ctx.fillStyle = "#000000";
                ctx.fillText(text, position[0], position[1]);
        }
        */

        
    }

    setBackground = (canvas, backgroundColor) => {
        canvas.style.background = backgroundColor;
    }

    render(){
        return(
            <div>
                <canvas ref="canvas" width={750} height={450} />
            </div>
        );
    }
}

export default QuizCanvas;