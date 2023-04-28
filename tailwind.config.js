/** @type {import('tailwindcss').Config} */
const {iconsPlugin, getIconCollections} = require("@egoist/tailwindcss-icons")

module.exports = {
    content: [
        // Example content paths...
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    theme: {
        extend: {
            colors: {
                'body': '#F7F7F8',
            },
            boxShadow: {
                '3xl': 'inset 0 calc(-1 * 1px) 0 hsla(240,7%,70%,.35)',
            }
        }
    },
    plugins: [
        iconsPlugin({
            // Select the icon collections you want to use
            collections: getIconCollections(["mdi", "lucide", "material-symbols", "medical-icon", "clarity", "ion", "fa6-regular"]),
        }),
    ],
}

