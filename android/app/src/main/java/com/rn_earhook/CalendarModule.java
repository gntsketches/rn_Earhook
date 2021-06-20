package com.rn_earhook;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

import android.util.Log;
import android.content.Context; // hmm
import android.media.MediaPlayer;
import android.media.SoundPool;


public class CalendarModule extends ReactContextBaseJavaModule {

    private SoundPool soundPool;
    Context context; // hmm

    CalendarModule(ReactApplicationContext context) {
        super(context);

        this.context = context; // hmm
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
        MediaPlayer mediaPlayer = MediaPlayer.create(this.context.getApplicationContext(), R.raw.piano1_c4);
        mediaPlayer.start(); // no need to call prepare(); create() does that for you
    }
}
