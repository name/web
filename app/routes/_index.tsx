import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { getNowPlaying } from "~/utils/spotify.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MusicCard } from '~/components/MusicCard';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
  const track = await getNowPlaying();
  return json({ track });
};

export const meta: MetaFunction = () => {
  return [
    { title: "1λ" },
    { name: "description", content: "infra, swe, and ml ~ dm's open." },
  ];
};

export default function Index() {
  const { track } = useLoaderData<typeof loader>();

  if (!track) {
    return <p>Having problems!!</p>;
  }

  const [domain, setDomain] = useState('');
  const location = useLocation();

  useEffect(() => {
    // This will only run on the client side
    setDomain(window.location.hostname);
  }, []);

  const BIRTH = new Date('2001-08-02T00:00:00Z');
  const YEAR_MILLIS = 31556952000;

  const age = useMemo(() => Math.floor((Date.now() - BIRTH.getTime()) / YEAR_MILLIS), []);

  return (
    <div className="relative">
      <hr />
      <div className="flex items-center justify-between">
        <h3 className="text-md py-2">
          {domain || 'Loading...'} ~ <span className="justify-center">
            <a href="/" className="cursor-pointer hover:text-green-400">[home]</a>
            </span> 
        </h3>
        <span className="text-xs">{track.isPlaying ? "Listening to" : "Last played"}{" "}
            <MusicCard
              title={track.title}
              artist={track.artist}
              coverArt={track.coverArt}
              previewUrl={track.previewUrl}
              songUrl={track.songUrl}
            >
              <span className="text-green-400 hover:bg-green-400 hover:text-white py-0.5 px-1 rounded-sm cursor-pointer">
                {track.title}
              </span>
            </MusicCard>{" "}</span>
            
      </div>
      <hr />
      <p className="pt-2">[cunjur@1λ.com ~] <span className="text-green-400">::</span> cat about.md</p>
      <p className="font-sans pl-1">
        &gt; Infra, swe, and ml ~ dm's open.
      </p>
      <p className="font-sans pl-1">
        &gt; Welcome to my 'corner of the internet'.
        I'm currently a {age} y/o <a href="https://hitorilabs.com/posts/super_neets/" className="text-green-400 hover:bg-green-400 hover:text-white py-0.5 px-1 rounded-sm cursor-pointer">super neet</a>. 
      </p>
      <p className="font-sans pl-1">
        &gt; Most of my work revolves around building and maintaining infrastructure, software engineering, and machine learning.
      </p>
      <p className="pt-2">[cunjur@1λ.com ~] <span className="text-green-400">::</span> cat recent_posts.md</p>
      <ul className="font-mono">
        <li className="hover:bg-green-400 hover:text-white rounded-sm py-0.5 px-1 text-green-400">
          <a href="/posts/links" className="cursor-pointer">
            <div className="chrono-list">
                <span className="chrono-list-date">2024-07-14</span>
                <span className="chrono-list-label">links</span>
            </div>
          </a>
        </li>
      </ul>
      <p className="pt-2">[cunjur@1λ.com ~] <span className="text-green-400">::</span> cat links.md</p>
      <ul className="font-mono">
        <li className="hover:bg-green-400 hover:text-white rounded-sm py-0.5 px-1 text-green-400">
          <a href="https://x.com/cunjur" className="cursor-pointer" target="_blank">
            <div className="chrono-list">
                <span className="chrono-list-date">x.com</span>
                <span className="chrono-list-label">cunjur</span>
            </div>
          </a>
        </li>
        <li className="hover:bg-green-400 hover:text-white rounded-sm py-0.5 px-1 text-green-400">
          <a href="https://github.com/name" className="cursor-pointer" target="_blank">
            <div className="chrono-list">
                <span className="chrono-list-date">github.com</span>
                <span className="chrono-list-label">name</span>
            </div>
          </a>
        </li>
        <li className="hover:bg-green-400 hover:text-white rounded-sm py-0.5 px-1 text-green-400">
          <a href="mailto:mail@sakuraji.me" className="cursor-pointer" target="_blank">
            <div className="chrono-list">
                <span className="chrono-list-date">email</span>
                <span className="chrono-list-label">mail@sakuraji.me</span>
            </div>
          </a>
        </li>
      </ul>
      <p className="pt-2">[cunjur@1λ.com ~] <span className="text-green-400">::</span> cat network.md</p>
      <p className="font-sans pl-1">
      &gt; If your inquiry is related to a network I manage or control, please send an email to my email listed on the respective WHOIS contact.<br />
      &gt; If it's a P1 emergency, you can email <a href="mailto:ops@multi.sh" className="text-green-400 hover:bg-green-400 hover:text-white py-0.5 px-1 rounded-sm cursor-pointer">ops@multi.sh</a>.
      </p>
    </div>
  );
}
