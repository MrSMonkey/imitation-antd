import React from 'react';
import { render, fireEvent, RenderResult, cleanup, wait, waitFor } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>
          opened1
        </MenuItem>
      </SubMenu>
    </Menu>
  );
}
const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu{
      display: none;
    }
    .viking-submenu.menu-opened{
      display: block;
    }
  `;
  const styleElement: HTMLStyleElement = document.createElement('style');
  styleElement.innerHTML = cssFile;
  return styleElement;
};
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('viking-menu test');
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5);
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click item should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    fireEvent.click(disabledElement);
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
    expect(disabledElement).toHaveClass('is-disabled');
  })
  it('should render vertical mode when mode is set to vertival', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');

  })
  it('should show dropdown items when hover onsubMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  })
})
describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testVerProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
  })
  it('should show dropdown items when click on subMenu for vertical mode', async () => {
    const dropDownItem = wrapper.queryByText('drop1')
    expect(dropDownItem).not.toBeVisible();
    fireEvent.click(wrapper.getByText('dropdown'));
    expect(dropDownItem).toBeVisible();
  })
  it('should show dropdown items when defaultOpenSubMenus contains submenu index', () => {
    expect(wrapper.queryByText('opened1')).toBeVisible();
  })
})