package com.homely;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.content.SharedPreferences;

public class HomelyActivity extends Activity {
	public static final String PREFS_NAME = "PrefsFile";
	private HomelyJSI jsi;

	private WebView webView;
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		webView = (WebView) findViewById(R.id.webview);
		webView.getSettings().setJavaScriptEnabled(true);

		SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
		jsi = new HomelyJSI(this);
		jsi.setServerUrl(settings.getString("serverUrl", "http://localhost:3000"));

		webView.addJavascriptInterface(jsi, "Android");
		webView.requestFocus();
		// Chrome is required for alerts
		//webView.setWebChromeClient(new WebChromeClient());
		webView.setWebViewClient(new WebViewClient() {
			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				return false;
			}
		});

		webView.loadUrl("file:///android_asset/frontend/index.html");
	}

	private void syncPreferences() {
		SharedPreferences settings = getSharedPreferences(PREFS_NAME, 0);
		SharedPreferences.Editor editor = settings.edit();
		editor.putString("serverUrl", jsi.getServerUrl());

		// Commit the edits!
		editor.commit();
	}

	@Override
	public void onPause() {
		super.onPause();
		syncPreferences();
	}

	@Override
	public void onStop() {
		super.onStop();
		syncPreferences();
	}
}
