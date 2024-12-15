import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import {StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

interface HomeIconProps extends SvgProps {
  active?: boolean;
}

const LibraryIcon: React.FC<HomeIconProps> = (props) => {
  const { active, ...restProps } = props;
  const value = useSelector((state) => state.state.value);
  return (
    <View style={{alignItems:'center', width:80}}>
    <Svg
      width={30}
      height={26}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <Path
      fill={value===3 ? "#FD8B51" : "#ffffff"}
      d="M22.947.677a8.036 8.036 0 0 0-8.613 1.394A8.04 8.04 0 0 0 5.72.677C1.108 2.718-1.18 8.641.607 13.907 2.394 19.172 14.317 26 14.317 26l.012-.037.012.037s11.924-6.825 13.71-12.089C29.84 8.647 27.558 2.718 22.948.677Z"
    />
    </Svg>
    <Text style={value===3 ? styles.navText : styles.inActiveNavText}>Library</Text>
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
export default LibraryIcon;
