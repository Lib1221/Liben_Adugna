import React, { useEffect, useState } from "react";
import { FaGithub, FaStar } from "react-icons/fa";

/**
 * Live public GitHub numbers. Unauthenticated API, cached for an hour per browser.
 * If the request fails (rate limit, offline), the block simply does not render.
 */
type Stats = { repos: number; followers: number; stars: number };

const CACHE_KEY = "gh-pulse-v1";
const CACHE_TTL_MS = 60 * 60 * 1000;
const USER = "Lib1221";
const FLAGSHIP = "Smart_Gebere";

const readCache = (): Stats | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; stats: Stats };
    return Date.now() - parsed.at < CACHE_TTL_MS ? parsed.stats : null;
  } catch {
    return null;
  }
};

const writeCache = (stats: Stats) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), stats }));
  } catch {
    /* storage unavailable, fine */
  }
};

const GitHubPulse: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(() => (typeof window === "undefined" ? null : readCache()));

  useEffect(() => {
    if (stats) return;
    const controller = new AbortController();
    const headers = { Accept: "application/vnd.github+json" };
    Promise.all([
      fetch(`https://api.github.com/users/${USER}`, { headers, signal: controller.signal }),
      fetch(`https://api.github.com/repos/${USER}/${FLAGSHIP}`, { headers, signal: controller.signal }),
    ])
      .then(async ([user, repo]) => {
        if (!user.ok || !repo.ok) return;
        const u = (await user.json()) as { public_repos?: number; followers?: number };
        const r = (await repo.json()) as { stargazers_count?: number };
        const next: Stats = { repos: u.public_repos ?? 0, followers: u.followers ?? 0, stars: r.stargazers_count ?? 0 };
        writeCache(next);
        setStats(next);
      })
      .catch(() => {
        /* silent: the block is a bonus, never a dependency */
      });
    return () => controller.abort();
  }, [stats]);

  if (!stats) return null;

  return (
    <a
      href={`https://github.com/${USER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-3 p-3 bg-dark-300 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-dark-200 transition-colors"
      aria-label={`GitHub: ${stats.repos} public repositories, ${stats.followers} followers, ${stats.stars} stars on Smart Gebere`}
    >
      <span className="inline-flex items-center gap-2">
        <FaGithub size={14} aria-hidden="true" />
        <span>
          <strong className="text-white font-semibold">{stats.repos}</strong> repos ·{" "}
          <strong className="text-white font-semibold">{stats.followers}</strong> followers
        </span>
      </span>
      <span className="inline-flex items-center gap-1 text-yellow-500">
        <FaStar size={11} aria-hidden="true" />
        {stats.stars}
        <span className="text-gray-400">Smart Gebere</span>
      </span>
    </a>
  );
};

export default GitHubPulse;
