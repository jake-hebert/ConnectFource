interface System {
  import<T = any>(module: string): Promise<T>
}

type Turn = 'Red' | 'Yellow';
type SquareStatus = 'Red' | 'Yellow' | 'Empty';

declare var System: System;

//allow importing of files with file-loader
declare module '*.png'
declare module '*.jpg'
