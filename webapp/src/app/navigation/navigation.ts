import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'mainMenu',
        title    : 'Главно меню',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id: 'organizations',
                title: 'Организации',
                translate: 'NAV.ORGANIZATIONS.TITLE',
                type: 'item',
                icon: 'business',
                url: '/organizations/list',
                // badge: {
                //     title: '25',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg: '#F44336',
                //     fg: '#FFFFFF'
                // }
            },
            {
                id: 'contacts',
                title: 'Контакти',
                translate: 'NAV.CONTACTS.TITLE',
                type: 'item',
                icon: 'contacts',
                url: '/contacts/list',
                // badge: {
                //     title: '25',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg: '#F44336',
                //     fg: '#FFFFFF'
                // }
            }
            // {
            //     id       : 'sample',
            //     title    : 'Sample',
            //     translate: 'NAV.SAMPLE.TITLE',
            //     type     : 'item',
            //     icon     : 'email',
            //     url      : '/sample',
            //     badge    : {
            //         title    : '25',
            //         translate: 'NAV.SAMPLE.BADGE',
            //         bg       : '#F44336',
            //         fg       : '#FFFFFF'
            //     }
            // }
        ]
    }
];
