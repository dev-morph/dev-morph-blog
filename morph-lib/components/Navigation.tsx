import classes from '@morphlib/sass/Navigation.module.scss';
import NavLink from './NavLink';

function Navigation({ children }: { children: React.ReactNode }) {
	return <nav className={classes.nav}>{children}</nav>;
}

Navigation.NavLink = NavLink;

export default Navigation;
