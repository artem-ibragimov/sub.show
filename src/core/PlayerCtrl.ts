import { EventBus } from 'src/core/EventBus';

export class PlayerController extends EventBus<Action, Partial<IState>> {
   /** Step size in seconds */
   private step_size: number = 3;
   /** Timestamp before rewind */
   private end_timestamp: number = 0;
   private start_timestamp: number = 0;

   private state: IState = {
      video: { timestamp: 0 },
      primary_sub: { is_visible: false },
      secondary_sub: { is_visible: false },
   };

   constructor() {
      super();
      this.stepback = this.stepback.bind(this);
      this.onseeked = this.onseeked.bind(this);
      this.timeupdate = this.timeupdate.bind(this);
   }

   set_step_size(step_size: number): void {
      this.step_size = step_size;
   }

   stepback() {
      if (this.end_timestamp < this.state.video.timestamp) {
         this.stepback_first(this.state.video.timestamp - this.step_size);
         return;
      }
      this.stepback_second(this.start_timestamp);
   }

   private stepback_first(timestamp: number) {
      this.end_timestamp = this.state.video.timestamp;
      this.start_timestamp = timestamp;
      this.set_state({
         video: { timestamp },
         primary_sub: { is_visible: true },
         secondary_sub: { is_visible: false },
      });
   }

   private stepback_second(timestamp: number) {
      this.set_state({
         video: { timestamp },
         primary_sub: { is_visible: true },
         secondary_sub: { is_visible: true },
      });
   }

   timeupdate({ timestamp }: { timestamp: number; }) {
      this.state.video.timestamp = timestamp;
      if (
         this.start_timestamp <= this.state.video.timestamp &&
         this.state.video.timestamp <= this.end_timestamp
      ) { return; }
      this.hide_subs();
   }

   onseeked({ timestamp }: { timestamp: number; }) {
      if (timestamp === this.start_timestamp) { return; }
      this.start_timestamp = 0;
      this.end_timestamp = 0;
      this.hide_subs();
   }

   private hide_subs() {
      if (!this.state.primary_sub.is_visible && !this.state.secondary_sub.is_visible) { return; }
      this.set_state({
         primary_sub: { is_visible: false },
         secondary_sub: { is_visible: false }
      });
   }

   private set_state(state: Partial<IState>): void {
      this.state = { ...this.state, ...state };
      this.dispatch('state_change', state);
   }
}

type Action = 'state_change';

interface IVideoState {
   video: { timestamp: number; };
}

interface IState extends IVideoState {
   primary_sub: { is_visible: boolean; },
   secondary_sub: { is_visible: boolean; },
}
