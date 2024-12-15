import React from 'react';
import Svg, { Path, SvgProps, G, ClipPath, Defs } from 'react-native-svg';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

interface HomeIconProps extends SvgProps {
  active?: boolean;
}

const InfoIcon: React.FC<HomeIconProps> = ({ active = false, ...restProps }) => {
  const value = useSelector((state) => state.state.value);
  return (
    <View style={{ alignItems: 'center', width:80}}>
      <Svg
        width={28}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...restProps}
      >
        <G clipPath="url(#clipPathId)">
          <Path
            stroke={value===4 ? "#FD8B51" : "#ffffff"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M14 18.667V14m0-4.667h.012M25.667 14c0 6.443-5.224 11.667-11.667 11.667S2.333 20.443 2.333 14 7.557 2.333 14 2.333 25.667 7.557 25.667 14Z"
          />
        </G>
        <Defs>
          <ClipPath id="clipPathId">
            <Path fill={value===4 ? "#FD8B51" : "#ffffff"} d="M0 0h28v28H0z" />
          </ClipPath>
        </Defs>
      </Svg>
      <Text style={value===4 ? styles.navText:styles.inActiveNavText}>Info</Text>
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

export default InfoIcon;
