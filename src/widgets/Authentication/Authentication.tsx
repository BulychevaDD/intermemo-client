import { FunctionComponent, useState } from 'react';
import { LogIn } from 'features/LogIn';
import { Register } from 'features/Register';

type ActiveCard = 'register' | 'logIn';

export const Authentication: FunctionComponent = () => {
  const [activeCard, setActiveCard] = useState<ActiveCard>('logIn');

  if (activeCard === 'logIn') {
    return <LogIn onSwitch={() => setActiveCard('register')} />;
  }

  return <Register onSwitch={() => setActiveCard('logIn')} />;
};
