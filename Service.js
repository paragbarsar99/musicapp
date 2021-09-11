import TrackPlayer, { STATE_STOPPED, STATE_BUFFERING } from 'react-native-track-player'

module.exports = async function () {

    await TrackPlayer.addEventListener('remote-play', async () => await TrackPlayer.play())

    await TrackPlayer.addEventListener('remote-pause', async () => await TrackPlayer.pause())

    await TrackPlayer.addEventListener('remote-next', async () => await TrackPlayer.skipToNext())

    await TrackPlayer.addEventListener('remote-stop', async () => {
        await TrackPlayer.destroy()
    })

    await TrackPlayer.addEventListener("remote-duck", async data => {
        let {
            paused: shouldPause,
            ducking: shouldDuck,
            permanent: permanentLoss
        } = data;

        let playerState = await TrackPlayer.getState();

        if (shouldPause || shouldDuck) {
            TrackPlayer.pause();
            if (playerState === TrackPlayer.STATE_PLAYING) {
                didPauseTemporarily = !permanentLoss;
                if (didPauseTemporarily) {
                    didPauseTemporarilyTime = Date.now();
                }
            } else {
                didPauseTemporarily = false;
            }
        } else if (didPauseTemporarily) {
            if (playerState === TrackPlayer.STATE_PAUSED) {
                let secondsSincePause = (Date.now() - didPauseTemporarilyTime) / 1000;
                if (secondsSincePause < 5) {
                    TrackPlayer.play();
                }
            }
            didPauseTemporarily = false;
        }
    });

}
