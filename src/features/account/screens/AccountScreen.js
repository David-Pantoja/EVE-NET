import React from 'react';

//all styling
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
} from '../components/Account.styles';
import { Spacer } from '../../../components/Spacer/Spacer';

//navigates user to login or signup page
export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <Title variant="caption">Eve-Net</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
