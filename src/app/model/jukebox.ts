class Song {
    constructor( path: string, name: string ) {
        this.path = path;
        this.name = name;
    }

    readonly path: string;
    readonly name: string;
}

export class Jukebox {
    static readonly MASCHENDRAHT_ZAUN = new Song('/assets/music/maschendrahtzaun.mp3', 'Maschendrahtzaun');
    static readonly LEISURE_SUITE_LARRY = new Song('/assets/music/leisure-suite-larry.mp3', 'Leisure Suite Larry');
    static readonly FARMVILLE = new Song('/assets/music/farmville.mp3', 'Farmville');

    static getSongs(): Array<Song> {
        return [Jukebox.MASCHENDRAHT_ZAUN, Jukebox.LEISURE_SUITE_LARRY, Jukebox.FARMVILLE];
    }

    static randomSong(): Song {
        const songs: Array<Song> = [null].concat(Jukebox.getSongs());
        const randomSongIndex = Math.floor(Math.random() * (songs.length - 1)) + 1;
        return songs[randomSongIndex];
    }
}
