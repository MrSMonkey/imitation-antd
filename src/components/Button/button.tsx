import React, { FC } from 'react';
import classNames from 'classnames';

type ButtonSize = 'lg' | 'sm';
type ButtonType = 'primary' | 'default' | 'danger' | 'link' ;

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  btnType?: ButtonType;
  size?: ButtonSize;
  children: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    disabled,
    btnType,
    size,
    children,
    href,
    ...restProps
  } = props;
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disbaled: (btnType === 'link') && disabled,
  })
  if(btnType === 'link' && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}

export default Button;