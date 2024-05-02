/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboard',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'dashboards.general',
                title: 'General',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/dashboard'
            },
       /*       {
                id: 'dashboards.analytics',
                title: 'Analytics',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/dashboards/analytics'
            }, */
        ]
    },
    {
        id: 'companies',
        title: 'Companies',
        type: 'basic',
        icon: 'heroicons_outline:office-building',
        link: '/companies'
    },
    {
        id: 'account',
        title: 'Profiles',
        type: 'group',
        icon: 'heroicons_outline:users',
        children: [
            {
                id: 'account.profiles',
                title: 'Profile List',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/profiles'
            },
            {
                id: 'account.types',
                title: 'Profile Types',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/profiles/types'
            },{
                id: 'account.roles',
                title: 'Roles',
                type: 'basic',
                icon: 'heroicons_outline:lock-closed',
                link: '/profiles/roles'
            },
        ]
    }, {
        id: 'cases',
        title: 'Cases',
        type: 'basic',
        icon: 'heroicons_outline:briefcase',
        link: '/cases'
    }, {
        id: 'rooms',
        title: 'Rooms',
        type: 'basic',
        icon: 'heroicons_outline:collection',
        link: '/rooms'
    }, {
        id: 'forms',
        title: 'Forms',
        type: 'group',
        icon: 'heroicons_outline:document',
        children: [
            {
                id: 'forms.types',
                title: 'Types',
                type: 'basic',
                icon: 'heroicons_outline:document-duplicate',
                link: '/forms/types'
            },
            {
                id: 'forms.provider',
                title: 'Provider Forms',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                link: '/forms/provider'
            },
            {
                id: 'forms.datalists',
                title: 'Data Lists',
                type: 'basic',
                icon: 'heroicons_outline:view-list',
                link: '/forms/datalists'
            },
            {
                id: 'forms.listtypes',
                title: 'List Types',
                type: 'basic',
                icon: 'heroicons_outline:star',
                link: '/forms/listtypes'
            }                                    
        ]
    },
];