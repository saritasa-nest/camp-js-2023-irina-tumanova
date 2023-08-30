import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';

// Props can be anything.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomNavLink = forwardRef<any, any>((props, ref) => (
	<NavLink ref={ref} {...props}>
		{props.children}
	</NavLink>
));
