import { createContext, useState } from 'react';
import classes from '@morphlib/sass/HoverDropdown.module.scss';

const DropdownContext = createContext(null as any);

type DropdownProps = {
	trigger: React.ReactElement<{
		setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	}>;
	menu: React.ReactNode;
};

export function Trigger({ children }: { children: React.ReactNode }) {
	return <button className={classes.trigger}>{children}</button>;
}
export function Menu({ children }: { children: React.ReactNode }) {
	return <div className={classes.menu}>{children}</div>;
}

export function Item({ children }: { children: React.ReactNode }) {
	return <div className={classes.item}>{children}</div>;
}

function HoverDropdown({ trigger, menu }: DropdownProps) {
	return (
		<div className={classes.dropdown}>
			{trigger}
			{menu}
		</div>
	);
}

HoverDropdown.Trigger = Trigger;
HoverDropdown.Menu = Menu;
HoverDropdown.Item = Item;

export default HoverDropdown;
