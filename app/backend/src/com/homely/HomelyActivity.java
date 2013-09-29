package com.homely;

import android.app.Activity;
import android.webkit.WebView;
import android.os.Bundle;

public class HomelyActivity extends Activity {
	private WebView webView;
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		webView = (WebView) findViewById(R.id.webview);
		webView.getSettings().setJavaScriptEnabled(true);
		webView.loadUrl("file:///android_asset/frontend/index.html");
	}
}
