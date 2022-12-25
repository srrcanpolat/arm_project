#!/usr/bin/env python3
import sys
import copy
import rospy
import moveit_commander
import moveit_msgs.msg
import geometry_msgs.msg
from math import pi
from std_msgs.msg import String
from moveit_commander.conversions import pose_to_list
from tf.transformations import quaternion_from_euler

moveit_commander.roscpp_initialize(sys.argv)
rospy.init_node('move_group_py', anonymous=True)
robot= moveit_commander.RobotCommander()
scene = moveit_commander.PlanningSceneInterface()
group = moveit_commander.MoveGroupCommander("arm")
#oup.set_planner_id("RRTstarkConfigDefault")

q = quaternion_from_euler(0, -1.57, 0)
#print(q)
#pose_goal = geometry_msgs.msg.Pose()
#pose_goal.orientation.x=q[0]
#pose_goal.orientation.y=q[1]
#pose_goal.orientation.z=q[2]
#pose_goal.orientation.w = q[3]
#pose_goal.position.x = 0.13
#pose_goal.position.y = -0.1324800212813781067
#pose_goal.position.z = 0.2
#group.set_pose_target(pose_goal)
#group.set_planning_time(10)
#group.set_named_target("Zero")

#a=group.get_current_pose()
#a.pose.position.x = 0.28
#a.pose.position.z = 0.26
#group.set_pose_target(a)

pose_goal = geometry_msgs.msg.PoseStamped()
pose_goal.header.seq = group.get_current_pose().header.seq
pose_goal.header.stamp = group.get_current_pose().header.stamp
pose_goal.header.frame_id = group.get_current_pose().header.frame_id
pose_goal.pose.position.x = 0.15
pose_goal.pose.position.y = -0.08
pose_goal.pose.position.z = 0.27
pose_goal.pose.orientation.w = 0.9
group.set_pose_target(pose_goal)


plan1 = group.plan()

#plan = group.go(wait=True)
#group.stop()
group.clear_pose_targets()

#a=group.get_current_pose()
print(group.get_current_pose())

rospy.sleep(5)

moveit_commander.roscpp_shutdown()