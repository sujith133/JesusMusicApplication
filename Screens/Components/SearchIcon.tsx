import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import {StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux'; 

interface HomeIconProps extends SvgProps {
  active?: boolean;
}

const SearchIcon: React.FC<HomeIconProps> = (props) => {
  const { active, ...restProps } = props;
  const value = useSelector((state) => state.state.value);
  return (
    <View style={{alignItems:'center', width:80}}>
    <Svg
      width={31}
      height={29}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <Path
      fill={value===2 ? "#FD8B51" : "#ffffff"}
      fillRule="evenodd"
      d="M7.625 4.602a10.957 10.957 0 0 1 9.335-1.355l7.219 7.22A10.958 10.958 0 1 1 7.625 4.602Zm16.554 5.864 3.247 3.247c0 2.688-.79 5.316-2.271 7.558l4.984 5.148a1.377 1.377 0 1 1-1.98 1.917l-4.76-4.917A13.711 13.711 0 0 1 .263 16.39 13.713 13.713 0 0 1 13.713 0l3.247 3.247 7.219 7.219Zm0 0a10.957 10.957 0 0 0-7.219-7.22L13.713 0a13.713 13.713 0 0 1 13.713 13.713l-3.247-3.247Z"
      clipRule="evenodd"
    />
    </Svg>
    <Text style={value===2 ? styles.navText:styles.inActiveNavText}>Search</Text>
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

export default SearchIcon;
