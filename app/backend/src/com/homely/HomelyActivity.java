package com.homely;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.content.SharedPreferences;

import android.widget.Toast;
import android.view.KeyEvent;
import android.content.Intent;

public class HomelyActivity extends Activity {
	private static final int AUTHENTICATOR_REQUEST = 1;
	public static final String PREFS_NAME = "PrefsFile";
	private static final String FRONTEND_URI = "file:///android_asset/frontend/index.html";
	private HomelyJSI jsi;

	private WebView webView;
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);

		webView = (WebView) findViewById(R.id.webview);
		webView.getSettings().setJavaScriptEnabled(true);

		jsi = new HomelyJSI(this);

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

		webView.loadUrl(FRONTEND_URI);
	}

	public boolean onKeyUp(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_MENU) {
			Intent intent = new Intent(this, AuthenticatorActivity.class);
			startActivityForResult(intent, AUTHENTICATOR_REQUEST);

			return true;
		}
		return super.onKeyUp(keyCode, event);
	}

	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		if (requestCode == AUTHENTICATOR_REQUEST) {
			if (resultCode == RESULT_OK) {
				// Login successful. Refresh stuff
				Toast.makeText(getApplicationContext(), "Authentication success!", Toast.LENGTH_LONG).show();
				webView.loadUrl(FRONTEND_URI);
			}
		}
	}
}
