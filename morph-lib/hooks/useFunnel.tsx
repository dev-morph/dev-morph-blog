'use client';

import React from 'react';
import { ReactNode, useState } from 'react';

function useFunnel<T>(initStep: Partial<T>) {
	const [step, setStep] = useState(initStep);

	function Step({
		children,
		name,
	}: {
		children: React.ReactNode;
		name: Partial<T>;
	}) {
		return <>{children}</>;
	}

	function Funnel({ children }: { children: React.ReactNode }) {
		// const foundChild = React.Children.toArray(children).find((child) => {
		const foundChild = React.Children.toArray(children).find((child) => {
			if (React.isValidElement(child)) {
				const stepProps = child.props;
				return stepProps.name === step;
			}
		});

		return <>{foundChild}</>;
	}

	Funnel.Step = Step;

	return { Funnel, setStep };
}

export default useFunnel;
