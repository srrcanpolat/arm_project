window.onload = function(){ 

var graphDiv = document.getElementById("arm_plot");
    
var xlist = [0,0,0,0,0,0,0];
var ylist = [0,0,0,0,0,0,0];
var zlist = [0,0.1,0.2,0.3,0.4,0.5,0.6];
var clist = [0,0.1,0.2,0.3,0.4,0.5,0.6];


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

var JointStateTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/joint_states',
    messageType: 'sensor_msgs/JointState'
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

var mytable=document.getElementById("arm_table");

baseTopic.subscribe(function (message){

    let x = parseFloat(message.x).toFixed(5);
    let y = parseFloat(message.y).toFixed(5);
    let z = parseFloat(message.z).toFixed(5);

    mytable.rows[1].cells[1].innerHTML = x;
    mytable.rows[2].cells[1].innerHTML = y;
    mytable.rows[3].cells[1].innerHTML = z;

    xlist[1]=x;
    ylist[1]=y;
    zlist[1]=z;

});

waistTopic.subscribe(function (message){

    let x = parseFloat(message.x).toFixed(5);
    let y = parseFloat(message.y).toFixed(5);
    let z = parseFloat(message.z).toFixed(5);

    mytable.rows[1].cells[2].innerHTML = x;
    mytable.rows[2].cells[2].innerHTML = y;
    mytable.rows[3].cells[2].innerHTML = z;

    xlist[2]=x;
    ylist[2]=y;
    zlist[2]=z;
});

arm1Topic.subscribe(function (message){

    let x = parseFloat(message.x).toFixed(5);
    let y = parseFloat(message.y).toFixed(5);
    let z = parseFloat(message.z).toFixed(5);

    mytable.rows[1].cells[3].innerHTML = x;
    mytable.rows[2].cells[3].innerHTML = y;
    mytable.rows[3].cells[3].innerHTML = z;

    xlist[3]=x;
    ylist[3]=y;
    zlist[3]=z;
});

arm2Topic.subscribe(function (message){

    let x = parseFloat(message.x).toFixed(5);
    let y = parseFloat(message.y).toFixed(5);
    let z = parseFloat(message.z).toFixed(5);

    mytable.rows[1].cells[4].innerHTML = x;
    mytable.rows[2].cells[4].innerHTML = y;
    mytable.rows[3].cells[4].innerHTML = z;

    xlist[4]=x;
    ylist[4]=y;
    zlist[4]=z;
});

arm3Topic.subscribe(function (message){

    let x = parseFloat(message.x).toFixed(5);
    let y = parseFloat(message.y).toFixed(5);
    let z = parseFloat(message.z).toFixed(5);

    mytable.rows[1].cells[5].innerHTML = x;
    mytable.rows[2].cells[5].innerHTML = y;
    mytable.rows[3].cells[5].innerHTML = z;

    xlist[5]=x;
    ylist[5]=y;
    zlist[5]=z;
});

gripperTopic.subscribe(function (message){

    let x = parseFloat(message.x).toFixed(5);
    let y = parseFloat(message.y).toFixed(5);
    let z = parseFloat(message.z).toFixed(5);

    mytable.rows[1].cells[6].innerHTML = x;
    mytable.rows[2].cells[6].innerHTML = y;
    mytable.rows[3].cells[6].innerHTML = z;

    xlist[6]=x;
    ylist[6]=y;
    zlist[6]=z;

});

JointStateTopic.subscribe(function (message){
    mytable.rows[4].cells[1].innerHTML = parseFloat(message.position[0]).toFixed(5);
    mytable.rows[4].cells[2].innerHTML = parseFloat(message.position[1]).toFixed(5);
    mytable.rows[4].cells[3].innerHTML = parseFloat(message.position[2]).toFixed(5);
    mytable.rows[4].cells[4].innerHTML = parseFloat(message.position[3]).toFixed(5);
    mytable.rows[4].cells[5].innerHTML = parseFloat(message.position[4]).toFixed(5);
    mytable.rows[4].cells[6].innerHTML = parseFloat(message.position[5]).toFixed(5);

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

var data = [{
    type: 'scatter3d',
    mode: 'lines+markers',
    x: xlist,
    y: ylist,
    z: zlist,
    line: {
      width: 6,
      color: clist,
      colorscale: "Viridis"},
    marker: {
      size: 3.5,
      color: clist,
      colorscale: "Greens",
      cmin: -20,
      cmax: 50
    }}                 
  ];

  var layout = {
    scene:{
    
     aspectmode: "manual",
     aspectratio: {
       x: 1, y: 1.8, z: 1,
      },
     xaxis: {
      nticks: 2,
      range: [-0.15, 0.37],
    },
     yaxis: {
      nticks: 2,
      range: [-0.4, 0.37],
    },
     zaxis: {
     nticks: 2,
     range: [0, 0.421],
    }},
  };


Plotly.newPlot('arm_plot', data, layout);


  setInterval(function () {
    var update ={
        x: [xlist],
        y: [ylist],
        z: [zlist]
    }

    Plotly.restyle(graphDiv,update);

}, 50);
  

}
