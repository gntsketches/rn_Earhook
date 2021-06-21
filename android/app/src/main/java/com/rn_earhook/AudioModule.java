package com.rn_earhook;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

import android.media.AudioAttributes;
import android.media.AudioManager;
import android.os.Build;
import android.util.Log;
import android.content.Context; // hmm
import android.media.MediaPlayer;
import android.media.SoundPool;


public class AudioModule extends ReactContextBaseJavaModule {

    private int C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3, C4;
    private SoundPool soundPool;
    Context context; // hmm

    AudioModule(ReactApplicationContext context) {
        super(context);

        this.context = context; // hmm

        /* SOUND POOL *******************************************************************/
        // System.out.println(">>>Build.VERSION.SDK_INT " + Build.VERSION.SDK_INT);
        // System.out.println(">>>Build.VERSION_CODES.LOLLIPOP " + Build.VERSION_CODES.LOLLIPOP);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {  // Lollipop is API 21...
            AudioAttributes audioAttributes = new AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_ASSISTANCE_SONIFICATION)  // go check out the comments in the declaration
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .build();
            soundPool = new SoundPool.Builder()
                    .setMaxStreams(6)  // this allows 6 streams to be played at the same time
                    .setAudioAttributes(audioAttributes)
                    .build();
        } else {
            soundPool = new SoundPool(6, AudioManager.STREAM_MUSIC, 0); // maxStream is how many sounds you can play at the same time. "Stream Type" defines behavior. "srcQuality" was never implemented // STREAM_MUSIC means to play through the connected device
        }

        C3 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_c3, 1);
        Db3 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_db3, 1);
        D3 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_d3, 1);
        Eb3 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_eb3, 1);
        E3 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_e3, 1);
        F3 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_f3, 1);
        Gb3 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_gb3, 1);
        G3 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_g3, 1);
        Ab3 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_ab3, 1);
        A3 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_a3, 1);
        Bb3 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_bb3, 1);
        B3 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_b3, 1);
        C4 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_c4, 1);
    }

    @Override
    public String getName() {
        return "AudioModule";
    }

    @ReactMethod
    public void playPitch(String pitch) {
        Log.d("AudioModule", ">>>Play pitch: " + pitch);

        switch (pitch) {
            case "C":
                soundPool.play(C3, 1, 1, 0, 0, 1);
                break;
            case "Cs":
                soundPool.play(Db3, 1, 1, 0, 0, 1);
                break;
            case "D":
                soundPool.play(D3, 1, 1, 0, 0, 1);
                break;
            case "Ds":
                soundPool.play(Eb3, 1, 1, 0, 0, 1);
                break;
            case "E":
                soundPool.play(E3, 1, 1, 0, 0, 1);
                break;
            case "F":
                soundPool.play(F3, 1, 1, 0, 0, 1);
                break;
            case "Fs":
                soundPool.play(Gb3, 1, 1, 0, 0, 1);
                break;
            case "G":
                soundPool.play(G3, 1, 1, 0, 0, 1);
                break;
            case "Gs":
                soundPool.play(Ab3, 1, 1, 0, 0, 1);
                break;
            case "A":
                soundPool.play(A3, 1, 1, 0, 0, 1);
                break;
            case "As":
                soundPool.play(Bb3, 1, 1, 0, 0, 1);
                break;
            case "B":
                soundPool.play(B3, 1, 1, 0, 0, 1);
                break;
            case "C8":
                soundPool.play(C4, 1, 0, 0, 0, 1);
                break;
        }
    }
}
