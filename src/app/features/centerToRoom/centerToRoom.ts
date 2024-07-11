export const centerToRoom = (coordinates:number[][]) => {
    //x is long, y is lat
    var x = 0;
    var y = 0;

    var i:number = 0;
    for (; i < coordinates.length - 1; i++) {
        x += coordinates[i][0]
        y += coordinates[i][1]
    }

    return {lng: x/(coordinates.length - 1), lat: (y/(coordinates.length - 1))}
}