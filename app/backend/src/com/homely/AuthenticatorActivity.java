package com.homely;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
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

import com.homely.models.AuthToken;

import java.util.ArrayList;
import java.io.ByteArrayOutputStream;

public class AuthenticatorActivity extends Activity {
	private static final int AUTH_LOADER_ID = 0;

	public static final String PREFS_NAME = HomelyActivity.PREFS_NAME;

	private TextView mServer;
	private TextView mEmail;
	private TextView mPassword;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.auth);


		mServer = (TextView) findViewById(R.id.server);
		mEmail = (TextView) findViewById(R.id.email);
		mPassword = (TextView) findViewById(R.id.password);

		findViewById(R.id.login).setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				handleLoginAttempt();
			}
		});
	}

	private void handleLoginAttempt() {
		String server = mServer.getText().toString();
		String email = mEmail.getText().toString();
		String password = mPassword.getText().toString();
		// TODO replace with something more spinning wheel-y
		Toast.makeText(getApplicationContext(), "Handling login attempt with " + server + " " + email + " " + password, Toast.LENGTH_LONG).show();

		try {
			HttpClient httpclient = new DefaultHttpClient();
			HttpPost httppost = new HttpPost("http://" + server + "/tokens.json");

			ArrayList<NameValuePair> postParameters;

			postParameters = new ArrayList<NameValuePair>();
			postParameters.add(new BasicNameValuePair("email", email));
			postParameters.add(new BasicNameValuePair("password", password));

			httppost.setEntity(new UrlEncodedFormEntity(postParameters));

			HttpResponse response = httpclient.execute(httppost);
			StatusLine statusLine = response.getStatusLine();
			if(statusLine.getStatusCode() == HttpStatus.SC_OK){
				ByteArrayOutputStream out = new ByteArrayOutputStream();
				response.getEntity().writeTo(out);
				out.close();
				String responseString = out.toString();

				// responseString is hopefully a json string with token in it

				Toast.makeText(getApplicationContext(), responseString, Toast.LENGTH_LONG).show();
			} else{
				//Closes the connection.
				response.getEntity().getContent().close();
				Toast.makeText(getApplicationContext(), statusLine.getReasonPhrase(), Toast.LENGTH_LONG).show();
			}
		} catch (Exception e) {
			Toast.makeText(getApplicationContext(), "Connection with server " + server + "failed", Toast.LENGTH_LONG).show();
		}
	}
}
