function config($translateProvider) {

    $translateProvider
        .translations('en', {

            // Define all menu elements
            DASHBOARD: 'Dashboard',
            ACCOUNT: 'Account',
            ATTRIBUTES: 'Attributes',
            ATTRIBUTES_TYPES: 'Types of Factor',
            ATTRIBUTES_FACTOR: 'Factor',
            ATTRIBUTES_METHOD: 'Method',
            HOLTS: 'Holts',
            BAYESIAN: 'Bayesian Network',

            // Define some custom text
            LANGUAGE: 'Language',
            LOGOUT: 'Logout',
            WELCOME: 'Welcome',
            MESSAGEINFO: 'You have 42 messages and 6 notifications.',
            SEARCH: 'Search for something...',
            COPYRIGHT: "Copyright",
            FOOTER: "Created By ALN & NHA",
            DEMO: 'Internationalization (sometimes shortened to \"I18N , meaning \"I - eighteen letters -N\") is the process of planning and implementing products and services so that they can easily be adapted to specific local languages and cultures, a process called localization . The internationalization process is sometimes called translation or localization enablement .',
            ADD: 'Add'
        })

        .translations('idn', {

            // Define all menu elements
            DASHBOARD: 'Beranda',
            ACCOUNT: 'Akun',
            ATTRIBUTES: 'Atribut',
            ATTRIBUTES_TYPES: 'Jenis Faktor',
            ATTRIBUTES_FACTOR: 'Faktor',
            ATTRIBUTES_METHOD: 'Metode',
            HOLTS: 'Holts',
            BAYESIAN: 'Bayesian Network',

            // Define some custom text
            LANGUAGE: 'Bahasa',
            LOGOUT: 'Keluar',
            WELCOME: 'Selamat Datang',
            MESSAGEINFO: 'Kamu memiliki 42 pesan dan 6 notifikasi.',
            SEARCH: 'Mencari sesuatu...',
            COPYRIGHT: "Hak Cipta",
            FOOTER: "Dibuat oleh ALN & NHA",
            DEMO: 'Internasionalisasi (terkadang disingkat menjadi \"I18N , artiunya \"I - delapan huruf -N\") merupakan proses untuk persiapan dan implementasi produk dan servis agar bisa menyesuaikan budaya.',
            ADD: 'Tambah'
        });

    $translateProvider.preferredLanguage('idn');

}

angular
    .module('spps')
    .config(config)
