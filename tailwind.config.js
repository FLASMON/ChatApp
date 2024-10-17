import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },

            screens: {
                'sm': '576px',
                'md': '768px',
                'lg': '992px',
                'xl': '1200px',
                '2xl': '1600px',
            },
            backgroundImage: {
                'gradient-red-purple': 'linear-gradient(135deg, #5372FD 0%, #C97BFE 100%)',
                'gradient-purple-pink': 'linear-gradient(135deg, #A108B9 0%, #E027FE 100%)',
                'gradient-blue-purple': 'linear-gradient(135deg, #684BE2 0%, #11E6F8 100%)',
                'gradient-orange-yellow': 'linear-gradient(135deg, #FE534E 0%, #FCA40D 100%)',
            },
            colors: {
                primary: "#0078D4",
                secondary: "#6c7a91",
                tertiaire: "#B2814E",
                link: "#206bc4",
                link_hover: "#206bc4",
                danger: "#d63939",
                success: "#2fb344",
                warning: "#f76707",
                info: "#4299e1",
            },

            width: {
                '300': '500px',
            },
        },
    },

    plugins: [forms],
};
