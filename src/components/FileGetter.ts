import { EventBus } from '../core/EventBus';

export class FileGetter extends EventBus<Action, File>{
   constructor(
      private readonly input: HTMLInputElement
   ) {
      super();
      this.input.addEventListener('change', () => {
         if (!this.input || !this.input.files || this.input.files.length === 0) { return; }
         this.dispatch('choose', this.input.files[0]);
      }, false);
   }

   static toObjectURL(file: File): string {
      return URL.createObjectURL(file);
   }

   static getFileInfo({ name, size, type }: File): IFileInfo {
      return { name, size, type };
   }
}

type Action = 'choose';
interface IFileInfo {
   name: string;
   size: number;
   type: string;
}