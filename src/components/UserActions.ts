import { EventBus } from 'src/core/EventBus';

export class UserActions extends EventBus<Action> {

   constructor() {
      super();
      document.addEventListener('keydown', (e) => {
         if (e.ctrlKey) { this.dispatch('stepback'); }
      }, false);
   }
}

type Action = 'stepback';
