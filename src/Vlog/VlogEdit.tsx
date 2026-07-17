import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { palette } from "./constants";
import { Grain } from "./effects/Grain";
import { LightLeak } from "./effects/LightLeak";
import { FlashTransition } from "./effects/FlashTransition";
import { IntroScene } from "./scenes/IntroScene";
import { BRollScene } from "./scenes/BRollScene";
import { PhotoScene } from "./scenes/PhotoScene";
import { DialogueScene } from "./scenes/DialogueScene";
import { FreezeMomentScene } from "./scenes/FreezeMomentScene";
import { OutroScene } from "./scenes/OutroScene";

const CUT = 8; // frames for each white flash-pop cut between scenes

/**
 * A first-pass assembly of the "cyber diary" style guide: title cards,
 * stylized b-roll, a photo insert, a deliberately-plainer dialogue beat,
 * a freeze-frame "memorable moment", and an outro - stitched together
 * with flash-pop cuts, with a constant light film-grain pass over the top.
 *
 * All footage/photos are placeholders (see PlaceholderShot / PhotoMoment) -
 * swap them for real clips once footage lands in public/footage/.
 */
export const VlogEdit: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: palette.ink }}>
    <Series>
      <Series.Sequence durationInFrames={90}>
        <IntroScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={CUT}>
        <FlashTransition durationInFrames={CUT} />
      </Series.Sequence>

      <Series.Sequence durationInFrames={150}>
        <BRollScene label="walking — golden hour" seed="broll-1" word="MOOD" />
      </Series.Sequence>

      <Series.Sequence durationInFrames={CUT}>
        <FlashTransition durationInFrames={CUT} />
      </Series.Sequence>

      <Series.Sequence durationInFrames={90}>
        <PhotoScene label="polaroid, cafe table" seed="photo-1" durationInFrames={90} />
      </Series.Sequence>

      <Series.Sequence durationInFrames={CUT}>
        <FlashTransition durationInFrames={CUT} />
      </Series.Sequence>

      <Series.Sequence durationInFrames={130}>
        <DialogueScene
          label="catching up, kitchen table"
          seed="dialogue-1"
          location="brooklyn, ny"
          timestamp="07.17.2026 — 4:32pm"
          durationInFrames={130}
        />
      </Series.Sequence>

      <Series.Sequence durationInFrames={CUT}>
        <FlashTransition durationInFrames={CUT} />
      </Series.Sequence>

      <Series.Sequence durationInFrames={100}>
        <FreezeMomentScene
          label="laughing in the doorway"
          seed="freeze-1"
          freezeAt={55}
          durationInFrames={100}
        />
      </Series.Sequence>

      <Series.Sequence durationInFrames={CUT}>
        <FlashTransition durationInFrames={CUT} />
      </Series.Sequence>

      <Series.Sequence durationInFrames={130}>
        <AbsoluteFill>
          <BRollScene label="hair, close-up detail" seed="broll-2" word="ICONIC" />
          <LightLeak durationInFrames={130} />
        </AbsoluteFill>
      </Series.Sequence>

      <Series.Sequence durationInFrames={CUT}>
        <FlashTransition durationInFrames={CUT} />
      </Series.Sequence>

      <Series.Sequence durationInFrames={100}>
        <OutroScene />
      </Series.Sequence>
    </Series>

    <Grain />
  </AbsoluteFill>
);

export const VLOG_EDIT_DURATION_IN_FRAMES = 90 + CUT + 150 + CUT + 90 + CUT + 130 + CUT + 100 + CUT + 130 + CUT + 100;
