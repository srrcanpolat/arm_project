#!/usr/bin/env python3
import sys
import rospy
import moveit_commander
import geometry_msgs.msg
from std_msgs.msg import Float64

pub1 = rospy.Publisher("/robot_arm/base_joint_position_controller/command", Float64, queue_size=10)
pub2 = rospy.Publisher("/robot_arm/waist_joint_position_controller/command", Float64, queue_size=10)
pub3 = rospy.Publisher("/robot_arm/arm1_joint_position_controller/command", Float64, queue_size=10)
pub4 = rospy.Publisher("/robot_arm/arm2_joint_position_controller/command", Float64, queue_size=10)
pub5 = rospy.Publisher("/robot_arm/arm3_joint_position_controller/command", Float64, queue_size=10)

moveit_commander.roscpp_initialize(sys.argv)
rospy.init_node('move_group_py', anonymous=True)
robot= moveit_commander.RobotCommander()
scene = moveit_commander.PlanningSceneInterface()
group = moveit_commander.MoveGroupCommander("arm")
#group.set_planner_id("RRTstarkConfigDefault")

#group.set_planning_time(1)
#group.set_named_target("Zero")

group.set_max_velocity_scaling_factor(1)
group.set_max_acceleration_scaling_factor(1)

rospy.sleep(2)

p = geometry_msgs.msg.PoseStamped()
p.header.frame_id = group.get_planning_frame()
p.pose.position.x = 0.
p.pose.position.y = 0.
p.pose.position.z = -0.005
scene.add_box("table",p,(1.5,1.5,0.01))


group.set_position_target([0.15,0.1,0.03])


plan = group.plan()

#print(plan)

if(plan):
    print("success")
    group.go(wait=True)

    #dne= group.get_current_joint_values()
    #plan = group.plan()
    #dne = plan[1].joint_trajectory.points[1].positions

    #pub1.publish(dne[0])
    #pub2.publish(dne[1])
    #pub3.publish(dne[2])
    #pub4.publish(dne[3])
    #pub5.publish(dne[4])
else:
    print("fail")


group.stop()
group.clear_pose_targets()
scene.remove_world_object("table")

moveit_commander.roscpp_shutdown()