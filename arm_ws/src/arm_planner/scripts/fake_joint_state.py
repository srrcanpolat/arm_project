#!/usr/bin/env python3

import rospy
from std_msgs.msg import Float64, String
from sensor_msgs.msg import JointState

def joint_callback(msg: JointState):
    #rate = rospy.Rate(100)
    dne = msg.position
    pub1.publish(dne[0])
    pub2.publish(dne[1])
    pub3.publish(dne[2])
    pub4.publish(dne[3])
    pub5.publish(dne[4])
    #rate.sleep()

if __name__ == "__main__":

    rospy.init_node('custom_joint', anonymous=True)
    try:
        sub= rospy.Subscriber("/joint_states",JointState, callback=joint_callback)
        pub1 = rospy.Publisher("/robot_arm/base_joint_position_controller/command", Float64, queue_size=10)
        pub2 = rospy.Publisher("/robot_arm/waist_joint_position_controller/command", Float64, queue_size=10)
        pub3 = rospy.Publisher("/robot_arm/arm1_joint_position_controller/command", Float64, queue_size=10)
        pub4 = rospy.Publisher("/robot_arm/arm2_joint_position_controller/command", Float64, queue_size=10)
        pub5 = rospy.Publisher("/robot_arm/arm3_joint_position_controller/command", Float64, queue_size=10)

        rospy.spin()

    except:
        rospy.signal_shutdown("Can't connect to Move Group")