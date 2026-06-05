import { useState, useEffect } from 'react'
import { FiExternalLink, FiGitPullRequest } from 'react-icons/fi'
import fallbackContributions, {
  EXCLUDE_OWNERS,
  MAX_ITEMS,
  SEARCH_URL,
  overrides,
} from '../data/contributions'
import styles from './OpenSource.module.css'

// Map a GitHub Search API PR result to the display shape, applying any curated
// override (keyed by PR URL). Falls back to the PR's own title.
function toContribution(item) {
  const [owner, name] = item.repository_url.split('/repos/')[1].split('/')
  const url = item.html_url
  const o = overrides[url] || {}
  return {
    owner,
    type: o.type || 'Merged PR',
    project: o.project || name,
    description: o.description || item.title,
    repo: `${owner}/${name}`,
    date: item.closed_at || item.created_at,
    url,
  }
}

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

function OpenSource() {
  // Live-fetch my merged PRs to repos I don't own; curate individual ones via
  // the overrides map. `loaded` guards against flashing the empty state before
  // the fetch settles. On failure we fall back to the (manual) baked list.
  const [items, setItems] = useState(fallbackContributions)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(SEARCH_URL, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled) return
        const excluded = EXCLUDE_OWNERS.map((o) => o.toLowerCase())
        const list = (data.items || [])
          .map(toContribution)
          .filter((c) => !excluded.includes(c.owner.toLowerCase()))
          .slice(0, MAX_ITEMS)
        setItems(list)
      })
      .catch(() => {
        /* keep the baked fallback */
      })
      .finally(() => {
        if (!cancelled) setLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className={`${styles.openSource} section-padding`}>
      <div className={styles.header}>
        <h2 className={styles.title}>OPEN</h2>
        <h2 className={styles.titleOutline}>SOURCE</h2>
        <div className={styles.line} />
      </div>

      <p className={styles.intro}>
        Working in code I didn&apos;t write — through review, on the maintainer&apos;s
        terms. Where my contributions to other people&apos;s projects land.
      </p>

      {!loaded ? null : items.length > 0 ? (
        <ul className={styles.list}>
          {items.map((c) => (
            <li key={c.url} className={styles.item}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.itemLink}
              >
                <div className={styles.itemMain}>
                  <span className={styles.itemType}>{c.type}</span>
                  <h3 className={styles.itemProject}>{c.project}</h3>
                  <p className={styles.itemDesc}>{c.description}</p>
                  <span className={styles.itemRepo}>
                    {c.repo}{c.date ? ` · ${formatDate(c.date)}` : ''}
                  </span>
                </div>
                <FiExternalLink className={styles.itemIcon} />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <FiGitPullRequest className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>Contributions incoming</h3>
          <p className={styles.emptyText}>
            Next on my list — giving back to the open-source tools I build with.
            Merged pull requests will live here.
          </p>
        </div>
      )}
    </div>
  )
}

export default OpenSource
