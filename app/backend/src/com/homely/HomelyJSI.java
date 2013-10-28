package com.homely;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.widget.Toast;

public class HomelyJSI {
    public static final String PREFS_NAME = HomelyActivity.PREFS_NAME;
    HomelyActivity mainActivity;
    String serverUrl;
    String data;

    /** Instantiate the interface and set the context */
    HomelyJSI (HomelyActivity h) {
        mainActivity = h;
        data = "[{\"id\":25,\"name\":\"Living Room\",\"capabilities\":[{\"id\":24,\"name\":\"ChainableLED 0\",\"device_id\":38,\"capability_type\":\"P9813\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T10:56:19.000Z\",\"message\":null,\"prefix\":0,\"room_id\":25,\"settings\":[{\"id\":47,\"capability_id\":24,\"value\":\"1\",\"name\":\"Power\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T10:56:19.000Z\",\"min\":0,\"max\":1,\"room_id\":null,\"device_id\":null},{\"id\":48,\"capability_id\":24,\"value\":\"3399FF\",\"name\":\"Colour\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T10:56:19.000Z\",\"min\":0,\"max\":999,\"room_id\":null,\"device_id\":null}]},{\"id\":26,\"name\":\"EmuLED 0\",\"device_id\":37,\"capability_type\":\"P9813\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T23:21:05.000Z\",\"message\":\"(0000000)\",\"prefix\":0,\"room_id\":25,\"settings\":[{\"id\":51,\"capability_id\":26,\"value\":\"0\",\"name\":\"Power\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T23:21:05.000Z\",\"min\":0,\"max\":1,\"room_id\":null,\"device_id\":null},{\"id\":52,\"capability_id\":26,\"value\":\"3399FF\",\"name\":\"Colour\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T10:56:19.000Z\",\"min\":0,\"max\":999,\"room_id\":null,\"device_id\":null}]}]},{\"id\":26,\"name\":\"Kitchen\",\"capabilities\":[{\"id\":25,\"name\":\"ChainableLED 1\",\"device_id\":38,\"capability_type\":\"P9813\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T10:56:19.000Z\",\"message\":null,\"prefix\":1,\"room_id\":26,\"settings\":[{\"id\":49,\"capability_id\":25,\"value\":\"1\",\"name\":\"Power\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T10:56:19.000Z\",\"min\":0,\"max\":1,\"room_id\":null,\"device_id\":null},{\"id\":50,\"capability_id\":25,\"value\":\"FF9933\",\"name\":\"Colour\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T10:56:19.000Z\",\"min\":0,\"max\":999,\"room_id\":null,\"device_id\":null}]},{\"id\":27,\"name\":\"EmuLED 1\",\"device_id\":37,\"capability_type\":\"P9813\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T23:25:31.000Z\",\"message\":\"(100ffff)\",\"prefix\":1,\"room_id\":26,\"settings\":[{\"id\":53,\"capability_id\":27,\"value\":\"1\",\"name\":\"Power\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T23:23:38.000Z\",\"min\":0,\"max\":1,\"room_id\":null,\"device_id\":null},{\"id\":54,\"capability_id\":27,\"value\":\"00ffff\",\"name\":\"Colour\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T23:25:31.000Z\",\"min\":0,\"max\":999,\"room_id\":null,\"device_id\":null}]}]},{\"id\":27,\"name\":\"Bedroom\",\"capabilities\":[{\"id\":28,\"name\":\"TCPChainableLED 0\",\"device_id\":39,\"capability_type\":\"P9813\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T10:56:19.000Z\",\"message\":null,\"prefix\":0,\"room_id\":27,\"settings\":[{\"id\":55,\"capability_id\":28,\"value\":\"1\",\"name\":\"Power\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T10:56:19.000Z\",\"min\":0,\"max\":1,\"room_id\":null,\"device_id\":null},{\"id\":56,\"capability_id\":28,\"value\":\"3399FF\",\"name\":\"Colour\",\"created_at\":\"2013-10-27T10:56:19.000Z\",\"updated_at\":\"2013-10-27T10:56:19.000Z\",\"min\":0,\"max\":999,\"room_id\":null,\"device_id\":null}]}]}]";
    }

    public void toast(String s) {
        Toast.makeText(mainActivity.getApplicationContext(), s, Toast.LENGTH_SHORT).show();
    }

    public void serverError (String device_id, String capability_name) {
        String errorMessage = "Failed to update " + device_id + ":" + capability_name;
        Toast.makeText(mainActivity.getApplicationContext(), errorMessage, Toast.LENGTH_SHORT).show();
    }

    public void serverSuccess (String device_id, String capability_name) {
        String successMessage = "Succeeded at updating " + device_id + ":" + capability_name;
        Toast.makeText(mainActivity.getApplicationContext(), successMessage, Toast.LENGTH_SHORT).show();
    }

    public void storeData (String data) {
        // @TODO store this locally on the phone
        this.data = new String(data);
    }

    public String getData() {
        return this.data;
    }


    public String getServerUrl() {
        return mainActivity.getSharedPreferences(PREFS_NAME, 0).getString("serverUrl", "localhost");
    }

    public String getToken() {
        return mainActivity.getSharedPreferences(PREFS_NAME, 0).getString("token", "");
    }
}
