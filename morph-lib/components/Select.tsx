import { ReactComponentElement, ReactNode, useState } from 'react';
import Dropdown from './Dropdown';

type SelectProps = {
	placeholder: string;
	selectedValue: string | number | null;
	onChange: Function;
	options: string[] | any[];
	label?: string;
	value?: string;
};

export default function Select({
	placeholder,
	selectedValue,
	onChange,
	options,
	label,
	value,
}: SelectProps) {
	function getLabel(option: string | { [key: string]: string }) {
		if (typeof option === 'string') {
			return option;
		}
		return label && option[label];
	}
	return (
		<Dropdown
			onChange={onChange}
			trigger={
				<Dropdown.Trigger>
					{(selectedValue === null || selectedValue === undefined) &&
						placeholder}
					{selectedValue !== null &&
						selectedValue !== undefined &&
						options.length > 0 &&
						value &&
						label &&
						options.find(
							(option) => option[value] === selectedValue
						)[label]}
				</Dropdown.Trigger>
			}
			menu={
				<Dropdown.Menu>
					{options.map((option) => (
						<Dropdown.Item
							key={getLabel(option)}
							onClick={() =>
								onChange(value ? option[value] : option)
							}
						>
							{getLabel(option)}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			}
		></Dropdown>
	);
}
