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


var baseTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/base_joint/joint_pos',
    messageType: 'geometry_msgs/Vector3'
});

var waistTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/waist_joint/joint_pos',
    messageType: 'geometry_msgs/Vector3'
});

var arm1Topic = new ROSLIB.Topic({
    ros: ros,
    name: '/arm1_joint/joint_pos',
    messageType: 'geometry_msgs/Vector3'
});

var arm2Topic = new ROSLIB.Topic({
    ros: ros,
    name: '/arm2_joint/joint_pos',
    messageType: 'geometry_msgs/Vector3'
});

var arm3Topic = new ROSLIB.Topic({
    ros: ros,
    name: '/arm3_joint/joint_pos',
    messageType: 'geometry_msgs/Vector3'
});

var gripperTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/gripper/joint_pos',
    messageType: 'geometry_msgs/Vector3'
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
 
    return (x1 + y1 + z1);
}


baseTopic.subscribe(function (message){
    var mytable=document.getElementById("arm_table");

    mytable.rows[1].cells[1].innerHTML = parseFloat(message.x).toFixed(5);
    mytable.rows[2].cells[1].innerHTML = parseFloat(message.y).toFixed(5);
    mytable.rows[3].cells[1].innerHTML = parseFloat(message.z).toFixed(5);
});

waistTopic.subscribe(function (message){
    var mytable=document.getElementById("arm_table");

    mytable.rows[1].cells[2].innerHTML = parseFloat(message.x).toFixed(5);
    mytable.rows[2].cells[2].innerHTML = parseFloat(message.y).toFixed(5);
    mytable.rows[3].cells[2].innerHTML = parseFloat(message.z).toFixed(5);
});

arm1Topic.subscribe(function (message){
    var mytable=document.getElementById("arm_table");

    mytable.rows[1].cells[3].innerHTML = parseFloat(message.x).toFixed(5);
    mytable.rows[2].cells[3].innerHTML = parseFloat(message.y).toFixed(5);
    mytable.rows[3].cells[3].innerHTML = parseFloat(message.z).toFixed(5);
});

arm2Topic.subscribe(function (message){
    var mytable=document.getElementById("arm_table");

    mytable.rows[1].cells[4].innerHTML = parseFloat(message.x).toFixed(5);
    mytable.rows[2].cells[4].innerHTML = parseFloat(message.y).toFixed(5);
    mytable.rows[3].cells[4].innerHTML = parseFloat(message.z).toFixed(5);
});

arm3Topic.subscribe(function (message){
    var mytable=document.getElementById("arm_table");

    mytable.rows[1].cells[5].innerHTML = parseFloat(message.x).toFixed(5);
    mytable.rows[2].cells[5].innerHTML = parseFloat(message.y).toFixed(5);
    mytable.rows[3].cells[5].innerHTML = parseFloat(message.z).toFixed(5);
});

gripperTopic.subscribe(function (message){
    var mytable=document.getElementById("arm_table");

    mytable.rows[1].cells[6].innerHTML = parseFloat(message.x).toFixed(5);
    mytable.rows[2].cells[6].innerHTML = parseFloat(message.y).toFixed(5);
    mytable.rows[3].cells[6].innerHTML = parseFloat(message.z).toFixed(5);
});

document.getElementById("go_to_pose").onclick = function() {
    var arm_pose = document.getElementById("poses").value;
    nameTopic.publish(new ROSLIB.Message({data: arm_pose}));
};

document.getElementById("go_to_loc").onclick = function() {
    let r1=0.146;
    let r2=0.37;

    var xValue = parseFloat(document.getElementById("x-slider").value);
    var yValue = parseFloat(document.getElementById("y-slider").value);
    var zValue = parseFloat(document.getElementById("z-slider").value);

    let ans = check(0,0,0.097,xValue,yValue,zValue);

    if (ans > (r2*r2) || ans < (r1*r1)  ){
        //console.log("invalid");
        document.getElementById("validity").innerHTML = "invalid";
    }
    else{
        //console.log("valid");
        posTopic.publish(new ROSLIB.Message({x: xValue,y: yValue,z: zValue}));
        document.getElementById("validity").innerHTML = "valid";
    }

    
};
}
