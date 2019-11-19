var config = {
    style: 'mapbox://styles/sz9na/ck1v1m7ap09te1cmm2fgh0a97',
    accessToken: 'pk.eyJ1Ijoic3o5bmEiLCJhIjoiY2sxdXluMzVtMDRoMzNobXptaDJvaG9odiJ9.8wFtxgevu_EqhEpTjEe4Zw',
    showMarkers: false,
    theme: 'light',
    alignment: 'left',
    //title: 'Cats',
    //subtitle: 'A description of Cats',
    //byline: 'Scripting Class',
    //footer: 'Source: 191114',
    chapters: [
        {
            id: 'intro',
            title: 'Display Title',
            image: './images/VirginiaHanusik_3.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            location: {
                center: [-122.418398, 37.759483],
                zoom: 13.5,
                pitch: 0,
                bearing: 0
            },
            onChapterEnter: [
                {
                     layer: 'waterway',
                     opacity: 1

                 }
            ],
            onChapterExit: [
                {
                     layer: 'waterway',
                     opacity: 0
                 }
            ]
        },
        {
            id: 'other-identifier',
            title: 'Second Title',
            image: './path/to/image/source.png',
            description: 'Copy these sections to add to your story.',
            location: {
                center: [-77.020636, 38.886900],
                zoom: 13.5,
                pitch: 0,
                bearing: 0
            },
            onChapterEnter: [
            {
                     //layer: '',
                     //opacity: 1
                     
                 }
                 ],
            onChapterExit: []
        }
    ]
};
