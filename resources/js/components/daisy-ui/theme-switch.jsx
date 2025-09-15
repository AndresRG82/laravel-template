import { Moon, Settings2, Sun } from 'lucide-react'

export function ThemeSwitch() {
    const themes = {
        'claro': 'light',
        'oscuro': 'dark',
        'taza': 'cupcake',
        'abeja': 'bumblebee',
        'esmeralda': 'emerald',
        'corporativo': 'corporate',
        'synthwave': 'synthwave',
        'retro': 'retro',
        'cyberpunk': 'cyberpunk',
        'valentín': 'valentine',
        'halloween': 'halloween',
        'jardín': 'garden',
        'bosque': 'forest',
        'agua': 'aqua',
        'lofi': 'lofi',
        'pastel': 'pastel',
        'fantasía': 'fantasy',
        'wireframe': 'wireframe',
        'negro': 'black',
        'lujo': 'luxury',
        'drácula': 'dracula',
        'cmyk': 'cmyk',
        'otoño': 'autumn',
        'negocios': 'business',
        'ácido': 'acid',
        'limonada': 'lemonade',
        'noche': 'night',
        'café': 'coffee',
        'invierno': 'winter',
        'nórdico': 'nord',
        'tenue': 'dim',
        'atardecer': 'sunset',
    };

    return (
        <div className="dropdown dropdown-end hover:bg-base-200 p-1 rounded-2xl">
            <div
                tabIndex={0}
                role="button"
                className=""
            >
                <Settings2 className="w-5 h-5" />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-1 p-2 shadow bg-base-100 w-52 max-h-64 overflow-y-auto"
            >
                {Object.entries(themes).map(([label, value]) => (
                    <li key={value}>
                        <input
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            data-set-theme={value}
                            data-act-class="ACTIVECLASS"
                            aria-label={label}
                            value={value}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function DarkSwitch() {
    return (
        <label className="swap swap-rotate hover:bg-base-200 p-1 rounded-2xl">
            <input
                id='dark-mode-toggle'
                type="checkbox"
                data-toggle-theme="dark,light" // change here
                data-act-class="ACTIVECLASS"
                className="hidden theme-controller"
            />
            {/* sun icon */}
            <Moon className="swap-off h-5 w-5" />
            {/* moon icon */}
            <Sun className="swap-on h-5 w-5" />
        </label>
    )
}
