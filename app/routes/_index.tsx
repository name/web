import type { MetaFunction } from "@remix-run/node";
import { Greeting } from "~/components/Greeting";
import { getNowPlaying } from "~/utils/spotify.server";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MusicCard } from '~/components/MusicCard';
import {
  ArrowRight,
  ArrowUpRight,
  Copy,
} from "@phosphor-icons/react/dist/ssr/index";

export const loader: LoaderFunction = async () => {
  const track = await getNowPlaying();
  return json({ track });
};

export const meta: MetaFunction = () => {
  return [
    { title: "cunjur" },
    { name: "description", content: "infra, swe, and ml ~ dm's open." },
  ];
};

export default function Index() {
  const { track } = useLoaderData<typeof loader>();

  if (!track) {
    return <p>Having problems!!</p>;
  }

  const links = [
    {
      name: "GitHub",
      url: "https://github.com/name"
    },
    {
      name: "Twitter",
      url: "https://x.com/cunjur"
    },
    {
      name: "Email",
      url: "mailto:charlie@multiorb.net"
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex min-h-full flex-col justify-top px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <Greeting />
          <p>[cunjur@1λ.com ~] :: <span className="text-accent">$</span> cat about.md</p>
          <p>infra, swe, and ml. employeed neet.</p>
          <p className="pt-2">[cunjur@1λ.com ~] :: <span className="text-accent">$</span> cat links.md</p>
          <div className="grid grid-cols-5 gap-1">
            {links.map((link) => (
              <a href={link.url} className="flex gap-x-1.5 items-center text-gray-10 cursor-pointer text-sm">
              {link.name}{" "}
              <span
                className="w-3.5 h-3.5 p-0.5 bg-accent flex items-center justify-center rounded-sm"
                aria-hidden={true}
              >
                <ArrowUpRight size={12} className="shrink-0 text-gray-12" />
              </span>
            </a>
            ))}
          </div>
          <p className="pt-2">[cunjur@1λ.com ~] :: <span className="text-accent">$</span> cat recently.md</p>
          <p>
            {track.isPlaying ? "Listening to" : "Last played"}{" "}
            <MusicCard
              title={track.title}
              artist={track.artist}
              coverArt={track.coverArt}
              previewUrl={track.previewUrl}
              songUrl={track.songUrl}
            >
              <span className="text-accent hover:bg-accent hover:text-text-lightest rounded-sm py-0.5 px-0.5 cursor-pointer">
                {track.title}
              </span>
            </MusicCard>{" "}
            by {track.artist}.
          </p>

          <p className="pt-2">[cunjur@1λ.com ~] :: <span className="text-accent">$</span> cat network.md</p>
          <p>
          If your inquiry is related to a network I manage or control, please send an email to my email listed on the respective WHOIS contact. If it's a P1 emergency, you can email <a href="mailto:ops@multiorb.net" className="text-accent hover:bg-accent hover:text-text-lightest rounded-sm py-0.5 px-0.5">ops@multiorb.net</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
