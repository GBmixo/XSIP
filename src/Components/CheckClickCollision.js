const CheckClickCollision = (objects, clickX, clickY) => {
    for(let i = 0; i < objects.length; i++){
        let pos = objects[i].position.split(' ');
        let size = objects[i].size.split(' ');
        //Compares the click to the dimensions of the rectangle
        if( (clickX > pos[0]) && (clickX < parseInt(pos[0]) + parseInt( size[0])) && (clickY > pos[1]) && (clickY < parseInt(pos[1]) + parseInt(size[1])) ){
            //console.log('hit ' + objects[i].name);
            return([i, objects[i]]);
        }
    }
}

export default CheckClickCollision;