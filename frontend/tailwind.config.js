/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			text: '#212529',
  			border: 'hsl(var(--border))',
  			success: '#28a745',
  			danger: '#dc3545',
  			warning: '#ffc107',
  			info: '#17a2b8',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		spacing: {
  			navbar: '4rem'
  		},
  		fontFamily: {
  			sans: [
  				'Lato',
  				'sans-serif'
  			],
  			roboto: [
  				'Roboto',
  				'sans-serif'
  			],
  			notosans: [
  				'Noto Sans Warang Citi',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			navbar: '0 4px 6px rgba(0, 0, 0, 0.1)'
  		},
  		zIndex: {
  			'999': '999',
  			'1000': '1000'
  		},
  		keyframes: {
  			shake: {
  				'0%, 100%': {
  					transform: 'translateX(0)'
  				},
  				'20%, 60%': {
  					transform: 'translateX(-10px)'
  				},
  				'40%, 80%': {
  					transform: 'translateX(10px)'
  				}
  			}
  		},
  		animation: {
  			shake: 'shake 0.5s ease-in-out'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
