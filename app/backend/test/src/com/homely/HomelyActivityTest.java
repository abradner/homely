package com.homely;

import android.test.ActivityInstrumentationTestCase2;

/**
 * This is a simple framework for a test of an Application.  See
 * {@link android.test.ApplicationTestCase ApplicationTestCase} for more information on
 * how to write and extend Application tests.
 * <p/>
 * To run this test, you can type:
 * adb shell am instrument -w \
 * -e class com.homely.HomelyActivityTest \
 * com.homely.tests/android.test.InstrumentationTestRunner
 */
public class HomelyActivityTest extends ActivityInstrumentationTestCase2<HomelyActivity> {

	private HomelyActivity activity;

	public HomelyActivityTest() {
		super("com.homely", HomelyActivity.class);
	}

	@Override
	protected void setUp() throws Exception {
		super.setUp();

		activity = getActivity();
	}

	public void testTestingWorks() throws Exception {
		assertNull(null);
	}

	public void testSetAndGet() throws Exception {
		HomelyJSI jsi = new HomelyJSI(new HomelyActivity());
		jsi.setServerUrl("localhost");
		assertEquals(jsi.getServerUrl(), "localhost");
		assertEquals(jsi.getServerUrl(), "localhost");

		jsi.setServerUrl("http://192.168.1.1");
		assertEquals(jsi.getServerUrl(), "http://192.168.1.1");

		jsi.setServerUrl("http://192.168.1.2:3000");
		assertEquals(jsi.getServerUrl(), "http://192.168.1.2:3000");
	}
}
