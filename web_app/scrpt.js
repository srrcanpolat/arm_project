window.onload = function(){ 
var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
});

var posTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/target_pos',
    messageType: 'geometry_msgs/Vector3'
});

var nameTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/target_name',
    messageType: 'std_msgs/String'
});

var tfTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/tf',
    messageType: 'tf2_msgs/TFMessage'
});

function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function check(cx, cy, cz, x, y, z)
{
    let x1 = Math.pow((x - cx), 2);
    let y1 = Math.pow((y - cy), 2);
    let z1 = Math.pow((z - cz), 2);
 
    // distance between the centre
    // and given point
    return (x1 + y1 + z1);
}


tfTopic.subscribe(function (message){
    var mytable=document.getElementById("arm_table");

    for(let i=0; i < 6 ; i++){
    mytable.rows[1].cells[i+1].innerHTML = message.transforms[i].transform.translation.x;
    mytable.rows[2].cells[i+1].innerHTML = message.transforms[i].transform.translation.y;
    mytable.rows[3].cells[i+1].innerHTML = message.transforms[i].transform.translation.z;
    
    }

    //console.log(message.transforms)
    //arm2 = 0
    //arm3 = 1
    //gripper_1=2
    //waist = 3
    //gripper_2 = 4
    //arm1 = 5
    //console.log(message.transforms[0].transform.translation);
    //console.log(message.transforms[0].transform.translation.x);

});

document.getElementById("go_to_pose").onclick = function() {
    var arm_pose = document.getElementById("poses").value;
    nameTopic.publish(new ROSLIB.Message({data: arm_pose}));
    console.log(arm_pose);
};

document.getElementById("go_to_loc").onclick = function() {
    let r1=0.146;
    let r2=0.37;

    var xValue = parseFloat(document.getElementById("x-slider").value);
    var yValue = parseFloat(document.getElementById("y-slider").value);
    var zValue = parseFloat(document.getElementById("z-slider").value);

    let ans = check(0,0,0.097,xValue,yValue,zValue);

    if (ans > (r2*r2) || ans < (r1*r1)  ){
        console.log("invalid");
        document.getElementById("validity").innerHTML = "invalid";
    }
    else{
        console.log("valid");
        posTopic.publish(new ROSLIB.Message({x: xValue,y: yValue,z: zValue}));
        document.getElementById("validity").innerHTML = "valid";
    }

    
};
}
