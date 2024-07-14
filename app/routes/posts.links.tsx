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
      <p className="pt-2">[cunjur@1λ.com ~] <span className="text-green-400">::</span> cat links.md</p>
      <p className="font-sans pl-1">
        &gt; This is my list of cool digital gardens, blogs, and personal sites that I love or get inspiration from.<br />
        &gt; I hope you find something interesting here!
      </p>
      <ul className="font-mono pt-4">
        <li className="hover:bg-green-400 hover:text-white rounded-sm py-0.5 px-1 text-green-400">
          <a href="https://hitorilabs.com/" className="cursor-pointer" target="_blank">
            <div className="chrono-list">
                <span className="chrono-list-date">hitorilabs</span>
                <span className="chrono-list-label">hitorilabs.com</span>
            </div>
          </a>
        </li>
        <li className="hover:bg-green-400 hover:text-white rounded-sm py-0.5 px-1 text-green-400">
          <a href="https://juw.ee/" className="cursor-pointer" target="_blank">
            <div className="chrono-list">
                <span className="chrono-list-date">juwee</span>
                <span className="chrono-list-label">juw.ee</span>
            </div>
          </a>
        </li>
        <li className="hover:bg-green-400 hover:text-white rounded-sm py-0.5 px-1 text-green-400">
          <a href="https://ana.sh/" className="cursor-pointer" target="_blank">
            <div className="chrono-list">
                <span className="chrono-list-date">ana</span>
                <span className="chrono-list-label">ana.sh</span>
            </div>
          </a>
        </li>
        <li className="hover:bg-green-400 hover:text-white rounded-sm py-0.5 px-1 text-green-400">
          <a href="https://qtnx.ai/" className="cursor-pointer" target="_blank">
            <div className="chrono-list">
                <span className="chrono-list-date">Q</span>
                <span className="chrono-list-label">qtnx.ai</span>
            </div>
          </a>
        </li>
        <li className="hover:bg-green-400 hover:text-white rounded-sm py-0.5 px-1 text-green-400">
          <a href="https://echo4eva.com/" className="cursor-pointer" target="_blank">
            <div className="chrono-list">
                <span className="chrono-list-date">echo4eva</span>
                <span className="chrono-list-label">echo4eva.com</span>
            </div>
          </a>
        </li>
        <li className="hover:bg-green-400 hover:text-white rounded-sm py-0.5 px-1 text-green-400">
          <a href="https://yacine.ca/" className="cursor-pointer" target="_blank">
            <div className="chrono-list">
                <span className="chrono-list-date">yacine</span>
                <span className="chrono-list-label">yacine.ca</span>
            </div>
          </a>
        </li>
        <li className="hover:bg-green-400 hover:text-white rounded-sm py-0.5 px-1 text-green-400">
          <a href="https://shen.land/" className="cursor-pointer" target="_blank">
            <div className="chrono-list">
                <span className="chrono-list-date">shen</span>
                <span className="chrono-list-label">shen.land</span>
            </div>
          </a>
        </li>
        <li className="hover:bg-green-400 hover:text-white rounded-sm py-0.5 px-1 text-green-400">
          <a href="https://simo.sh/" className="cursor-pointer" target="_blank">
            <div className="chrono-list">
                <span className="chrono-list-date">simo</span>
                <span className="chrono-list-label">simo.sh</span>
            </div>
          </a>
        </li>
      </ul>

      
    </div>
  );
}
