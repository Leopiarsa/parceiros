import React from 'react';
import 'tailwindcss';

const MyButton = () => {
  return <button onClick={() => window.alert('CLICADO')}>Click me</button>;
};

export default MyButton;
