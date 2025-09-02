import { router } from '@inertiajs/react'

import qs from 'qs'
import { ChevronLeft, ChevronRight } from 'lucide-react'


// Traduce los labels de paginación si vienen como 'pagination.previous', etc.
const translateLabel = (label) => {
    if (label === 'pagination.previous' || label === '&laquo; Previous') return 'Anterior'
    if (label === 'pagination.next' || label === 'Next &raquo;') return 'Siguiente'
    if (label === '...') return '...'
    return label
}

const PageLink = ({ active, label, url, params }) => {
    const className = active ? 'join-item btn btn-active' : 'join-item btn'
    const translatedLabel = translateLabel(label)

    const onClick = () => {
        router.get(
            `${url}&${qs.stringify(params)}`,
            {},
            {
                replace: true,
                preserveState: true,
            }
        )
    }

    if (label === '&laquo; Previous' || label === 'pagination.previous') {
        return (
            <button
                onClick={onClick}
                className="join-item btn"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
        )
    }
    if (label === 'Next &raquo;' || label === 'pagination.next') {
        return (
            <button
                onClick={onClick}
                className="join-item btn"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        )
    }

    return (
        <button
            className={className}
            onClick={onClick}
        >
            {translatedLabel}
        </button>
    )
}

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
    const translatedLabel = translateLabel(label)
    if (label === '&laquo; Previous' || label === 'pagination.previous') {
        return (
            <button
                className="join-item btn btn-disabled"
                label="Anterior"
            >
                <ChevronLeft className="w-4 h-4 text-base-content" />
            </button>
        )
    }
    if (label === 'Next &raquo;' || label === 'pagination.next') {
        return (
            <button
                className="join-item btn btn-disabled"
                label="Siguiente"
            >
                <ChevronRight className="w-4 h-4 text-base-content" />
            </button>
        )
    }
    return <button className="join-item btn btn-disabled">{translatedLabel}</button>
}

export default ({ links = [], params = null }) => {
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.length === 3) return null
    return (
        <nav>
            <div className="inline-flex items-center">
                <div className="join">
                    {links.map(({ active, label, url }, index) => {
                        return url === null ? (
                            <PageInactive
                                key={`${label}-${index}`}
                                label={label}
                            />
                        ) : (
                            <PageLink
                                key={label}
                                label={label}
                                active={active}
                                url={url}
                                params={params}
                            />
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
