/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'visit_node_animation': 'visit_node_animation 2s linear 1',
        'wall_node_animation': 'wall_node_animation 0.25s linear 1',
        'shortest_path_animation': 'shortest_path_animation 1.5s linear 1'
      },
      keyframes: {
        visit_node_animation: {
          '0%': {
            transform: 'scale(0.3)',
            rounded: 'border-radius: 0.25rem',
            backgroundColor: 'rgb(224 242 254)'
          },
          '25%': {
            transform: 'scale(1.5)',
            backgroundColor: 'rgb(29 78 216)'
          },
          '50%': {
            transform: 'scale(1.25)',
            backgroundColor: 'rgb(125 211 252)',
          },
          '100%': {
            transform: 'scale(1)',
            rounded: 'border-radius: 0.375rem',
            backgroundColor: 'rgb(2 132 199)'
          },
        },
        wall_node_animation: {
          '0%': {
            transform: 'scale(0.25)',
            backgroundColor: 'rgb(115 115 115)'
          },
          '25%': {
            transform: 'scale(0.5)',
            backgroundColor: 'rgb(82 82 82)'
          },
          '50%': {
            transform: 'scale(0.75)',
            backgroundColor: 'rgb(64 64 64)',
          },
          '100%': {
            transform: 'scale(1)',
            backgroundColor: 'rgb(23 23 23)'
          },
        },
        shortest_path_animation: {
          '0%': {
            transform: 'scale(0.25)',
            backgroundColor: 'rgb(180 83 9)'
          },
          '25%': {
            transform: 'scale(0.5)',
            backgroundColor: 'rgb(239 68 68)'
          },
          '50%': {
            transform: 'scale(1.25)',
            backgroundColor: 'rgb(234 88 12)',
          },
          '100%': {
            transform: 'scale(1)',
            backgroundColor: 'rgb(250 204 21)'
          },
        }
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
