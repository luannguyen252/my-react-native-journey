import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #272343;
  justify-content: center;
  width: 100%;
  align-items: center;
`;
export const CurrentDay = styled.View`
  position: relative;
  flex: 1;
  margin-top: 60px;
  align-items: center;
`;

export const City = styled.Text`
  font-size: 22px;
  font-weight: 300;
  color: white;
  padding-bottom: 20px;
`;
export const BigText = styled.Text`
  font-size: 35px;
  font-weight: 100;
  color: white;
  padding-bottom: 20px;
`;

export const BigIcon = styled.Image`
  width: 168px;
  height: 168px;
  padding-bottom: 40px;
`;

export const Temp = styled.Text`
  font-size: 80px;
  font-weight: 100;
  color: #bae8e8;
`;
export const Description = styled.Text`
  font-size: 24px;
  font-weight: 100;
  color: #bae8e8;
  padding-top: 20px;
`;

export const Week = styled.ScrollView`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  position: absolute;
  background: black;
`;

export const Day = styled.View`
  height: 150px;
  width: 75px;
  justify-content: center;
  align-items: center;
`;

export const SmallIcon = styled.Image`
  width: 50px;
  height: 50px;
`;
export const SmallText = styled.Text`
  font-size: 20px;
  font-weight: 300;
  color: white;
`;
