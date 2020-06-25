const Dialog = (name, specs=null) => {
    const dialogList = {
        "Clark": {
            "spokenTo": 0,
            "firstMeeting": ["Hi, I'm Clark. Nice to meet you!", "You look like a cool fella!", "Well, see ya bud."],
            "chat": ["Hey, Guess what?", "I just found that you can win the game instantly!", "Just press that there button that says 'WIN'."]
        },
        "Dlark": {
            "spokenTo": 0,
            "firstMeeting": ["Hi, I'm Dlark. Nice to meet you!", "You look like a cool fella!", "Well, see ya bud."],
            "chat": ["Hey, Guess what?", "I just found that you can win the game instantly!", "Just press that there button that says 'WIN'."]
        }
    }

    if(specs){ 
        if(specs == "discovered"){

        }
    }else{
        if(dialogList[name]["spokenTo"] != 1){
            dialogList[name]["spokenTo"] += 1;
            return dialogList[name]["firstMeeting"];
        }else{
            return dialogList[name]["chat"];
        }
        
    }
}

export default Dialog;