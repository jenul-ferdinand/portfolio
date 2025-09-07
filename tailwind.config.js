/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                tiempos: ['Tiempos', 'serif'],
                poppins: ['Poppins', 'sans-serif']
            }
        },
    },
    plugins: [],
}

