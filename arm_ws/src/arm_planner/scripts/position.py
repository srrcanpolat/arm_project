#!/usr/bin/env python3  
import rospy

import tf2_ros
import geometry_msgs.msg

if __name__ == '__main__':
    rospy.init_node('joint_tf')

    tfBuffer = tf2_ros.Buffer()
    listener = tf2_ros.TransformListener(tfBuffer)
    
    base_pos = rospy.Publisher('base_joint/joint_pos', geometry_msgs.msg.Vector3, queue_size=1)
    waist_pos = rospy.Publisher('waist_joint/joint_pos', geometry_msgs.msg.Vector3, queue_size=1)
    arm1_pos = rospy.Publisher('arm1_joint/joint_pos', geometry_msgs.msg.Vector3, queue_size=1)
    arm2_pos = rospy.Publisher('arm2_joint/joint_pos', geometry_msgs.msg.Vector3, queue_size=1)
    arm3_pos = rospy.Publisher('arm3_joint/joint_pos', geometry_msgs.msg.Vector3, queue_size=1)
    gripper_pos = rospy.Publisher('gripper/joint_pos', geometry_msgs.msg.Vector3, queue_size=1)

    rate = rospy.Rate(5)
    while not rospy.is_shutdown():
        try:
            trans1 = tfBuffer.lookup_transform('world', "waist_1", rospy.Time(0))
            trans2 = tfBuffer.lookup_transform('world', "arm1_1", rospy.Time(0))
            trans3 = tfBuffer.lookup_transform('world', "arm2_1", rospy.Time(0))
            trans4 = tfBuffer.lookup_transform('world', "arm3_1", rospy.Time(0))
            trans5 = tfBuffer.lookup_transform('world', "gripper_1", rospy.Time(0))
            trans6 = tfBuffer.lookup_transform('world', "gripper_2", rospy.Time(0))
        except (tf2_ros.LookupException, tf2_ros.ConnectivityException, tf2_ros.ExtrapolationException):
            rate.sleep()
            continue

        msg1 = geometry_msgs.msg.Vector3()
        msg2 = geometry_msgs.msg.Vector3()
        msg3 = geometry_msgs.msg.Vector3()
        msg4 = geometry_msgs.msg.Vector3()
        msg5 = geometry_msgs.msg.Vector3()
        msg6 = geometry_msgs.msg.Vector3()

        msg1.x=trans1.transform.translation.x
        msg1.y=trans1.transform.translation.y
        msg1.z=trans1.transform.translation.z

        msg2.x=trans2.transform.translation.x
        msg2.y=trans2.transform.translation.y
        msg2.z=trans2.transform.translation.z

        msg3.x=trans3.transform.translation.x
        msg3.y=trans3.transform.translation.y
        msg3.z=trans3.transform.translation.z

        msg4.x=trans4.transform.translation.x
        msg4.y=trans4.transform.translation.y
        msg4.z=trans4.transform.translation.z

        msg5.x=trans5.transform.translation.x
        msg5.y=trans5.transform.translation.y
        msg5.z=trans5.transform.translation.z

        msg6.x=trans6.transform.translation.x
        msg6.y=trans6.transform.translation.y
        msg6.z=trans6.transform.translation.z
        

        base_pos.publish(msg1) 
        waist_pos.publish(msg2)
        arm1_pos.publish(msg3) 
        arm2_pos.publish(msg4) 
        arm3_pos.publish(msg5) 
        gripper_pos.publish(msg6)

        rate.sleep()