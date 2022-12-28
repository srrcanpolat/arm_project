# ROS Robot Arm Project (Work in Progress)
This project is a work in progress and made for "Robot Programming with ROS" course.

At the end of this project, it is aimed to control a robot arm simulated on Gazebo with a web interface.

### What has been done so far:
- A robotic arm model[^1] is simplified, and the necessary joints for the robot are defined according to fusion2urdf[^2] repository instructions.
- Some corrections are made to the URDF files to be compatible with Gazebo.
- A dummy joint is added between the robot arm base and Gazebo "world" to fix the arm to the world.
- Loaded the URDF file to RViz without any error.
- Loaded the URDF file to Gazebo without any error.
- Tested the joint controls on Gazebo using ROS commands on terminal.
- Set up MoveIt[^3]
- Develop a web interface and connect to ROS using roslibjs[^4] and rosbridge[^5].
- Control the robot through web interface.

### What to do next:
- <s style="color: darkgrey">Set up MoveIt and control the robot arm through it.
- Develop a web interface and connect to ROS using roslibjs and rosbridge.</s>
- Since the project goal has been reached, I will continue working on it in my spare time as a personal project.

## Installation Steps

Operating system: Ubuntu 20.04 Focal Fossa

Install ROS Noetic

```shell script
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
sudo apt install curl
curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add -
sudo apt update
sudo apt install ros-noetic-desktop-full
```

Add source to .bashrc

```shell script
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

Clone repo and add source to .bashrc

```shell script
cd ~
git clone https://github.com/srrcanpolat/arm_project.git
rm -r ~/arm_project/arm_ws/devel
rm -r ~/arm_project/arm_ws/build
cd ~/arm_project/arm_ws
catkin_make
echo "source ~/arm_project/arm_ws/devel/setup.bash" >> ~/.bashrc
```

Install ros control
```shell script
sudo apt install ros-noetic-ros-control
sudo apt install ros-noetic-ros-controllers
```

Install MoveIt
```shell script
sudo apt install ros-noetic-moveit
```

Install Rosbridge
```shell script
sudo apt-get install ros-noetic-rosbridge-server
```
<br>
restart your terminal for sources to take effect
<br>

## Simulation

To start to simulation run

```shell script
roslaunch robot_arm_description launch-all.launch
```

To start to a http server

```shell script
cd ~/arm_project/web_app
python3 -m http.server
```
and connect to the server by going to below url in your browser
```
http://localhost:8000/
```

You should see a Gazebo window and a web page. Screenshots given below.

Gazebo

![alt text](https://github.com/srrcanpolat/arm_project/tree/main/imgs/gazebo.jpg "Gazebo Window")

Web page

![alt text](https://github.com/srrcanpolat/arm_project/tree/main/imgs/web-page.jpg "Web Page")

Using the web page you can control the arm in gazebo.



### References

[^1]: [3D model .step file](https://thangs.com/designer/spectrum.thebestone/3d-model/Robotic%20Arm%203D%20Model-237722) by [spectrum.thebestone](https://thangs.com/designer/spectrum.thebestone)
[^2]: [fusion2urdf repository](https://github.com/syuntoku14/fusion2urdf) by [syuntoku14](https://github.com/syuntoku14)
[^3]: [MoveIt](https://moveit.ros.org/) by [PickNik Robotics](https://picknik.ai/?utm_source=moveit)
[^4]: [roslibjs repository](https://github.com/RobotWebTools/roslibjs) by [RobotWebTools](https://github.com/RobotWebTools)
[^5]: [rosbridge_suite repository](https://github.com/RobotWebTools/rosbridge_suite) by [RobotWebTools](https://github.com/RobotWebTools)