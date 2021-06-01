import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

library.add(fas)

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Menu
          onSelect={index => console.log(index)}
          defaultOpenSubMenus={['2']}
          mode="vertical"
        >
          <MenuItem>menu 0</MenuItem>
          <MenuItem disabled>menu 1</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 0</MenuItem>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <SubMenu title="dropdown2">
            <MenuItem>dropdown 0</MenuItem>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
        </Menu>
        {/* <Button disabled> hello </Button>
        <Button size={ButtonSize.Large} className="custom"> hello </Button>
        <Button size={ButtonSize.Small}  btnType={ButtonType.Primary}> hello </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank"> hello </Button>
        <Button btnType={ButtonType.Link} disabled> hello </Button> */}
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
