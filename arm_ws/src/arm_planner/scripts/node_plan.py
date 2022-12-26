#!/usr/bin/env python3

import sys
import rospy
import moveit_commander
from geometry_msgs.msg import PoseStamped, Vector3
from std_msgs.msg import Float64, String
import tf2_ros

def target_pos_callback(msg: Vector3):
    rate = rospy.Rate(3)

    group.set_position_target([msg.x,msg.y,msg.z])

    plan = group.plan()

    if(plan):
        print("success")
        group.go(wait=True)
        dne= group.get_current_joint_values()
        for i in range(0,1,1):
            pub1.publish(dne[0])
            pub2.publish(dne[1])
            pub3.publish(dne[2])
            pub4.publish(dne[3])
            pub5.publish(dne[4])
            rate.sleep()
    else:
        print("fail")


    group.stop()
    group.clear_pose_targets()

def target_name_callback(msg: String):
    #print(msg.data)
    rate = rospy.Rate(3)
    try:
        group.set_named_target(msg.data)
        plan = group.plan()
        if(plan):
            print("success")
            group.go(wait=True)
            dne= group.get_current_joint_values()
            for i in range(0,1,1):
                pub1.publish(dne[0])
                pub2.publish(dne[1])
                pub3.publish(dne[2])
                pub4.publish(dne[3])
                pub5.publish(dne[4])
                rate.sleep()
        else:
            print("fail")
    except:
        print("try fail")

    group.stop()
    group.clear_pose_targets()    
        

def get_pos_callback(msg):
    print(group.get_current_joint_values())

def shut():
    moveit_commander.roscpp_shutdown()




if __name__ == "__main__":
    moveit_commander.roscpp_initialize(sys.argv)
    rospy.init_node('move_group_py', anonymous=True)
    try:
        robot= moveit_commander.RobotCommander()
        scene = moveit_commander.PlanningSceneInterface()
        group = moveit_commander.MoveGroupCommander("arm")
    
        group.set_max_velocity_scaling_factor(1)
        group.set_max_acceleration_scaling_factor(1)

        sub= rospy.Subscriber("/target_pos",Vector3, callback=target_pos_callback)
        sub= rospy.Subscriber("/target_name",String, callback=target_name_callback)
        sub= rospy.Subscriber("/get_pos",String, callback=get_pos_callback)
        pub1 = rospy.Publisher("/robot_arm/base_joint_position_controller/command", Float64, queue_size=10)
        pub2 = rospy.Publisher("/robot_arm/waist_joint_position_controller/command", Float64, queue_size=10)
        pub3 = rospy.Publisher("/robot_arm/arm1_joint_position_controller/command", Float64, queue_size=10)
        pub4 = rospy.Publisher("/robot_arm/arm2_joint_position_controller/command", Float64, queue_size=10)
        pub5 = rospy.Publisher("/robot_arm/arm3_joint_position_controller/command", Float64, queue_size=10)

        rospy.sleep(2)

        p = PoseStamped()
        p.header.frame_id = group.get_planning_frame()
        p.pose.position.x = 0.
        p.pose.position.y = 0.
        p.pose.position.z = -0.005
        scene.add_box("table",p,(1.5,1.5,0.01))
        group.set_position_target([0.15,0.1,0.03])

        
        #tfBuffer = tf2_ros.Buffer()
        #trans = tfBuffer.lookup_transform('world', 'arm1_1', rospy.Time())
        #print(trans)

        rospy.spin()

        rospy.on_shutdown(shut)
    except:
        rospy.signal_shutdown("Can't connect to Move Group")