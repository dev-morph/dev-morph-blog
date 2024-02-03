import React, { MouseEvent } from 'react';
import { createContext, useContext } from 'react';
import { useState } from 'react';
import classes from '@morphlib/sass/Dropdown.module.scss';

type DropdownProps = {
	label?: string;
	value?: string;
	onChange: Function;
	trigger: React.ReactElement<{
		setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	}>;
	menu: React.ReactNode;
};

const DropdownContext = createContext(null as any);

function Trigger({ children }: { children: React.ReactNode }) {
	const dropdownContext = useContext(DropdownContext);

	function handleClick() {
		dropdownContext.setIsOpen((prev: boolean) => !prev);
	}
	return (
		<div
			className={`${classes.trigger} ${
				dropdownContext.isOpen && classes.opened
			}`}
			onClick={handleClick}
		>
			{children}
		</div>
	);
}

function Menu({ children }: { children: React.ReactNode }) {
	return <ul className={classes.dropdown}>{children}</ul>;
}

function Item({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick?: Function;
}) {
	const dropdownContext = useContext(DropdownContext);
	function dropdownItemClickHandler(e: MouseEvent<HTMLElement>) {
		const target = e.target as HTMLElement;
		dropdownContext.onChange(target.innerHTML);
		dropdownContext.setIsOpen(false);
	}
	return (
		<li
			className={classes.item}
			onClick={() => {
				onClick && onClick();
				dropdownContext.setIsOpen(false);
			}}
		>
			{children}
		</li>
	);
}

function Dropdown({ onChange, trigger, menu }: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const contextValues = {
		isOpen,
		setIsOpen,
		onChange,
	};

	return (
		<DropdownContext.Provider value={contextValues}>
			<div className={classes.wrapper}>
				{trigger}
				{isOpen && menu}
			</div>
		</DropdownContext.Provider>
	);
}

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;
