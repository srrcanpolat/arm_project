#!/usr/bin/env python3
import sys
import copy
import rospy
import moveit_commander
import moveit_msgs.msg
import geometry_msgs.msg
from math import pi
from std_msgs.msg import String
from std_msgs.msg import Float64
from moveit_commander.conversions import pose_to_list
from tf.transformations import quaternion_from_euler

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

#group.set_planning_time(10)
#group.set_named_target("Zero")

rospy.sleep(1)
#print(group.get_current_pose())
p = geometry_msgs.msg.PoseStamped()
p.header.frame_id = group.get_planning_frame()
p.pose.position.x = 0.
p.pose.position.y = 0.
p.pose.position.z = -0.005
scene.add_box("table",p,(1.5,1.5,0.01))


group.set_position_target([0.2,0.1,0.03])


plan = group.plan()

print(plan)

if(plan):
    print("success")
    plan1 = group.go(wait=True)
    rospy.sleep(3)
    print(plan[1].joint_trajectory.points[0].positions)
    print(plan[1].joint_trajectory.points[1].positions)
    for i in range(0,3,1):
        try:
            joint_targets = plan[1].joint_trajectory.points[1].positions
            print(joint_targets)
        except:
            print("fail")
        pub1.publish(joint_targets[0])
        pub2.publish(joint_targets[1])
        pub3.publish(joint_targets[2])
        pub4.publish(joint_targets[3])
        pub5.publish(joint_targets[4])
else:
    print("fail")


group.stop()
group.clear_pose_targets()
scene.remove_world_object("table")

#a=group.get_current_pose()
#print(group.get_current_pose())

rospy.sleep(3)

moveit_commander.roscpp_shutdown()