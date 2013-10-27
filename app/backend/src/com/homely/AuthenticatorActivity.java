package com.homely;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.EditText;
import android.view.View;
import android.content.SharedPreferences;
import android.widget.Toast;

import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.StatusLine;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;

import org.json.JSONObject;
import org.json.JSONException;

import java.util.ArrayList;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;

public class AuthenticatorActivity extends Activity {
	private static final int AUTH_LOADER_ID = 0;

	public static final String PREFS_NAME = HomelyActivity.PREFS_NAME;

	private EditText mServer;
	private EditText mEmail;
	private EditText mPassword;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.auth);


		mServer = (EditText) findViewById(R.id.server);
		mEmail = (EditText) findViewById(R.id.email);
		mPassword = (EditText) findViewById(R.id.password);

		mServer.setText(getSharedPreferences(PREFS_NAME, 0).getString("serverUrl", "localhost"), TextView.BufferType.EDITABLE);

		findViewById(R.id.login).setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				if (handleLoginAttempt()) {
					setResult(RESULT_OK);
					finish();
				} else {
					// Login attempt failed
				}
			}
		});
	}

	private HttpPost formRequest(String server, String email, String password) throws UnsupportedEncodingException {
		HttpPost httppost = new HttpPost("http://" + server + ":3000/tokens.json");

		ArrayList<NameValuePair> postParameters;

		postParameters = new ArrayList<NameValuePair>();
		postParameters.add(new BasicNameValuePair("email", email));
		postParameters.add(new BasicNameValuePair("password", password));

		httppost.setEntity(new UrlEncodedFormEntity(postParameters));

		return httppost;
	}

	private String getTokenFromJSON(String s) throws JSONException {
		JSONObject jObject = new JSONObject(s);

		// TODO don't hardcode this?
		return jObject.getString("token");
	}

	// Returns true if successful and logged in.
	//         false otherwise
	private boolean handleLoginAttempt() {
		String server = mServer.getText().toString();
		String email = mEmail.getText().toString();
		String password = mPassword.getText().toString();
		// TODO replace with something more spinning wheel progress bar-y 
		Toast.makeText(getApplicationContext(), "Handling login attempt with " + server + " " + email + " " + password, Toast.LENGTH_LONG).show();

		try {
			HttpClient httpclient = new DefaultHttpClient();
			HttpResponse response = httpclient.execute(formRequest(server, email, password));

			StatusLine statusLine = response.getStatusLine();
			if(statusLine.getStatusCode() == HttpStatus.SC_OK){
				ByteArrayOutputStream out = new ByteArrayOutputStream();
				response.getEntity().writeTo(out);
				out.close();
				String responseString = out.toString();

				// responseString is hopefully a json string with token in it
				SharedPreferences.Editor editor = getSharedPreferences(PREFS_NAME, 0).edit();
				editor.putString("token", getTokenFromJSON(responseString));
				editor.putString("serverUrl", server);
				editor.commit();
				return true;
			} else{
				//Closes the connection.
				response.getEntity().getContent().close();
				Toast.makeText(getApplicationContext(), statusLine.getReasonPhrase(), Toast.LENGTH_LONG).show();
			}
		} catch (JSONException e) {
			// JSON response is broken
		} catch (Exception e) {
			Toast.makeText(getApplicationContext(), "Connection with server " + server + "failed", Toast.LENGTH_LONG).show();
		}
		return false;
	}
}
