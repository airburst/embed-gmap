export const flatten = (array) => {
    return [].concat.apply([], array);
};

export const replaceAll = (find: string, replace: string, fullText: string): string => {
    return fullText.replace(new RegExp(find, 'g'), replace);
}

export const lastPathInUrl = (url) => {
    let parts = url.split('/');
    return parts[parts.length - 1];
}

export const convertRoute = (data) => {
    const elevation = flatten(data.elevation).map(e => e.toFixed(6));
    const track = data.track
        .filter(t => { return (t.track.length > 0); })
        .map(tt => tt.track);
    const newTrack = flatten(track)
        .map((t) => { 
            return { 
                lat: parseFloat(t.lat.toFixed(6)), 
                lng: parseFloat(t.lon.toFixed(6)) 
            } 
        });
    return {
        details: data.details,
        elevation: elevation,
        track: newTrack
    };
};

/*
var convertRoute = function(data) {
    var flatten = function(array) { return [].concat.apply([], array); }
    var elevation = flatten(data.elevation).map(function(e) { return e.toFixed(6); });
    var track = data.track.filter(function(t) {
        return (t.track.length > 0);
    }).map(function(tt) {
        return (tt.track);
    });
    var newTrack = flatten(track).map(function(t) {
        return { lat: t.lat.toFixed(6), lng: t.lon.toFixed(6) };
    });
    
    return {
        details: data.details,
        elevation: elevation,
        track: newTrack
    };
};
*/
