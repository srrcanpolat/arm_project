# ROS Robot Arm Project (Work in Progress)
This project is a work in progress and made for "Robotic Programming with ROS" course.

At the end of this project, it is aimed to control a robot arm simulated on Gazebo with a web interface.

### What has been done so far:
- A robotic arm model[^1] is simplified, and the necessary joints for the robot are defined according to fusion2urdf[^2] repository instructions.
- Some corrections are made to the URDF files to be compatible with Gazebo.
- A dummy joint is added between the robot arm base and Gazebo "world" to fix the arm to the world.
- Loaded the URDF file to RViz without any error.
- Loaded the URDF file to Gazebo without any error.
- Tested the joint controls on Gazebo using ROS commands on terminal.

### What to do next:
- Set up MoveIt[^3] and control the robot arm through it.
- Develop a web interface and connect to ROS using roslibjs[^4] and rosbridge[^5].

## Installation Steps

Operating system: Ubuntu 20.04

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

restart your terminal for sources to take effect
<br>

---

<br>

For loading URDF to RViz
```shell script
roslaunch robot_arm_description display.launch
```
<br>

---

<br><br>
For loading URDF to Gazebo and control the arm joints

Start the gazebo with paused time
```shell script
roslaunch robot_arm_description gazebo.launch
```

in second terminal enter
```shell script
roslaunch robot_arm_description controller.launch
```
and start the gazebo time to make connections with controller.

<br>

For controlling the joints in third terminal
```shell script
rostopic pub -1 /robot_arm/waist_joint_position_controller/command std_msgs/Float64 "data: 1.0"
```

"data" is angles in radians.

To get all joint topics
```shell script
rostopic list
```
---

### Joint Limits:
| Joints        | Upper Limit   | Lower Limit  |
| ------------- |:-------------:| :-----------:|
| base_joint    | 1.57			| -1.57 	   |
| waist_joint   | 1.57			| -1.27 	   |
| arm1_joint    | 1.57			| -1.57 	   |
| arm2_joint    | 1.57			| -1.57 	   |
| arm3_joint    | 1.57			| -1.57 	   |

### References

[^1]: [3D model .step file](https://thangs.com/designer/spectrum.thebestone/3d-model/Robotic%20Arm%203D%20Model-237722) by [spectrum.thebestone](https://thangs.com/designer/spectrum.thebestone)
[^2]: [fusion2urdf repository](https://github.com/syuntoku14/fusion2urdf) by [syuntoku14](https://github.com/syuntoku14)
[^3]: [MoveIt](https://moveit.ros.org/) by [PickNik Robotics](https://picknik.ai/?utm_source=moveit)
[^4]: [roslibjs repository](https://github.com/RobotWebTools/roslibjs) by [RobotWebTools](https://github.com/RobotWebTools)
[^5]: [rosbridge_suite repository](https://github.com/RobotWebTools/rosbridge_suite) by [RobotWebTools](https://github.com/RobotWebTools)
