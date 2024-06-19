/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

// Font Awesome Icons
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/pro-regular-svg-icons';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboard',
        type: 'group',
        icon: faHouse.iconName,
        children: [
            {
                id: 'dashboards.general',
                title: 'General',
                type: 'basic',
                icon: faHouse.iconName,
                link: '/dashboard'
            },
        ]
    },
    {
        id: 'companies',
        title: 'Companies',
        type: 'basic',
        icon: faCity.iconName,
        link: '/companies'
    },
    {
        id: 'account',
        title: 'Profiles',
        type: 'group',
        icon: faIdCard.iconName,
        children: [
            {
                id: 'account.profiles',
                title: 'Profile List',
                type: 'basic',
                icon: faIdCard.iconName,
                link: '/profiles'
            },
        ]
    }, {
        id: 'cases',
        title: 'Cases',
        type: 'basic',
        icon: faBriefcase.iconName,
        link: '/cases'
    }, {
        id: 'rooms',
        title: 'Rooms',
        type: 'basic',
        icon: faClone.iconName,
        link: '/rooms'
    }, {
        id: 'forms',
        title: 'Forms',
        type: 'group',
        icon: faFile.iconName,
        children: [
            {
                id: 'forms.provider',
                title: 'Provider Forms',
                type: 'basic',
                icon: faFile.iconName,
                link: '/forms/provider'
            },
            {
                id: 'forms.datalists',
                title: 'Data Lists',
                type: 'basic',
                icon: faList.iconName,
                link: '/forms/datalists'
            },
            {
                id: 'forms.listtypes',
                title: 'List Types',
                type: 'basic',
                icon: faStar.iconName,
                link: '/forms/listtypes'
            }                                    
        ]
    },
];