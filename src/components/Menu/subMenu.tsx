import React, { CSSProperties, FunctionComponentElement, useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Transiton from '../Transition/transiton';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  style?: CSSProperties;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, style, children }) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as string[];
  const [menuOpen, setOpen] = useState(Boolean(context.mode === 'vertical' && index && openedSubMenus.includes(index)));
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': index === context.index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toogle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    setTimeout(() => {
      setOpen(toogle);
    }, 300)
  };
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};
  const mouseEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
  } : {};
  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }
    });
    return (
      <Transiton
        in={menuOpen}
        timeout={300}
        animation="zoom-in-top"
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transiton>
    );
  }
  return (
    <li className={classes} style={style} {...mouseEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"/>
      </div>
      {renderChildren()}
    </li>
  );
}
SubMenu.displayName = 'SubMenu';

export default SubMenu;