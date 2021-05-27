import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Menu onSelect={index => console.log(index)} mode="vertical">
          <MenuItem index={0}>menu 0</MenuItem>
          <MenuItem index={1} disabled>menu 1</MenuItem>
          <MenuItem index={3}>menu 3</MenuItem>
          <MenuItem index={2}>menu 2</MenuItem>
        </Menu>
        <Button disabled> hello </Button>
        <Button size={ButtonSize.Large} className="custom"> hello </Button>
        <Button size={ButtonSize.Small}  btnType={ButtonType.Primary}> hello </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank"> hello </Button>
        <Button btnType={ButtonType.Link} disabled> hello </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
