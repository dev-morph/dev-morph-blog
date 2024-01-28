import { ReactComponentElement, ReactNode, useState } from 'react';
import Dropdown from './Dropdown';

type SelectProps = {
	placeholder: string;
	onChange: Function;
	options: string[];
};

export default function Select({
	placeholder,
	onChange,
	options,
}: SelectProps) {
	return (
		<Dropdown
			onChange={onChange}
			trigger={<Dropdown.Trigger>{placeholder}</Dropdown.Trigger>}
			menu={
				<Dropdown.Menu>
					{options.map((option) => (
						<Dropdown.Item key={option}>{option}</Dropdown.Item>
					))}
				</Dropdown.Menu>
			}
		></Dropdown>
	);
}
