export class EventBus<HandlerName extends string, Event = void>{

   private handlers: Record<HandlerName, Set<(_: Event) => void>> = {} as Record<HandlerName, Set<(_: Event) => void>>;

   protected dispatch(handler_name: HandlerName, arg: Event): void {
      if (!this.has(handler_name)) { return; }
      this.handlers[handler_name].forEach((c) => c(arg));
   }

   protected has(handler_name: HandlerName): boolean {
      return handler_name in this.handlers;
   }

   on(handler_name: HandlerName, callback: (_: Event) => void): void {
      if (this.has(handler_name)) {
         this.handlers[handler_name].add(callback);
         return;
      }
      this.handlers[handler_name] = new Set([callback]);
   }
}