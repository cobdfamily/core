import { globalShortcut } from "electron";

export class Keyboard {

public window: any|null = null;

constructor( window: any )
{
this.window = window;
}

public debounceWithDelayAndShortcut( callback: ( args: unknown ) => void, delay: number, shortcut: string ): () => void {
    let timeout: any;
    let bounces: number = 0;

    return () => {
        clearTimeout( timeout );

bounces++;

if( bounces > 3 )
{
bounces = bounces-3;
}

        timeout = setTimeout( function() {
            callback( { bounces: bounces, shortcut: shortcut } );
            bounces = 0;
}, delay );
    }

}

public registerShortcutWithModifier( shortcut: string, modifier: string ): boolean {

let delay = 250;

if(
globalShortcut.register( `${modifier}+${shortcut}`, this.debounceWithDelayAndShortcut( ( args: any ) => {

if( this.window && this.window.webContents )
{
this.window.webContents.send( 'message', { type: "TFKeyboard", args: args } );
}

}, delay, shortcut ) )
)
{
return true;
}
return false;
}

}
