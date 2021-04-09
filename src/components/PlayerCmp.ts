import { EventBus } from 'src/core/EventBus';

export class PlayerComponent extends EventBus<Action, IEvent>{

   constructor(
      private video_el: HTMLVideoElement,
      private primary_sub_el: HTMLTrackElement,
      private secondary_sub_el: HTMLTrackElement,
   ) {
      super();
      this.state_change = this.state_change.bind(this);
      video_el.onseeked = this.onseeked.bind(this);
      video_el.ontimeupdate = this.ontimeupdate.bind(this);
      video_el.removeAttribute('hidden');
   }

   state_change({ video, primary_sub, secondary_sub }: Partial<IStateChange>) {
      if (video) {
         this.video_el.currentTime = video.timestamp;
      }
      if (primary_sub) {
         this.primary_sub_el.track.mode = primary_sub.is_visible ? 'showing' : 'hidden';
      }
      if (secondary_sub) {
         this.secondary_sub_el.track.mode = secondary_sub.is_visible ? 'showing' : 'hidden';
      }
   }

   private ontimeupdate() {
      this.dispatch('timeupdate', { timestamp: this.video_el.currentTime });
   }

   private onseeked() {
      this.dispatch('onseeked', { timestamp: this.video_el.currentTime });
   }

   /**
    * @param objectURL Local vidoe file, converted to objectURL
    * @param param1
    */
   set_video_local_source(objectURL: string, { type }: IVideoFileInfo): void {
      if (!this.video_el.canPlayType(type)) {
         this.display_error(new Error(`Video type ${type} is not supporting`));
      }
      this.video_el.src = objectURL;
   }

   set_primary_sub_local_source(objectURL: string): void {
      this.primary_sub_el.src = objectURL;
   };

   set_secondary_sub_local_source(objectURL: string): void {
      this.secondary_sub_el.src = objectURL;
   };

   private display_error(e: Error): void {
      alert('Error:' + e.message);
   }
}

interface IVideoFileInfo {
   type: string;
}

interface IStateChange {
   video: { timestamp: number; };
   primary_sub: { is_visible: boolean; },
   secondary_sub: { is_visible: boolean; },
}

interface IEvent {
   timestamp: number;
}

type Action = 'timeupdate' | 'onseeked';