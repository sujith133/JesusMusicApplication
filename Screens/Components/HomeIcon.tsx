import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import {StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

interface HomeIconProps extends SvgProps {
  active?: boolean;
}

const HomeIcon: React.FC<HomeIconProps> = (props) => {
  const { active, ...restProps } = props;
  const value = useSelector((state) => state.state.value);
  console.log(value)
  return (
    <View style={{alignItems:'center', width:80}}>
    <Svg
      width={27}
      height={26}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <Path
        fill={value===1 ? "#FD8B51" : "#ffffff"}
        d="M1.436 8.864l9.27-7.596A4.993 4.993 0 0 1 13.771 0a5.045 5.045 0 0 1 2.934 1.003c3.683 2.442 9.509 7.533 10.135 8.08l.091 12.968a6.262 6.262 0 0 1-5.227 3.93 6.102 6.102 0 0 1-3.76-1.048l-.046-4.847a5.58 5.58 0 0 0-3.717-1.703 5.65 5.65 0 0 0-3.94 1.355l-.184 5.02a5.385 5.385 0 0 1-2.891 1.223c-2.416.214-4.93-1.412-6.237-4.104.17-4.337.338-8.674.507-13.013Z"
      />
    </Svg>
    <Text style={value===1 ? styles.navText:styles.inActiveNavText}>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    navText: {
      color: '#FD8B51',
      fontSize: 16,
      fontWeight:'700',
    },
    inActiveNavText:{
      display:'none'
    }
  });

export default HomeIcon;
