import useTranslation from '@/hooks/useTranslation';
import { Bell, Menu } from 'lucide-react';

const Navbar = () => {
	const { currentLanguage, changeLanguage, t } = useTranslation({
		ns: 'common',
	});
	return (
		<div className="navbar bg-base-200 fixed z-10">
			<div className="navbar-start">
				<div className="dropdown">
					<button tabIndex={0} role="button" className="btn btn-ghost btn-circle">
						<Menu />
					</button>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
					>
						<li>
							<a>Homepage</a>
						</li>
						<li>
							<a>Portfolio</a>
						</li>
						<li>
							<a>About</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="navbar-center">
				<a className="btn btn-ghost normal-case text-xl">My Wallet</a>
			</div>
			<div className="navbar-end">
				<div className="tooltip tooltip-bottom" data-tip={t('i18n.toggleLanguage')}>
					<button
						onClick={() => changeLanguage(currentLanguage === 'en' ? 'es' : 'en')}
						className="btn btn-circle"
					>
						{currentLanguage === 'en' ? 'EN' : 'ES'}
					</button>
				</div>
				<button className="btn btn-ghost btn-circle">
					<Bell />
				</button>
			</div>
		</div>
	);
};

export default Navbar;
