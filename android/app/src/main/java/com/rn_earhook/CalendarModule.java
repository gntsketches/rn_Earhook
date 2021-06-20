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


public class CalendarModule extends ReactContextBaseJavaModule {

    private int C4; //, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3, C4;
    private SoundPool soundPool;
    Context context; // hmm

    CalendarModule(ReactApplicationContext context) {
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

        C4 = soundPool.load(this.context.getApplicationContext(), R.raw.piano1_c4, 1);
    }

    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void createCalendarEvent(String name, String location) {
        Log.d("CalendarModule", "Create event called with name: " + name
                + " and location: " + location);

//        MediaPlayer mediaPlayer = MediaPlayer.create(context, R.raw.sound_file_1);
        // where do you get your context?
//        MediaPlayer mediaPlayer = MediaPlayer.create(this.context.getApplicationContext(), R.raw.piano1_c4);
//        mediaPlayer.start(); // no need to call prepare(); create() does that for you




        soundPool.play(C4, 1, 1, 0, 0, 1);
    }
}
