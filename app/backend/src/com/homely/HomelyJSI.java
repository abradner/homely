package com.homely;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.widget.Toast;

public class HomelyJSI {
    HomelyActivity mainActivity;
    String serverUrl;

    /** Instantiate the interface and set the context */
    HomelyJSI (HomelyActivity h) {
        mainActivity = h;
    }

    public void serverError (String device_id, String capability_name) {
        String errorMessage = "Failed to update " + device_id + ":" + capability_name;
        Toast.makeText(mainActivity.getApplicationContext(), errorMessage, Toast.LENGTH_LONG).show();
    }

    public void serverSuccess (String device_id, String capability_name) {
        String successMessage = "Succeeded at updating " + device_id + ":" + capability_name;
        Toast.makeText(mainActivity.getApplicationContext(), successMessage, Toast.LENGTH_LONG).show();
    }

    public String getServerUrl() {
        return serverUrl;
    }

    public void setServerUrl(String url) {
        serverUrl = url;
    }
}
