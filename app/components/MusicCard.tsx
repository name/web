import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { Play, Pause, SpotifyLogo } from 'phosphor-react';

export function MusicCard({
  children,
  ...props
}: {
  children: React.ReactNode;
  title: string;
  artist: string;
  coverArt: string;
  previewUrl?: string;
  songUrl?: string;
}) {
  const { title, artist, coverArt, previewUrl, songUrl } = props;
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    const audio = new Audio(previewUrl);
    setAudio(audio);
  }, [previewUrl]);

  const handlePlay = () => {
    if (isPlaying) {
      audio?.pause();
      setIsPlaying(false);
    } else {
      audio?.play();
      setIsPlaying(true);
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent>
        <HoverCardContentData src={coverArt} title={title} author={artist} />
        <div className="flex gap-x-1.5 items-center">
          <button
            className="bg-[#1DB954] hover:bg-[#1DB954]/80 transition text-gray-1 py-1 flex items-center justify-center rounded-sm w-1/4 self-stretch"
            onClick={handlePlay}
          >
            {isPlaying ? (
              <Pause className="shrink-0" size={12} weight="fill" />
            ) : (
              <Play className="shrink-0" size={12} weight="fill" />
            )}
          </button>

          <a
            href={songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-x-1 text-sm bg-layout-dark justify-center w-full text-gray-5 py-1 rounded-sm font-medium hover:bg-gray-11 transition-colors duration-100 whitespace-nowrap"
          >
            <SpotifyLogo className="shrink-0" aria-hidden={true} />
            Listen on Spotify
          </a>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
function HoverCardTrigger({ children }: { children: React.ReactNode }) {
  return (
    <HoverCardPrimitive.Trigger asChild>{children}</HoverCardPrimitive.Trigger>
  );
}

function HoverCardContentData({
  src,
  title,
  author,
}: {
  src: string;
  title: string;
  author: string;
}) {
  return (
    <>
      <div className="aspect-square border rounded-[3px] border-layout-darker overflow-hidden relative">
        <img
          src={src}
          className="object-cover object-center w-full h-full"
          alt={`Album art for ${title} by ${author}`}
        />
      </div>
      <div className="mt-2 mb-1">
        <span className="text-text-lightest font-sm leading-none block truncate">{title}</span>
        <span className="text-text-lighter text-xs text-gray-10">by {author}</span>
      </div>
    </>
  );
}

function HoverCardContent({ children }: { children: React.ReactNode }) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        className="w-64 h-fit bg-layout-darker shadow-sm text-text-lighter rounded-[4px] pt-1 pb-1 px-1 border border-layout-dark outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        sideOffset={5}
      >
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
}

function HoverCard({ children }: { children: React.ReactNode }) {
  return (
    <HoverCardPrimitive.Root openDelay={200}>
      {children}
    </HoverCardPrimitive.Root>
  );
}
